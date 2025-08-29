"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { Moon, Sun, User } from "lucide-react";

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

export function Navbar() {
  const { signOut } = useAuthActions();
  const { theme, setTheme } = useTheme();
  const user = useQuery(api.auth.currentUser);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 container-padding flex items-center justify-between gap-2 border-b py-2 backdrop-blur">
      <Link href="/" className="text-foreground font-semibold">
        Gen AI Image
      </Link>

      <Button variant="ghost" size="icon" className="ml-auto" onClick={toggleTheme}>
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

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
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="font-medium">{user?.name}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Authenticated>

      <Unauthenticated>
        <Button asChild>
          <Link href={routes.signIn}>Sign In</Link>
        </Button>
      </Unauthenticated>
    </div>
  );
}
