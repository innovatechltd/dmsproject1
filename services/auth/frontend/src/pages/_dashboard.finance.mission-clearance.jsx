
import {
  BadgeCheck,
  Clock,
  AlertCircle,
  Wallet } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Mission Clearance"
      description="Post-mission expense clearance and reconciliation."
      breadcrumbs={[{ label: "Financial Management", to: "/finance/mission-clearance" }, { label: "Mission Clearance" }]}
      emptyIcon={BadgeCheck}
      primaryActionLabel="New record"
      stats={[
      { label: "Awaiting clearance", value: "11", delta: "+2", trend: "up", icon: Clock, accent: "warning" },
      { label: "Cleared (mo)", value: "34", delta: "+8", trend: "up", icon: BadgeCheck, accent: "success" },
      { label: "Overdue", value: "3", delta: "+1", trend: "up", icon: AlertCircle, accent: "destructive" },
      { label: "Refunds", value: "RWF 2.1M", delta: "+0.4M", trend: "up", icon: Wallet, accent: "primary" }]
      } />);


}
export default Page;
