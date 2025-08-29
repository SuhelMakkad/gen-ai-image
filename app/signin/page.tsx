"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Loader2 } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

import { useState } from "react";

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

type OAuthProvider = "google" | "github";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const [loading, setLoading] = useState<OAuthProvider | null>(null);

  const handleSocialSignIn = async (provider: OAuthProvider) => {
    try {
      setLoading(provider);

      await signIn(provider, {
        redirectTo: routes.chat,
      });
    } catch (error) {
      setLoading(null);
      toast.error("Failed to sign in", {
        description:
          error instanceof Error ? error.message : "Something went wrong, please try again.",
      });
    }
  };

  return (
    <>
      {/* Left Column - Sign In Form */}
      <main className="mx-auto flex w-full max-w-xs flex-1 flex-col items-center justify-center gap-6">
        {/* Header Section */}
        <header className="w-full text-center">
          <h1 className="text-foreground text-2xl font-semibold">Welcome</h1>
          <p className="text-muted-foreground text-base">Sign in to continue</p>
        </header>

        <div className="flex w-full flex-col gap-4">
          <Button disabled={!!loading} onClick={() => handleSocialSignIn("google")}>
            {loading === "google" ? <Loader2 className="animate-spin" /> : <FaGoogle />}
            Continue with Google
          </Button>
          <Button disabled={!!loading} onClick={() => handleSocialSignIn("github")}>
            {loading === "github" ? <Loader2 className="animate-spin" /> : <FaGithub />}
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
