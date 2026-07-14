import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CalendarDays,
  CalendarRange,
  FileIcon,
  FileSpreadsheet,
  FileText,
  MoreVertical,
  Printer,
  RefreshCw,
  SlidersHorizontal
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function ReportFilterBar({ title = "Report" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  // We can track the active tab locally to switch views instantly without actually changing routes if desired, 
  // but to keep it simple and react-router friendly, we can just use state if it's the same page, or rely on URL.
  // Since the user might just want to see the UI change, let's use local state for the tab so it works seamlessly.
  const [activeTab, setActiveTab] = useState(
    path.includes("weekly") ? "weekly" :
      path.includes("monthly") ? "monthly" : "daily"
  );

  const [exportOpen, setExportOpen] = useState(false);
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Jul");

  const tabs = [
    { id: "daily", label: "Daily", icon: Calendar },
    { id: "weekly", label: "Weekly", icon: CalendarDays },
    { id: "monthly", label: "Monthly", icon: Calendar },
    { id: "date-range", label: "Date Range", icon: CalendarRange },
    { id: "monthly-range", label: "Monthly Range", icon: CalendarRange },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm mb-6">
      {/* Top Tabs & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <Button
                key={tab.id}
                variant={isActive ? "default" : "outline"}
                className={cn(
                  "h-9 px-3 gap-2",
                  isActive ? "bg-success hover:bg-success/90 text-white border-success" : "bg-background text-foreground"
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Button 
              variant="outline" 
              className={cn("h-10 gap-2 rounded-xl transition-colors", moreFiltersOpen ? "border-primary bg-primary/5 text-primary" : "border-border/60 bg-background/50 hover:bg-accent/50")}
              onClick={() => setMoreFiltersOpen(!moreFiltersOpen)}
            >
               <SlidersHorizontal className="h-4 w-4" /> 
               <span className="font-medium">More Filters</span>
            </Button>
            
            <AnimatePresence>
              {moreFiltersOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-border/60 bg-popover/95 backdrop-blur-md shadow-elevated z-50 overflow-hidden p-4"
                >
                  <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-semibold text-foreground/80">Additional Filters</h4>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Department</label>
                      <select className="h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>All Departments</option>
                        <option>Human Resources</option>
                        <option>Finance</option>
                        <option>Procurement</option>
                        <option>Fleet Management</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Status</label>
                      <select className="h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>All Statuses</option>
                        <option>Completed</option>
                        <option>In Progress</option>
                        <option>Pending</option>
                        <option>Rejected</option>
                      </select>
                    </div>
                    
                    <Button className="w-full h-9 rounded-lg mt-2" onClick={() => setMoreFiltersOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Button className="h-10 gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all">
            <RefreshCw className="h-4 w-4" /> 
            <span className="font-medium">Refresh Data</span>
          </Button>
        </div>
      </div>

      {/* Date Selectors based on active tab */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {activeTab === "daily" && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-warning">
              <Calendar className="h-4 w-4" /> Select Date:
            </div>
            <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
              <option>Today, Sun - 12-July-2026</option>
              <option>Yesterday, Sat - 11-July-2026</option>
            </select>
          </div>
        )}

        {activeTab === "weekly" && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-warning">
                <CalendarDays className="h-4 w-4" /> From Week:
              </div>
              <select className="h-9 w-44 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
                <option>-- Select From week --</option>
                <option>Week 27 (Jul 6 - Jul 12)</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium">To Week:</div>
              <select className="h-9 w-44 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
                <option>-- Select To week --</option>
                <option>Week 28 (Jul 13 - Jul 19)</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === "monthly" && (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-warning">
                <Calendar className="h-4 w-4" /> Select Month:
              </div>
              <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
                <option>Current - July 2026</option>
                <option>June 2026</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground mr-2">2026:</span>
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md border transition-colors",
                    m === selectedMonth ? "bg-success text-white border-success font-medium" : "bg-background border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "date-range" && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-warning">
                <CalendarRange className="h-4 w-4" /> From:
              </div>
              <select className="h-9 w-44 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
                <option>Wed - 01-July-2026</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium">To:</div>
              <select className="h-9 w-44 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
                <option>-- Select To date --</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === "monthly-range" && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-warning">
                <CalendarRange className="h-4 w-4" /> From Month:
              </div>
              <select className="h-9 w-44 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
                <option>Current - July 2026</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium">To Month:</div>
              <select className="h-9 w-44 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
                <option>Current - July 2026</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-px bg-border my-2" />

      {/* Footer Info & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground flex items-center gap-1.5">
          <div className="grid h-4 w-4 place-items-center rounded-full bg-warning text-[10px] font-bold text-white">i</div>
          <span>Showing: <strong className="text-foreground">{activeTab === "daily" ? "Daily" : activeTab === "weekly" ? "Weekly" : activeTab === "monthly" ? "Monthly" : activeTab === "date-range" ? "Date Range" : "Monthly Range"} {title}</strong> for <span className="text-warning font-medium">July 12, 2026</span></span>
        </div>

        <div className="flex items-center gap-2 relative">
          <span className="text-sm font-medium text-muted-foreground mr-1">Export:</span>

          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-accent" onClick={() => setExportOpen(!exportOpen)}>
            <MoreVertical className="h-4 w-4 text-foreground" />
          </Button>

          <AnimatePresence>
            {exportOpen && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute right-0 bottom-full mb-1 w-40 rounded-lg border border-border bg-popover shadow-elevated z-50 overflow-hidden"
              >
                <div className="flex flex-col py-1">
                  <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent text-left"><Printer className="h-4 w-4 text-gray-700" /> Print</button>
                  <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent text-left"><FileIcon className="h-4 w-4 text-red-500" /> PDF (.pdf)</button>
                  <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent text-left"><FileSpreadsheet className="h-4 w-4 text-green-600" /> Excel (.xlsx)</button>
                  <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent text-left"><FileText className="h-4 w-4 text-blue-500" /> CSV (.csv)</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
