import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Search,
  Settings,
  Sun,
  Shield,
  KeyRound,
  Activity,
  User as UserIcon } from
"lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/utils/utils";
import { toast } from "sonner";
import { useTheme } from "@/utils/theme";
import { useAuth } from "@/contexts/AuthContext";






export function Header({ collapsed = false, onOpenMobileNav, onToggleCollapse }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    function onClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target))
      setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
      setProfileOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-2 border-b border-border bg-card/80 px-3 backdrop-blur-md sm:px-5">
      {/* Mobile: open drawer. Desktop: toggle collapse */}
      <button
        type="button"
        onClick={onOpenMobileNav}
        className="inline-flex rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground lg:hidden"
        aria-label="Open menu">
        
        <Menu className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={onToggleCollapse}
        className="hidden items-center justify-center rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent/40 hover:text-primary lg:inline-flex"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>

        {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
      </button>

      {/* Search */}
      <div className="ml-1 flex min-w-0 flex-1 items-center">
        <div className="relative w-full max-w-lg">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search programmes, staff, invoices…"
            className="w-full rounded-xl border border-border bg-background/60 py-2 pl-9 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
          
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground md:inline-block">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        <IconBtn label="Messages">
          <MessageSquare className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-info" />
        </IconBtn>

        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative inline-flex rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
            aria-label="Notifications">
            
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              3
            </span>
          </button>
          <AnimatePresence>
            {notifOpen &&
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-border bg-popover shadow-elevated">
              
                <div className="border-b border-border px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">Notifications</p>
                  <p className="text-xs text-muted-foreground">3 unread</p>
                </div>
                <ul className="max-h-80 divide-y divide-border overflow-y-auto">
                  {[
                { title: "Payment request approved", meta: "Finance · 2m ago", tone: "success" },
                { title: "Leave request pending", meta: "HR · 22m ago", tone: "warning" },
                { title: "New RFQ published", meta: "Procurement · 1h ago", tone: "info" }].
                map((n) =>
                <li key={n.title} className="flex items-start gap-3 px-4 py-3 hover:bg-accent/30">
                      <span
                    className={cn(
                      "mt-1.5 h-2 w-2 rounded-full",
                      n.tone === "success" && "bg-success",
                      n.tone === "warning" && "bg-warning",
                      n.tone === "info" && "bg-info"
                    )} />
                  
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                        <p className="text-xs text-muted-foreground">{n.meta}</p>
                      </div>
                    </li>
                )}
                </ul>
                <div className="border-t border-border px-4 py-2 text-center">
                  <button className="text-xs font-semibold text-primary hover:underline">
                    View all
                  </button>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>

        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>

        <IconBtn label="Toggle dark mode" onClick={toggle}>
          {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </IconBtn>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            className="ml-1 flex items-center gap-2 rounded-xl border border-border bg-card px-1.5 py-1 pr-2 transition-colors hover:border-primary/40 hover:bg-accent/30">
            
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="hidden text-left leading-tight md:block">
              <p className="text-[13px] font-semibold text-foreground">{user?.name || "User"}</p>
              <p className="text-[10px] text-muted-foreground">Programme Officer</p>
            </div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground md:block" />
          </button>
          <AnimatePresence>
            {profileOpen &&
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-popover shadow-elevated">
              
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{user?.name || "User"}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user?.email || "No email"}
                    </p>
                  </div>
                </div>
                <ul className="p-1.5 text-sm">
                  {[
                { label: "My Profile", to: "/account/profile", icon: UserIcon },
                { label: "Account Settings", to: "/account/settings", icon: Settings },
                { label: "Security", to: "/account/security", icon: Shield },
                { label: "Notifications", to: "/account/notifications", icon: Bell },
                { label: "Change Password", to: "/account/change-password", icon: KeyRound },
                { label: "Activity Log", to: "/account/activity", icon: Activity }].
                map((it) =>
                <li key={it.to}>
                      <Link
                    to={it.to}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-foreground hover:bg-accent/40">
                    
                        <it.icon className="h-4 w-4 text-muted-foreground" />
                        {it.label}
                      </Link>
                    </li>
                )}
                </ul>
                <div className="border-t border-border p-1.5">
                  <button
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
                  
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </header>);

}

function IconBtn({
  children,
  label,
  onClick




}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative inline-flex rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground">
      
      {children}
    </button>);

}