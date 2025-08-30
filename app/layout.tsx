import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { getMetaData } from "@/utils/seo";

import { GlobalProviders } from "./components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = getMetaData({
  description: "Generate AI images with ease. Transform your ideas into stunning visuals.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/convex.svg" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} flex h-dvh flex-col antialiased`}
        >
          <GlobalProviders>{children}</GlobalProviders>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
