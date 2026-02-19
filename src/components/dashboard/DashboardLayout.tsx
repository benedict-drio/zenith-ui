import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationDropdown } from "./NotificationDropdown";
import { MobileBottomNav } from "./MobileBottomNav";
import { FloatingActionButton } from "./FloatingActionButton";
import { AnimatePresence, motion } from "framer-motion";

export function DashboardLayout() {
  const location = useLocation();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b border-border flex items-center justify-between px-4 shrink-0 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <SidebarTrigger />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="min-w-[44px] min-h-[44px] flex items-center justify-center">
                <ThemeToggle />
              </div>
              <div className="min-w-[44px] min-h-[44px] flex items-center justify-center">
                <NotificationDropdown />
              </div>
              <Button variant="outline" size="sm" className="gap-2 min-h-[44px]">
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Connect Wallet</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
        <MobileBottomNav />
        <FloatingActionButton />
      </div>
    </SidebarProvider>
  );
}
