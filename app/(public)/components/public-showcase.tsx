"use client";

import { useQuery } from "convex/react";

import { GenerationHistory, PlaceholderItems } from "@/components/generation-history";

import { api } from "@/convex/_generated/api";

export const PublicShowcase = () => {
  const images = useQuery(api.images.listPublicShowcase);

  return (
    <GenerationHistory images={images || []}>
      {!images?.length ? <PlaceholderItems /> : null}
    </GenerationHistory>
  );
};
