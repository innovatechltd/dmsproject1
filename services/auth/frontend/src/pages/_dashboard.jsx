
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sidebar } from "@/layouts/Sidebar";
import { Header } from "@/layouts/Header";
import { AppFooter } from "@/layouts/AppFooter";
import { useIsMobile } from "@/hooks/use-mobile";

// TanStack Route removed

function DashboardLayout() {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar — fixed height, scrolls internally */}
      <div className="hidden h-screen shrink-0 lg:block">
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen &&
        <>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)} />
          
            <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 left-0 z-50 h-screen lg:hidden">
            
              <Sidebar
              collapsed={false}
              onNavigate={() => setMobileOpen(false)} />

            </motion.div>
          </>
        }
      </AnimatePresence>

      {/* Main column — header (fixed), scrollable main, footer (fixed) */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          collapsed={collapsed}
          onOpenMobileNav={() => setMobileOpen(true)}
          onToggleCollapse={() => setCollapsed((v) => !v)} />
        
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <motion.div
            key="page"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}>
            
            <Outlet />
          </motion.div>
        </main>
        <AppFooter />
      </div>
    </div>);

}
export default DashboardLayout;
