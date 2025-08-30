"use client";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Download } from "lucide-react";
import { toast } from "sonner";

import Image from "next/image";

import { useCopy } from "@/hooks/use-copy";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Doc } from "@/convex/_generated/dataModel";
import { formatDate, handleDownload } from "@/utils/misc";
import { opacityFadeInOut, transition150 } from "@/utils/motion";

// Type for the image data returned from the API
export type ImageData = Omit<Doc<"generations">, "userId"> & {
  imageUrl: string | null;
};

type ImageDialogProps = {
  image?: ImageData;
} & React.ComponentProps<typeof DialogTrigger>;

export const ImageDialog = ({ image, ...props }: ImageDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger {...props} />

      <DialogContent className="no-scrollbar max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Generated Image Details</span>
          </DialogTitle>
        </DialogHeader>

        {/* Image Display */}
        <div className="relative shadow-lg">
          {image?.imageUrl && (
            <Image
              unoptimized
              src={image.imageUrl}
              alt={image.prompt}
              width={512}
              height={512}
              className="rounded-lg shadow-lg"
            />
          )}
          {!!image && <Badge className="absolute left-2 top-2 shadow">{image.style}</Badge>}
        </div>

        {/* Image Details */}
        {!!image && (
          <>
            <div className="relative">
              <pre className="text-muted-foreground bg-secondary/50 no-scrollbar max-h-20 overflow-y-auto whitespace-pre-wrap rounded-md p-3 text-xs">
                {image.prompt}
              </pre>
              <CopyPromptButton prompt={image.prompt} />
            </div>

            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <span className="text-muted-foreground text-xs">
                {formatDate(image._creationTime)}
              </span>

              {!!image?.imageUrl && (
                <Button
                  size="sm"
                  onClick={() => {
                    if (!image.imageUrl) return;
                    toast.success("Downloading your image");
                    handleDownload(image.imageUrl);
                  }}
                >
                  <Download className="h-5 w-5" />
                  Download
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const CopyPromptButton = ({ prompt }: { prompt: string }) => {
  const { copy, isCopied } = useCopy();

  return (
    <Button
      size="icon"
      disabled={isCopied}
      variant="secondary"
      onClick={() => copy(prompt)}
      className="absolute bottom-2 right-2 size-7"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isCopied ? (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition150}
            variants={opacityFadeInOut}
          >
            <Check />
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition150}
            variants={opacityFadeInOut}
          >
            <Copy />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Copy</span>
    </Button>
  );
};
