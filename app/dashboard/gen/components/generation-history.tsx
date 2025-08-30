"use client";

import { useQuery } from "convex/react";
import { useInterval } from "usehooks-ts";

import { useEffect } from "react";

import Image from "next/image";

import { useScheduledGens } from "@/hooks/use-scheduled-gens";

import { Badge } from "@/components/ui/badge";
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
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {!images?.length ? <LoadingItems /> : null}

      {filteredScheduledGens.map((gen) => (
        <ListItem key={gen.id} prompt={gen.prompt} style={gen.style}>
          <Skeleton className="size-full rounded-md" />
        </ListItem>
      ))}

      {images?.map((image) => (
        <ListItem key={image.imageId} prompt={image.prompt} style={image.style}>
          {image.imageUrl && (
            <Image
              unoptimized
              src={image.imageUrl}
              alt={image.prompt}
              width={100}
              height={100}
              className="size-full rounded-md object-cover"
            />
          )}
        </ListItem>
      ))}
    </ul>
  );
};

const ListItem = ({
  children,
  prompt,
  style,
}: React.PropsWithChildren<{
  prompt?: string;
  style?: string;
}>) => {
  return (
    <li className="h-55 group relative col-span-1 w-full">
      {children}

      {!!prompt && (
        <span className="absolute bottom-2 left-2 hidden group-hover:block">{prompt}</span>
      )}

      {!!style && (
        <Badge variant="secondary" className="absolute right-2 top-2">
          {style}
        </Badge>
      )}
    </li>
  );
};

const LoadingItems = () => {
  return new Array(4).fill(0).map((_, index) => (
    <ListItem key={index}>
      <div className="bg-secondary size-full rounded-md" />
    </ListItem>
  ));
};
