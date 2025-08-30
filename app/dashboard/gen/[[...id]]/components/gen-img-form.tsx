"use client";

import { useMutation } from "convex/react";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { useState } from "react";

import { useScheduledGens } from "@/hooks/use-scheduled-gens";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { api } from "@/convex/_generated/api";
import { tryCatch } from "@/utils/try-catch";
import { cn } from "@/utils/ui";

const maxChars = 500;

const aspectRatioOptions = [
  { label: "Square 1:1", value: "1:1" },
  { label: "Landscape 16:9", value: "16:9" },
  { label: "Portrait 9:16", value: "9:16" },
  { label: "Classic 4:3", value: "4:3" },
  { label: "Photo 3:2", value: "3:2" },
];

export const GenImageForm = () => {
  const [value, setValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatioOptions[0].value);

  const { addScheduledGen } = useScheduledGens();
  const generateImg = useMutation(api.images.generate);

  const handleGenerateImg = async () => {
    if (!value) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    const [response, error] = await tryCatch(
      generateImg({ prompt: value, aspectRatio: selectedAspectRatio })
    );

    setIsGenerating(false);

    if (error || !response?.id) {
      toast.error("Something went wrong");
      return;
    }

    toast.success("Your image is being generated");
    addScheduledGen({
      id: response.id,
      prompt: value,
      aspectRatio: selectedAspectRatio,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium">Enter your prompt</span>
        <div className="relative">
          <Textarea
            value={value}
            maxLength={maxChars}
            placeholder="Enter your text..."
            onChange={(e) => setValue(e.target.value.slice(0, maxChars))}
          />

          <span
            className={cn(
              "text-muted-foreground absolute bottom-2 right-2 text-xs transition-colors",
              value.length >= maxChars && "text-destructive"
            )}
          >
            {value.length} / {maxChars}
          </span>
        </div>
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Aspect Ratio</span>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {aspectRatioOptions.map((option) => (
            <Button
              key={option.value}
              size="sm"
              className={cn(
                "col-span-1 w-full",
                selectedAspectRatio === option.value && "ring-ring ring-2"
              )}
              onClick={() => setSelectedAspectRatio(option.value)}
              variant={"outline"}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <Button disabled={isGenerating} className="mt-4" onClick={handleGenerateImg}>
        {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles />}
        Generate
      </Button>
    </div>
  );
};
