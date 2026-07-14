
import {
  ShieldAlert,
  AlertCircle,
  CheckCircle2,
  Shield } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Offences"
      description="Track disciplinary cases, sanctions and case history."
      breadcrumbs={[{ label: "Human Resources", to: "/hr/offences" }, { label: "Offences" }]}
      emptyIcon={ShieldAlert}
      primaryActionLabel="New record"
      stats={[
      { label: "Open cases", value: "3", delta: "0", trend: "flat", icon: AlertCircle, accent: "warning" },
      { label: "Resolved (yr)", value: "11", delta: "+2", trend: "up", icon: CheckCircle2, accent: "success" },
      { label: "Warnings", value: "7", delta: "+1", trend: "up", icon: ShieldAlert, accent: "warning" },
      { label: "Suspensions", value: "1", delta: "0", trend: "flat", icon: Shield, accent: "destructive" }]
      } />);


}
export default Page;
