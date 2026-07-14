
import {
  Banknote,
  FileText,
  Coins,
  Wallet } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Payroll"
      description="Salaries, allowances, statutory contributions and payslips."
      breadcrumbs={[{ label: "Human Resources", to: "/hr/payroll" }, { label: "Payroll" }]}
      emptyIcon={Banknote}
      primaryActionLabel="New record"
      stats={[
      { label: "Payroll (mo)", value: "RWF 92M", delta: "+2%", trend: "up", icon: Banknote, accent: "primary" },
      { label: "Payslips", value: "184", delta: "0", trend: "flat", icon: FileText, accent: "info" },
      { label: "Deductions", value: "RWF 14M", delta: "+1%", trend: "up", icon: Coins, accent: "warning" },
      { label: "Net paid", value: "RWF 78M", delta: "+2%", trend: "up", icon: Wallet, accent: "success" }]
      } />);


}
export default Page;
