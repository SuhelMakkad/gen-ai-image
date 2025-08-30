"use client";

import { useQuery } from "convex/react";
import { useInterval } from "usehooks-ts";

import { useEffect } from "react";

import { useScheduledGens } from "@/hooks/use-scheduled-gens";

import { GenerationHistory, ListItem, LoadingItems } from "@/components/generation-history";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";

export const UserGenerationHistory = () => {
  const images = useQuery(api.images.list);
  const userId = useQuery(api.auth.currentUser);

  const { scheduledGens, removeScheduledGen, checkStaleGens } = useScheduledGens();
  useInterval(checkStaleGens, 2_000);

  const filteredScheduledGens = scheduledGens.filter((gen) => gen.userId === userId?._id);

  useEffect(() => {
    images?.forEach((image) => {
      removeScheduledGen(image.id);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <GenerationHistory images={images || []}>
      {!images?.length ? <LoadingItems /> : null}

      {filteredScheduledGens.map((gen) => (
        <ListItem key={gen.id} prompt={gen.prompt} style={gen.style}>
          <Skeleton className="size-full rounded-md" />
        </ListItem>
      ))}
    </GenerationHistory>
  );
};
