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
        case "Reconciled":
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
  { header: "Month", accessorKey: "month" }
];

const mockData = [
  { id: "BGT-2026", department: "Finance", category: "Monthly Budget", description: "Departmental budget allocation for Q3", amount: "$45,000.00", status: "Approved", month: "July 2026", audit: { addedBy: "CFO", role: "Chief Financial Officer", createdAt: "2026-07-01", updatedAt: "2026-07-02", notes: "Budget finalized" } },
  { id: "HRM-8891", department: "Human Resources", category: "Recruitment", description: "Hiring 5 new field officers", amount: "5 Hires", status: "In Progress", month: "July 2026", audit: { addedBy: "HR Director", role: "HR Director", createdAt: "2026-07-03", updatedAt: "2026-07-10", notes: "Interviews ongoing" } },
  { id: "PRO-7012", department: "Procurement", category: "Audit", description: "Mid-year procurement audit review", amount: "-", status: "Pending", month: "July 2026", audit: { addedBy: "Internal Auditor", role: "Internal Auditor", createdAt: "2026-07-05", updatedAt: "2026-07-05", notes: "Awaiting documents" } },
  { id: "FLT-5541", department: "Fleet Mgmt", category: "Fuel Expense", description: "Total fuel consumption across all regions", amount: "1,250 Liters", status: "Reconciled", month: "June 2026", audit: { addedBy: "Fleet Manager", role: "Fleet Manager", createdAt: "2026-06-30", updatedAt: "2026-07-02", notes: "All receipts verified" } },
  { id: "ADM-9022", department: "Administration", category: "Lease Renewal", description: "Branch office lease payment and renewal", amount: "$5,000.00", status: "Completed", month: "June 2026", audit: { addedBy: "Admin Head", role: "Head of Administration", createdAt: "2026-06-15", updatedAt: "2026-06-20", notes: "Lease signed for 2 years" } },
  { id: "HRM-8892", department: "Human Resources", category: "Payroll", description: "June 2026 Staff Salaries", amount: "$120,000.00", status: "Completed", month: "June 2026", audit: { addedBy: "HR Manager", role: "HR Manager", createdAt: "2026-06-25", updatedAt: "2026-06-28", notes: "Disbursed to all banks" } },
  { id: "PRO-7013", department: "Procurement", category: "Assets", description: "Purchase of office furniture", amount: "$8,500.00", status: "Pending", month: "July 2026", audit: { addedBy: "Procurement Lead", role: "Procurement Lead", createdAt: "2026-07-10", updatedAt: "2026-07-11", notes: "Evaluating bids" } },
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
        title="Monthly Report"
        description="Comprehensive monthly overview, analytics, and historical comparisons."
        breadcrumbs={[{ label: "Reports", to: "/reports/monthly" }, { label: "Monthly Report" }]}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Entries This Month" value="3,214" delta="+18%" trend="up" icon={FileText} accent="primary" index={0} />
        <StatCard label="Budget Utilized" value="68%" delta="-2%" trend="down" icon={PieChart} accent="info" index={1} />
        <StatCard label="Overdue Items" value="12" delta="-3" trend="down" icon={Calendar} accent="warning" index={2} />
        <StatCard label="Goals Reached" value="94%" delta="+5%" trend="up" icon={FileText} accent="success" index={3} />
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
