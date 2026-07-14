
import {
  FileQuestion,
  Users,
  Award,
  Wallet } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="RFQ"
      description="Requests for quotations, vendor responses and awards."
      breadcrumbs={[{ label: "Procurement", to: "/procurement/rfq" }, { label: "RFQ" }]}
      emptyIcon={FileQuestion}
      primaryActionLabel="New record"
      stats={[
      { label: "Open RFQs", value: "7", delta: "+2", trend: "up", icon: FileQuestion, accent: "primary" },
      { label: "Vendors", value: "46", delta: "+3", trend: "up", icon: Users, accent: "info" },
      { label: "Awarded (mo)", value: "5", delta: "+1", trend: "up", icon: Award, accent: "success" },
      { label: "Value", value: "RWF 92M", delta: "+4%", trend: "up", icon: Wallet, accent: "warning" }]
      } />);


}
export default Page;
