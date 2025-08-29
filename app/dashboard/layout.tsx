import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { ChatSidebar } from "@/app/dashboard/components/chat-sidebar";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <SidebarProvider className="relative">
      <ChatSidebar />

      <Button
        asChild
        size="icon"
        variant="ghost"
        className="bg-background absolute left-2 top-2 z-10 size-7"
      >
        <SidebarTrigger />
      </Button>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
