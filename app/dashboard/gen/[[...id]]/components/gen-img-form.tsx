"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useEffect } from "react";

import { useOnboardingPrompt } from "@/hooks/use-onboarding-prompt";
import { useScheduledGens } from "@/hooks/use-scheduled-gens";

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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: onboardingPrompt,
      style: "auto",
    },
  });

  const isGenerating = form.formState.isSubmitting;

  const onSubmit = async (values: FormValues) => {
    const [response, error] = await tryCatch(
      generateImg({
        prompt: values.prompt,
        style: values.style,
      })
    );

    if (error || !response?.id) {
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
  }, [prompt]);

  return (
    <section className={cn("flex flex-col gap-4", props.className)}>
      <span className="text-base font-medium">Prompt</span>

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

          <div className="flex items-center gap-10 overflow-hidden">
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem className="no-scrollbar flex flex-1 items-center gap-2 space-y-0 overflow-auto p-1">
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

            <Button type="submit" disabled={isGenerating} size="sm" className="h-7 shrink-0">
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
