import { SearchIcon } from "lucide-react";

import * as React from "react";

import { cn } from "@/utils/ui";

export const Input = ({ className, type, ...props }: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "border-input shadow-xs selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground/75 dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] placeholder:text-sm",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  );
};

type InputWithElementProps = React.ComponentProps<"input"> & {
  leadingElement?: React.ReactNode;
  trailingElement?: React.ReactNode;
  inputClassName?: string;
};

export const InputWithElement = React.forwardRef<HTMLInputElement, InputWithElementProps>(
  ({ className, leadingElement, trailingElement, inputClassName, ...props }, ref) => {
    return (
      <label
        data-disabled={props.disabled}
        className={cn(
          "dark:bg-input/30 flex items-center gap-2 bg-transparent",
          "border-input focus-within:border-ring focus-within:ring-ring/50 w-full min-w-0 rounded-md border focus-within:ring-[2px]",
          "shadow-xs [data-disabled]:pointer-events-none [data-disabled]:cursor-not-allowed [data-disabled]:opacity-50 outline-none transition-[color,box-shadow]",
          "leading-6.5 text-base",
          "has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-destructive/20 has-[[aria-invalid=true]]:dark:ring-destructive/40",
          className,
          !!leadingElement && "ps-3",
          !!trailingElement && "pe-3"
        )}
      >
        {leadingElement}

        <input
          ref={ref}
          className={cn(
            "placeholder:text-muted-foreground flex-1 rounded-md rounded-l-md border-none bg-transparent px-3 py-1 outline-none",
            inputClassName,
            !!leadingElement && "rounded-l-none ps-0",
            !!trailingElement && "rounded-r-none pe-0"
          )}
          {...props}
        />

        {trailingElement}
      </label>
    );
  }
);

InputWithElement.displayName = "InputWithElement";

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputWithElementProps, "leadingElement">
>((props, ref) => {
  return (
    <InputWithElement
      {...props}
      type="search"
      ref={ref}
      trailingElement={
        <SearchIcon className="text-muted-foreground size-3.5 shrink-0 appearance-none" />
      }
    />
  );
});

SearchInput.displayName = "SearchInput";
