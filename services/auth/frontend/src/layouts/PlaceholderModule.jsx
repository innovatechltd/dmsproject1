import { motion } from "framer-motion";
import { Filter, Inbox, Plus, Search, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { StatCard } from "./StatCard";
import { Button } from "@/components/ui/button";





















export function PlaceholderModule({
  title,
  description,
  breadcrumbs,
  stats = [],
  primaryActionLabel = "New record",
  emptyIcon: EmptyIcon = Inbox,
  emptyTitle = "No records yet",
  emptyDescription = "Once your team starts using this module, entries will appear here. This screen is ready to be wired to the backend."
}) {
  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        actions={
        <>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
              <Plus className="h-4 w-4" />
              {primaryActionLabel}
            </Button>
          </>
        } />
      

      {stats.length > 0 &&
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s, i) =>
        <StatCard key={s.label} {...s} index={i} />
        )}
        </div>
      }

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder={`Search ${title.toLowerCase()}…`}
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
            
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>All statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Archived</option>
            </select>
          </div>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <EmptyIcon className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">{emptyTitle}</h3>
          <p className="max-w-md text-sm text-muted-foreground">{emptyDescription}</p>
          <div className="mt-2 flex gap-2">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
              <Plus className="h-4 w-4" />
              {primaryActionLabel}
            </Button>
            <Button size="sm" variant="outline">
              Import CSV
            </Button>
          </div>
        </div>
      </motion.section>
    </div>);

}