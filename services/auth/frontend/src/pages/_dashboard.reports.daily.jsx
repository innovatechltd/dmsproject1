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
  { header: "Time", accessorKey: "time" }
];

const mockData = [
  { id: "REQ-7091", department: "Human Resources", category: "Leave Request", description: "Annual leave application for J. Smith", amount: "3 Days", status: "Approved", time: "09:14 AM", audit: { addedBy: "Jane Doe", role: "HR Manager", createdAt: "2026-07-12", updatedAt: "2026-07-12", notes: "Approved by HR Manager" } },
  { id: "FIN-1042", department: "Finance", category: "Payment Processing", description: "Vendor payment for office supplies", amount: "$450.00", status: "Pending", time: "10:30 AM", audit: { addedBy: "System", role: "Automated Process", createdAt: "2026-07-12", updatedAt: "2026-07-12", notes: "Awaiting CFO approval" } },
  { id: "PRO-9921", department: "Procurement", category: "RFQ Approval", description: "New laptops for IT department", amount: "5 Units", status: "Completed", time: "11:05 AM", audit: { addedBy: "Admin", role: "Super Admin", createdAt: "2026-07-11", updatedAt: "2026-07-12", notes: "Delivered to IT" } },
  { id: "FLT-3304", department: "Fleet Mgmt", category: "Fuel Log", description: "Vehicle RAA-123 fuel top-up", amount: "45 Liters", status: "Logged", time: "01:22 PM", audit: { addedBy: "Driver Alex", role: "Fleet Driver", createdAt: "2026-07-12", updatedAt: "2026-07-12", notes: "Logged via mobile app" } },
  { id: "FIN-1043", department: "Finance", category: "Mission Clearance", description: "Travel request to branch office", amount: "$120.00", status: "Rejected", time: "03:45 PM", audit: { addedBy: "Finance Officer", role: "Finance Officer", createdAt: "2026-07-12", updatedAt: "2026-07-12", notes: "Budget exceeded for Q3" } },
  { id: "REQ-7092", department: "Human Resources", category: "Leave Request", description: "Sick leave for P. Ndizeye", amount: "2 Days", status: "Pending", time: "04:00 PM", audit: { addedBy: "P. Ndizeye", role: "Staff", createdAt: "2026-07-12", updatedAt: "2026-07-12", notes: "Doctor note attached" } },
  { id: "PRO-9922", department: "Procurement", category: "Stationery", description: "A4 Papers 50 boxes", amount: "50 Boxes", status: "Approved", time: "04:15 PM", audit: { addedBy: "Admin", role: "Procurement Lead", createdAt: "2026-07-12", updatedAt: "2026-07-12", notes: "Supplier confirmed delivery for tomorrow" } },
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
        title="Daily Report"
        description="Detailed daily activities and metrics."
        breadcrumbs={[{ label: "Reports", to: "/reports/daily" }, { label: "Daily Report" }]}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Entries Today" value="142" delta="+12%" trend="up" icon={FileText} accent="primary" index={0} />
        <StatCard label="Active Staff" value="45" delta="+2" trend="up" icon={PieChart} accent="info" index={1} />
        <StatCard label="Pending Tasks" value="18" delta="-5" trend="down" icon={Calendar} accent="warning" index={2} />
        <StatCard label="Completed" value="84" delta="+15" trend="up" icon={FileText} accent="success" index={3} />
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
