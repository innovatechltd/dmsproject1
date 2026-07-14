
import {
  Cog,
  Plug,
  KeyRound,
  Server,
  Database } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Settings"
      description="System-wide configuration, branding, and integrations."
      breadcrumbs={[{ label: "Administration", to: "/admin/settings" }, { label: "Settings" }]}
      emptyIcon={Cog}
      primaryActionLabel="New record"
      stats={[
      { label: "Integrations", value: "8", delta: "+1", trend: "up", icon: Plug, accent: "primary" },
      { label: "API keys", value: "12", delta: "0", trend: "flat", icon: KeyRound, accent: "info" },
      { label: "Env", value: "Prod", delta: undefined, trend: "flat", icon: Server, accent: "success" },
      { label: "Backups", value: "Daily", delta: undefined, trend: "flat", icon: Database, accent: "warning" }]
      } />);


}
export default Page;
