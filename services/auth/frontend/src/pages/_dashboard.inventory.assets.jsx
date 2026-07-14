
import {
  Server,
  CheckCircle2,
  Package,
  Archive } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Assets"
      description="Fixed asset register, depreciation and assignments."
      breadcrumbs={[{ label: "Inventory", to: "/inventory/assets" }, { label: "Assets" }]}
      emptyIcon={Server}
      primaryActionLabel="New record"
      stats={[
      { label: "Assets", value: "612", delta: "+9", trend: "up", icon: Server, accent: "primary" },
      { label: "Assigned", value: "548", delta: "+7", trend: "up", icon: CheckCircle2, accent: "success" },
      { label: "In storage", value: "52", delta: "+2", trend: "up", icon: Package, accent: "info" },
      { label: "Retired (yr)", value: "12", delta: "+1", trend: "up", icon: Archive, accent: "warning" }]
      } />);


}
export default Page;
