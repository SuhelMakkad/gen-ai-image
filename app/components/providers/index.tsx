import React from "react";

import { Toaster } from "@/components/ui/sonner";

import ConvexClientProvider from "./convex-client-provider";
import { ThemeProvider } from "./theme-provider";

export const GlobalProviders = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ConvexClientProvider>
        {children}
        <Toaster richColors />
      </ConvexClientProvider>
    </ThemeProvider>
  );
};
