"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

import dynamic from "next/dynamic";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { routes } from "@/utils/routes";

const ShootingStars = dynamic(
  () => import("@/components/ui/shooting-stars").then((mod) => mod.ShootingStars),
  { ssr: false }
);
const StarsBackground = dynamic(
  () => import("@/components/ui/stars-background").then((mod) => mod.StarsBackground),
  { ssr: false }
);

export default function SignIn() {
  const { signIn } = useAuthActions();

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      await signIn(provider);
    } catch (error) {
      toast.error("Failed to sign in", {
        description:
          error instanceof Error ? error.message : "Something went wrong, please try again.",
      });
    }
  };

  return (
    <>
      {/* Left Column - Sign In Form */}
      <main className="mx-auto flex w-full max-w-xs flex-1 flex-col items-center justify-center gap-4">
        {/* Header Section */}
        <header className="w-full text-center">
          <h1 className="text-foreground text-3xl font-semibold">Welcome</h1>
          <p className="text-muted-foreground text-base">Sign in to continue</p>
        </header>

        <div className="flex w-full flex-col gap-4">
          <Button onClick={() => handleSocialSignIn("google")}>
            <FaGoogle />
            Continue with Google
          </Button>
          <Button onClick={() => handleSocialSignIn("github")}>
            <FaGithub />
            Continue with GitHub
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6">
        <p className="text-muted-foreground text-center text-xs">
          By continuing, you agree to our{" "}
          <Link href={routes.terms} className="hover:text-foreground font-medium">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href={routes.privacy} className="hover:text-foreground font-medium">
            Privacy Policy
          </Link>
        </p>
      </footer>

      <div className="-z-10">
        <ShootingStars />
        <StarsBackground />
      </div>
    </>
  );
}
