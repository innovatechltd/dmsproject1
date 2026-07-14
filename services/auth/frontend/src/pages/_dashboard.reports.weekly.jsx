import { ReportFilterBar } from "@/components/ReportFilterBar";
import { PageHeader } from "@/layouts/PageHeader";
import { StatCard } from "@/layouts/StatCard";
import { motion } from "framer-motion";
import {
  Calendar,
  FileText,
  PieChart
} from "lucide-react";
import { DataTable } from "@/components/DataTable";

const columns = [
  { header: "ID", accessorKey: "id" },
  { header: "Department", accessorKey: "department" },
  { header: "Category", accessorKey: "category" },
  { header: "Amount / Metric", accessorKey: "amount" },
  { 
    header: "Status", 
    cell: ({ row }) => {
      let colorClass = "";
      switch(row.original.status) {
        case "Approved":
        case "Completed":
          colorClass = "bg-success/10 text-success border-success/20";
          break;
        case "Pending":
          colorClass = "bg-warning/10 text-warning border-warning/20";
          break;
        case "Rejected":
          colorClass = "bg-destructive/10 text-destructive border-destructive/20";
          break;
        default:
          colorClass = "bg-primary/10 text-primary border-primary/20";
      }
      return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${colorClass}`}>
          {row.original.status}
        </span>
      );
    } 
  },
  { header: "Date", accessorKey: "date" }
];

const mockData = [
  { id: "REQ-7055", department: "Human Resources", category: "New Hire Setup", description: "Onboarding packet for A. Niyomugabo", amount: "-", status: "Completed", date: "Jul 10, 2026", audit: { addedBy: "HR Manager", role: "HR Manager", createdAt: "2026-07-10", updatedAt: "2026-07-10", notes: "All documents signed" } },
  { id: "FIN-1021", department: "Finance", category: "Weekly Payroll", description: "Processing contract staff payments", amount: "$3,250.00", status: "Approved", date: "Jul 10, 2026", audit: { addedBy: "Finance Officer", role: "Finance Officer", createdAt: "2026-07-09", updatedAt: "2026-07-10", notes: "Approved by Country Director" } },
  { id: "PRO-9910", department: "Procurement", category: "Supplier Contract", description: "Renewing internet service contract", amount: "1 Year", status: "Pending", date: "Jul 09, 2026", audit: { addedBy: "Procurement Lead", role: "Procurement Lead", createdAt: "2026-07-09", updatedAt: "2026-07-09", notes: "Awaiting vendor signature" } },
  { id: "FLT-3290", department: "Fleet Mgmt", category: "Maintenance", description: "Routine service for RAB-456", amount: "$150.00", status: "In Progress", date: "Jul 08, 2026", audit: { addedBy: "Fleet Manager", role: "Fleet Manager", createdAt: "2026-07-08", updatedAt: "2026-07-10", notes: "Vehicle at the garage" } },
  { id: "ADM-4012", department: "Administration", category: "Facility Repair", description: "AC repair in conference room A", amount: "-", status: "Completed", date: "Jul 06, 2026", audit: { addedBy: "Admin", role: "Admin", createdAt: "2026-07-05", updatedAt: "2026-07-06", notes: "Technician paid in cash" } },
  { id: "REQ-7056", department: "Human Resources", category: "Training", description: "Leadership workshop for managers", amount: "$500.00", status: "Approved", date: "Jul 11, 2026", audit: { addedBy: "Training Coord", role: "Training Coordinator", createdAt: "2026-07-11", updatedAt: "2026-07-11", notes: "Venue booked" } },
  { id: "FIN-1022", department: "Finance", category: "Petty Cash", description: "Replenish petty cash for HQ", amount: "$200.00", status: "Pending", date: "Jul 11, 2026", audit: { addedBy: "Cashier", role: "Cashier", createdAt: "2026-07-11", updatedAt: "2026-07-11", notes: "Request submitted" } },
];

function Page() {
  const handleEdit = (item) => {
    console.log("Edit item:", item);
  };

  const handleDelete = (item) => {
    console.log("Delete item:", item);
  };

  return (
    <div>
      <PageHeader
        title="Weekly Report"
        description="Weekly activities, trends, and aggregate metrics."
        breadcrumbs={[{ label: "Reports", to: "/reports/weekly" }, { label: "Weekly Report" }]}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Entries This Week" value="842" delta="+5%" trend="up" icon={FileText} accent="primary" index={0} />
        <StatCard label="Avg Active Staff" value="48" delta="+3" trend="up" icon={PieChart} accent="info" index={1} />
        <StatCard label="Pending Approvals" value="32" delta="-12" trend="down" icon={Calendar} accent="warning" index={2} />
        <StatCard label="Completed Tasks" value="512" delta="+45" trend="up" icon={FileText} accent="success" index={3} />
      </div>

      <ReportFilterBar title="Report" />

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <DataTable
          columns={columns}
          data={mockData}
          itemsPerPage={5}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </motion.section>
    </div>
  );
}

export default Page;
