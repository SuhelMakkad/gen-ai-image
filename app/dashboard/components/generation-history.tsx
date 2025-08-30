"use client";

import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useInterval } from "usehooks-ts";

import { useEffect } from "react";

import { useScheduledGens } from "@/hooks/use-scheduled-gens";

import { GenerationHistory, ListItem, PlaceholderItems } from "@/components/generation-history";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

import { api } from "@/convex/_generated/api";
import { getEmailLink } from "@/utils/socials";

export const UserGenerationHistory = () => {
  const images = useQuery(api.images.list);
  const userId = useQuery(api.auth.currentUser);

  const { scheduledGens, removeScheduledGen, checkStaleGens } = useScheduledGens();
  useInterval(checkStaleGens, 1000 * 60 * 5); // 5 minutes

  const filteredScheduledGens = scheduledGens.filter((gen) => gen.userId === userId?._id);

  useEffect(() => {
    images?.forEach((image) => {
      removeScheduledGen(image.id);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <GenerationHistory images={images || []}>
      {filteredScheduledGens.map((gen) => (
        <ListItem
          key={gen.id}
          style={gen.style}
          prompt={gen.type !== "error" ? gen.prompt : undefined}
          className={"grid place-items-center"}
        >
          {gen.type === "processing" ? (
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-sm">Generating </p>
              <Loader2 className="text-muted-foreground size-4 animate-spin" />
            </div>
          ) : gen.type === "error" ? (
            <HoverCard openDelay={0}>
              <HoverCardTrigger asChild>
                <div className="text-destructive flex items-center gap-2">
                  <p className="text-sm">Generation failed</p>
                  <FaExclamationTriangle className="size-4" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">
                  Please{" "}
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={getEmailLink(
                      "Support Request",
                      `I'm having trouble with my generation. \n\nGeneration ID: ${gen.id} \n\nPrompt: ${gen.prompt} \n\nStyle: ${gen.style}`
                    )}
                    className="underline-offset-4 hover:underline"
                  >
                    contact support
                  </a>{" "}
                  for help.
                </p>
              </HoverCardContent>
            </HoverCard>
          ) : null}
        </ListItem>
      ))}

      {!images?.length && !filteredScheduledGens.length ? <PlaceholderItems /> : null}
    </GenerationHistory>
  );
};
