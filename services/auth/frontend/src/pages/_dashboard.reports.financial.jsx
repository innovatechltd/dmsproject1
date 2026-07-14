
import {
  Wallet,
  FileText,
  Users,
  TrendingUp,
  ShieldCheck } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Financial Reports"
      description="P&L, budgets, donor and statutory reporting."
      breadcrumbs={[{ label: "Reports", to: "/reports/financial" }, { label: "Financial Reports" }]}
      emptyIcon={Wallet}
      primaryActionLabel="New record"
      stats={[
      { label: "Reports", value: "28", delta: "+3", trend: "up", icon: FileText, accent: "primary" },
      { label: "Donors", value: "11", delta: "0", trend: "flat", icon: Users, accent: "info" },
      { label: "Variance", value: "3.2%", delta: "−0.4%", trend: "down", icon: TrendingUp, accent: "success" },
      { label: "Audit tasks", value: "6", delta: "−1", trend: "down", icon: ShieldCheck, accent: "warning" }]
      } />);


}
export default Page;
