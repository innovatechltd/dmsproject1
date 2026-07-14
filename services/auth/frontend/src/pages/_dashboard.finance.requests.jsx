
import {
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  Wallet } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Payment Requests"
      description="Submit and approve internal payment requests."
      breadcrumbs={[{ label: "Financial Management", to: "/finance/requests" }, { label: "Payment Requests" }]}
      emptyIcon={Send}
      primaryActionLabel="New record"
      stats={[
      { label: "Pending", value: "14", delta: "+3", trend: "up", icon: Clock, accent: "warning" },
      { label: "Approved (mo)", value: "82", delta: "+11", trend: "up", icon: CheckCircle2, accent: "success" },
      { label: "Rejected", value: "5", delta: "−1", trend: "down", icon: XCircle, accent: "destructive" },
      { label: "Total value", value: "RWF 62M", delta: "+7%", trend: "up", icon: Wallet, accent: "primary" }]
      } />);


}
export default Page;
