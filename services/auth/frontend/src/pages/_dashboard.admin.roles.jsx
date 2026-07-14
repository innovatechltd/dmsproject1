
import {
  ShieldCheck,
  KeyRound,
  Users,
  Sparkles } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Roles"
      description="Define roles and assign scoped access."
      breadcrumbs={[{ label: "Administration", to: "/admin/roles" }, { label: "Roles" }]}
      emptyIcon={ShieldCheck}
      primaryActionLabel="New record"
      stats={[
      { label: "Roles", value: "14", delta: "+1", trend: "up", icon: ShieldCheck, accent: "primary" },
      { label: "Permissions", value: "82", delta: "+3", trend: "up", icon: KeyRound, accent: "info" },
      { label: "Users mapped", value: "197", delta: "+4", trend: "up", icon: Users, accent: "success" },
      { label: "Custom roles", value: "6", delta: "+1", trend: "up", icon: Sparkles, accent: "warning" }]
      } />);


}
export default Page;
