import { AppSidebar } from './Sidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';

export default function Nav({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-screen">
        <AppSidebar />
        <SidebarInset className="flex w-full flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1"></div>
          </header>
          <main className="flex h-full w-full overflow-auto p-6 bg-gradient-to-br from-gray-100 to-gray-200">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}