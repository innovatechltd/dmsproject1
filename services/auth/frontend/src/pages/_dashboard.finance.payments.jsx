
import {
  ReceiptText,
  CalendarDays,
  AlertCircle,
  Wallet } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Payments"
      description="Track outgoing payments, references and reconciliations."
      breadcrumbs={[{ label: "Financial Management", to: "/finance/payments" }, { label: "Payments" }]}
      emptyIcon={ReceiptText}
      primaryActionLabel="New record"
      stats={[
      { label: "Processed (mo)", value: "96", delta: "+9", trend: "up", icon: ReceiptText, accent: "primary" },
      { label: "Scheduled", value: "18", delta: "+2", trend: "up", icon: CalendarDays, accent: "info" },
      { label: "Failed", value: "1", delta: "0", trend: "flat", icon: AlertCircle, accent: "destructive" },
      { label: "Volume", value: "RWF 128M", delta: "+5%", trend: "up", icon: Wallet, accent: "success" }]
      } />);


}
export default Page;
