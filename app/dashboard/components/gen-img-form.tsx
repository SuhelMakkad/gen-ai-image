"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useEffect } from "react";

import { useOnboardingPrompt } from "@/hooks/use-onboarding-prompt";
import { useScheduledGens } from "@/hooks/use-scheduled-gens";

import { PriceSelectionDialog } from "@/components/price-selection-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { api } from "@/convex/_generated/api";
import { tryCatch } from "@/utils/try-catch";
import { cn } from "@/utils/ui";

const maxChars = 500;

const styleOptions = [
  { label: "Auto", value: "auto" },
  { label: "Cinematic", value: "cinematic" },
  { label: "Vivid", value: "vivid" },
  { label: "Studio light", value: "studio-light" },
  { label: "Retro", value: "retro" },
  { label: "Cyberpunk", value: "cyberpunk" },
  { label: "Analog", value: "analog" },
] as const;

// Form schema with validation
const formSchema = z.object({
  prompt: z
    .string()
    .min(1, "Please enter a prompt")
    .max(maxChars, `Prompt must be ${maxChars} characters or less`),
  style: z.enum(styleOptions.map((option) => option.value)),
});

type FormValues = z.infer<typeof formSchema>;

export const GenImageForm = (props: { className?: string }) => {
  const { prompt: onboardingPrompt, setPrompt: setOnboardingPrompt } = useOnboardingPrompt();
  const { addScheduledGen } = useScheduledGens();
  const generateImg = useMutation(api.images.generate);
  const userCredits = useQuery(api.credits.getUserCredits);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: onboardingPrompt,
      style: "auto",
    },
  });

  const isGenerating = form.formState.isSubmitting;
  const hasInsufficientCredits = (userCredits?.balance || 0) < 1;

  const onSubmit = async (values: FormValues) => {
    if (hasInsufficientCredits) {
      toast.error("Insufficient credits. You need 1 credit to generate an image.");
      return;
    }

    const [response, error] = await tryCatch(
      generateImg({
        prompt: values.prompt,
        style: values.style,
      })
    );

    if (error) {
      if (error.message?.includes("Insufficient credits")) {
        toast.error("Insufficient credits. You need 1 credit to generate an image.");
      } else {
        toast.error("Something went wrong");
      }
      return;
    }

    if (!response?.id) {
      toast.error("Something went wrong");
      return;
    }

    toast.success("Your image is being generated");
    addScheduledGen({
      id: response.id,
      prompt: values.prompt,
      style: values.style,
    });

    form.setValue("prompt", "");
  };

  useEffect(() => {
    setOnboardingPrompt("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboardingPrompt]);

  return (
    <section className={cn("isolate flex flex-col gap-4", props.className)}>
      <div className="flex items-center justify-between">
        <span className="text-base font-medium">Prompt</span>
        <span className="text-muted-foreground text-sm">Costs 1 credit per image</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      {...field}
                      maxLength={maxChars}
                      placeholder="Enter your text..."
                      className="min-h-[100px]"
                    />
                    <span
                      className={cn(
                        "text-muted-foreground absolute bottom-2 right-2 text-xs transition-colors",
                        field.value.length >= maxChars && "text-destructive"
                      )}
                    >
                      {field.value.length} / {maxChars}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center gap-4 overflow-hidden md:flex-row md:gap-6">
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem className="no-scrollbar flex flex-1 flex-wrap items-center gap-2 space-y-0 overflow-auto p-1 md:flex-nowrap">
                  {styleOptions.map((option) => (
                    <Button
                      type="button"
                      size="sm"
                      key={option.value}
                      className={cn(
                        "h-6.75 rounded-full text-xs",
                        field.value === option.value && "ring-ring ring-2"
                      )}
                      onClick={() => field.onChange(option.value)}
                      variant="outline"
                    >
                      {option.label}
                    </Button>
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            {hasInsufficientCredits ? (
              <PriceSelectionDialog asChild>
                <Button
                  type="button"
                  disabled={isGenerating}
                  size="sm"
                  className="h-7 w-full shrink-0 md:w-fit"
                >
                  Buy Credits
                </Button>
              </PriceSelectionDialog>
            ) : (
              <Button
                type="submit"
                disabled={isGenerating}
                size="sm"
                className="h-7 w-full shrink-0 md:w-fit"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
};
