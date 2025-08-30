import { useQuery } from "convex/react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";

import { api } from "@/convex/_generated/api";
import { routes } from "@/utils/routes";

export const CreditDetails = () => {
  const userCredits = useQuery(api.credits.getUserCredits);
  const availableCredits = userCredits?.balance || 0;

  return (
    <DropdownMenuLabel className="bg-muted -m-1 flex flex-col gap-2 rounded-none border border-none px-3 py-2.5 font-normal shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">Credits</span>
        <Button asChild size="sm" variant="outline" className="h-6 px-2 text-xs">
          <Link href={routes.home + "#pricing"}>Buy more</Link>
        </Button>
      </div>

      <div className="text-muted-foreground flex items-center justify-between text-xs">
        <span className="text-sm">Remaining</span>
        <span className="text-foreground text-xs font-medium tabular-nums">
          {availableCredits.toLocaleString()}
        </span>
      </div>
    </DropdownMenuLabel>
  );
};
