
import {
  Gavel,
  Users,
  CheckCircle2,
  Wallet } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Auctions"
      description="Public and restricted auctions with sealed bids."
      breadcrumbs={[{ label: "Procurement", to: "/procurement/auctions" }, { label: "Auctions" }]}
      emptyIcon={Gavel}
      primaryActionLabel="New record"
      stats={[
      { label: "Live", value: "2", delta: "0", trend: "flat", icon: Gavel, accent: "primary" },
      { label: "Bidders", value: "18", delta: "+4", trend: "up", icon: Users, accent: "info" },
      { label: "Closed (yr)", value: "9", delta: "+1", trend: "up", icon: CheckCircle2, accent: "success" },
      { label: "Revenue", value: "RWF 14M", delta: "+2%", trend: "up", icon: Wallet, accent: "warning" }]
      } />);


}
export default Page;
