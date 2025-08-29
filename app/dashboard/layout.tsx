import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { ChatSidebar } from "@/app/dashboard/components/chat-sidebar";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <SidebarProvider>
      <ChatSidebar />

      <SidebarInset>
        <div className="p-4">
          <SidebarTrigger />
        </div>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
