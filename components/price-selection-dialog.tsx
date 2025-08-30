import { DialogTriggerProps } from "@radix-ui/react-dialog";

import { PlanSelection } from "@/components/plan-selection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const PriceSelectionDialog = (props: DialogTriggerProps) => {
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Select a plan</DialogTitle>
        </DialogHeader>
        <PlanSelection />
      </DialogContent>
    </Dialog>
  );
};
