"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated, useAction, useQuery } from "convex/react";
import { ArrowUpRightIcon, Coins, LogOut, Moon, Sun, User } from "lucide-react";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { api } from "@/convex/_generated/api";
import { routes } from "@/utils/routes";
import { cn } from "@/utils/ui";

import { CreditDetails } from "./credit-details";

export const Navbar = (props: { className?: string }) => {
  const [billingUrl, setBillingUrl] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const { signOut } = useAuthActions();

  const user = useQuery(api.auth.currentUser);
  const userCredits = useQuery(api.credits.getUserCredits);
  const generateCustomerPortalUrl = useAction(api.polar.generateCustomerPortalUrl);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const fetchBillingUrl = async () => {
      const response = await generateCustomerPortalUrl().catch(() => null);
      if (response) {
        setBillingUrl(response.url);
      }
    };

    fetchBillingUrl();
  }, [generateCustomerPortalUrl]);

  return (
    <div
      className={cn(
        "container-padding sticky top-0 z-10 flex items-center justify-between gap-2 bg-transparent py-2",
        props.className
      )}
    >
      <Link href="/" className="text-foreground font-semibold">
        Gen AI Image
      </Link>

      <Button variant="ghost" size="icon" className="ml-auto" onClick={toggleTheme}>
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Authenticated>
        <div className="bg-muted flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium">
          <Coins className="text-muted-foreground h-4 w-4" />
          <span>{userCredits?.balance || 0}</span>
        </div>
      </Authenticated>

      <Authenticated>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <CreditDetails />

            <div className="flex flex-col px-2 py-3">
              <div className="font-medium">{user?.name}</div>
              <div className="text-muted-foreground truncate text-xs">{user?.email}</div>
            </div>

            {!!billingUrl && (
              <DropdownMenuItem className="text-sm" asChild>
                <a href={billingUrl} target="_blank" rel="noopener noreferrer">
                  <ArrowUpRightIcon />
                  Billing
                </a>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-sm" onClick={() => signOut()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Authenticated>

      <Unauthenticated>
        <Button asChild className="h-6.75 px-2.5">
          <Link href={routes.signIn}>Sign In</Link>
        </Button>
      </Unauthenticated>
    </div>
  );
};
