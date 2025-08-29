"use client";

import { MessageSquare, Search } from "lucide-react";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InputWithElement } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { routes } from "@/utils/routes";

// Mock data for chat list
const mockChats = {
  "Last 7 Days": [
    "Confirm availability for September meeting",
    "Calculate Interest Amount in Excel",
    "Loan interest rate calculation",
    "Date Difference in Months Formula",
  ],
  "Last 30 Days": ["Docker usage question", "Testing NodeJS backend with Jest"],
  Older: [
    "Arabic Translation for Website",
    "React Project with Internal Navigation",
    "End-of-service indemnity calculation",
    "Years of Service Question",
    "AI Website Builder App Names",
    "Salary Account Change Request",
    "DDoS Attack Explanation",
    "Counting Lines of Code on Mac",
    "Curl -u option explanation",
    "Print Statement Debugging",
  ],
};

export function ChatSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      {/* Header */}
      <SidebarHeader className="flex items-center gap-1">
        <SidebarMenu>
          <SidebarMenuItem className="mt-1 flex flex-row items-center gap-2">
            <span className="w-full text-center text-base font-medium">Gen AI Img</span>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup>
          <SidebarGroupContent>
            <Button className="w-full" size="sm">
              New Chat
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Search Bar */}
        <SidebarGroup>
          <SidebarGroupContent>
            <InputWithElement
              leadingElement={<Search className="h-4 w-4 shrink-0" />}
              placeholder="Search your threads..."
              className="bg-sidebar-accent/50 border-sidebar-border"
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent className="no-scrollbar scroll-shadow">
        {Object.entries(mockChats).map(([category, chats]) => (
          <SidebarGroup key={category}>
            <SidebarGroupLabel>{category}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chats.map((chat, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <Link href={routes.chat(index.toString())} className="w-full text-left">
                        <MessageSquare className="h-4 w-4" />
                        <span className="truncate">{chat}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Profile Footer */}
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                  SM
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">Suhel Makkad</p>
                <p className="text-sidebar-muted-foreground text-xs">Free</p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
