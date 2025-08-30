import { useQuery } from "convex/react";
import { useLocalStorage } from "usehooks-ts";

import { useCallback } from "react";

import { api } from "@/convex/_generated/api";

type ScheduledType = "processing" | "error";

type ScheduledGeneration = {
  id: string;
  userId: string;
  prompt: string;
  aspectRatio: string;
  createdAt: string;
  type: ScheduledType;
};

export const useScheduledGens = () => {
  const userId = useQuery(api.auth.currentUser);

  const [scheduledGens, setScheduledGens] = useLocalStorage(
    "scheduled-gens",
    [] as ScheduledGeneration[]
  );

  const addScheduledGen = useCallback(
    (gen: Omit<ScheduledGeneration, "createdAt" | "type" | "userId">) => {
      setScheduledGens((prev) => [
        ...prev,
        {
          ...gen,
          createdAt: new Date().toISOString(),
          type: "processing",
          userId: userId?._id || "",
        },
      ]);
    },
    [scheduledGens, userId]
  );

  const removeScheduledGen = useCallback(
    (genId: string) => {
      setScheduledGens((prev) => prev.filter((g) => genId !== g.id));
    },
    [scheduledGens]
  );

  const checkStaleGens = useCallback(() => {
    setScheduledGens((prev) => {
      const maxTime = 1000 * 60 * 5; // 5 minutes
      const now = new Date();

      const staleGens = prev
        .filter((g) => now.getTime() - new Date(g.createdAt).getTime() > maxTime)
        .map((g) => g.id);

      return prev.map((g) => ({ ...g, type: staleGens.includes(g.id) ? "error" : "processing" }));
    });
  }, [scheduledGens]);

  return { scheduledGens, addScheduledGen, removeScheduledGen, checkStaleGens };
};
