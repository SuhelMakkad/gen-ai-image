"use client";

import { useQuery } from "convex/react";
import { useInterval } from "usehooks-ts";

import { useEffect } from "react";

import Image from "next/image";

import { useScheduledGens } from "@/hooks/use-scheduled-gens";

import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";

export const GenerationHistory = () => {
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
    <ul className="flex flex-col gap-2">
      {filteredScheduledGens.map((gen) => (
        <li key={gen.id} className="flex items-center gap-2">
          <Skeleton className="size-25 rounded-md" />
          <span>{gen.prompt}</span>
        </li>
      ))}
      {images?.map((image) => (
        <li key={image.imageId} className="flex items-center gap-2">
          {image.imageUrl && (
            <Image
              unoptimized
              src={image.imageUrl}
              alt={image.prompt}
              width={100}
              height={100}
              className="rounded-md"
            />
          )}
          <span>{image.prompt}</span>
        </li>
      ))}
    </ul>
  );
};
