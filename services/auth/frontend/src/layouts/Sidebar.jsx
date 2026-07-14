import { cn } from "@/utils/utils";
import { LogOut, Search } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { BrandLogo } from "./BrandLogo";
import { NAV } from "./nav-config";

export function Sidebar({ collapsed, onNavigate }) {
  const pathname = useLocation().pathname;
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
  };

  // Filter NAV based on search query
  const filteredNav = NAV.map((group) => {
    if (!searchQuery) return group;

    const lowerQuery = searchQuery.toLowerCase();
    
    // Check if group label matches
    const groupMatches = group.label.toLowerCase().includes(lowerQuery);

    if (!group.children) {
      return groupMatches ? group : null;
    }

    // Filter children
    const filteredChildren = group.children.filter((child) =>
      child.label.toLowerCase().includes(lowerQuery)
    );

    if (groupMatches || filteredChildren.length > 0) {
      return { ...group, children: filteredChildren.length > 0 ? filteredChildren : group.children };
    }

    return null;
  }).filter(Boolean);

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border bg-sidebar",
        "transition-[width] duration-300 ease-out",
        collapsed ? "w-[76px]" : "w-[268px]"
      )}>

      {/* Brand row */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-sidebar-border px-3",
          collapsed ? "justify-center" : "justify-start"
        )}>
        <BrandLogo compact={collapsed} />
      </div>

      {/* Search Input */}
      {!collapsed && (
        <div className="px-3 pt-4 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-sidebar-border bg-sidebar-accent/50 py-2 pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-sidebar-border/50 dark:hover:[&::-webkit-scrollbar-thumb]:bg-sidebar-border transition-all">
        <div className="flex flex-col gap-6">
          {filteredNav.map((group) => (
            <SidebarGroup
              key={group.id}
              group={group}
              collapsed={collapsed}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
          {filteredNav.length === 0 && !collapsed && (
             <div className="text-center text-sm text-muted-foreground mt-4">
               No results found.
             </div>
          )}
        </div>
      </nav>

      {/* Footer actions */}
      <div className="border-t border-sidebar-border p-2.5">
        <button
          type="button"
          onClick={handleLogout}
          className={cn(
            "group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive",
            collapsed && "justify-center px-0"
          )}>
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

function SidebarGroup({ group, collapsed, pathname, onNavigate }) {
  return (
    <div className="flex flex-col gap-1">
      {!collapsed && (
        <div className="px-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          {group.label}
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        {!group.children ? (
          <SidebarLink
            item={group}
            collapsed={collapsed}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ) : (
          group.children.map((child) => (
            <SidebarLink
              key={child.to}
              item={child}
              collapsed={collapsed}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))
        )}
      </div>
    </div>
  );
}

function SidebarLink({ item, collapsed, pathname, onNavigate }) {
  const Icon = item.icon;
  const active = item.to ? pathname.startsWith(item.to) || pathname === item.to : false;

  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13.5px] font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-foreground/80 hover:bg-accent/50 hover:text-foreground",
        collapsed && "justify-center px-0"
      )}
      title={collapsed ? item.label : undefined}>
      {active && !collapsed && (
        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
      )}
      {Icon && (
        <Icon
          className={cn(
            "h-[18px] w-[18px] shrink-0",
            active && "text-primary"
          )}
        />
      )}
      {!collapsed && <span className="truncate">{item.label}</span>}
    </Link>
  );
}