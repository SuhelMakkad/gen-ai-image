"use client";

import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { useInterval } from "usehooks-ts";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useScheduledGens } from "@/hooks/use-scheduled-gens";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import { truncate } from "@/utils/misc";

import { ImageData, ImageDialog } from "./image-dialog";

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
        <ListItem key={image.imageId} prompt={image.prompt} style={image.style} image={image}>
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

      <ImageDialog />
    </ul>
  );
};

const ListItem = ({
  children,
  prompt,
  style,
  image,
}: React.PropsWithChildren<{
  prompt?: string;
  style?: string;
  image?: ImageData;
}>) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ImageDialog image={image}>
      <li
        className="h-55 group relative col-span-1 w-full cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}

        {!!prompt && (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 z-10 line-clamp-4 flex items-end overscroll-auto rounded-md bg-gradient-to-t from-black/90 to-black/30 p-4 text-sm leading-relaxed text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {truncate(prompt, 100)}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {!!style && (
          <Badge variant="secondary" className="absolute right-2 top-2">
            {style}
          </Badge>
        )}
      </li>
    </ImageDialog>
  );
};

const LoadingItems = () => {
  return new Array(4).fill(0).map((_, index) => (
    <ListItem key={index}>
      <div className="bg-secondary size-full rounded-md" />
    </ListItem>
  ));
};
