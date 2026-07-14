
import {
  Activity,
  Server,
  AlertCircle,
  ClipboardList } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Activity Log"
      description="Every sign-in, action and change on your account."
      breadcrumbs={[{ label: "Account", to: "/account/activity" }, { label: "Activity Log" }]}
      emptyIcon={Activity}
      primaryActionLabel="New record"
      stats={[
      { label: "Sessions (30d)", value: "64", delta: "+8", trend: "up", icon: Activity, accent: "primary" },
      { label: "Devices", value: "3", delta: "0", trend: "flat", icon: Server, accent: "info" },
      { label: "Failed sign-ins", value: "0", delta: "0", trend: "flat", icon: AlertCircle, accent: "success" },
      { label: "Actions", value: "1,284", delta: "+112", trend: "up", icon: ClipboardList, accent: "warning" }]
      } />);


}
export default Page;
