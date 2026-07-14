
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Wallet } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Invoices"
      description="Vendor and partner invoices — draft, approve, pay and archive."
      breadcrumbs={[{ label: "Financial Management", to: "/finance/invoices" }, { label: "Invoices" }]}
      emptyIcon={FileText}
      primaryActionLabel="New record"
      stats={[
      { label: "Unpaid", value: "23", delta: "+4", trend: "up", icon: FileText, accent: "warning" },
      { label: "Paid (mo)", value: "76", delta: "+9", trend: "up", icon: CheckCircle2, accent: "success" },
      { label: "Overdue", value: "6", delta: "+2", trend: "up", icon: AlertCircle, accent: "destructive" },
      { label: "Volume", value: "RWF 214M", delta: "+3%", trend: "up", icon: Wallet, accent: "primary" }]
      } />);


}
export default Page;
