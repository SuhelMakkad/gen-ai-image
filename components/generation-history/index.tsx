"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";

import { ImageData, ImageDialog } from "@/app/dashboard/gen/components/image-dialog";
import { truncate } from "@/utils/misc";

export const GenerationHistory = ({
  images,
  children,
}: {
  images: ImageData[];
  children: React.ReactNode;
}) => {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {children}

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

export const ListItem = ({
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

export const LoadingItems = () => {
  return new Array(4).fill(0).map((_, index) => (
    <ListItem key={index}>
      <div className="bg-secondary size-full rounded-md" />
    </ListItem>
  ));
};
