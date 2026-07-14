
import {
  Car,
  CheckCircle2,
  Wrench,
  AlertCircle } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Vehicles"
      description="Vehicle register, assignments, service and insurance."
      breadcrumbs={[{ label: "Fleet Management", to: "/fleet/vehicles" }, { label: "Vehicles" }]}
      emptyIcon={Car}
      primaryActionLabel="New record"
      stats={[
      { label: "Fleet size", value: "24", delta: "0", trend: "flat", icon: Car, accent: "primary" },
      { label: "In service", value: "18", delta: "+1", trend: "up", icon: CheckCircle2, accent: "success" },
      { label: "Maintenance", value: "4", delta: "+1", trend: "up", icon: Wrench, accent: "warning" },
      { label: "Off-road", value: "2", delta: "−1", trend: "down", icon: AlertCircle, accent: "destructive" }]
      } />);


}
export default Page;
