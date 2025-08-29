import React from "react";

import ConvexClientProvider from "./convex-client-provider";
import { ThemeProvider } from "./theme-provider";

export const GlobalProviders = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ThemeProvider>
  );
};
