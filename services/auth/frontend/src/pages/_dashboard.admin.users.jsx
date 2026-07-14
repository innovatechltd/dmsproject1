
import {
  UsersRound,
  Users,
  Mail,
  XCircle,
  ShieldCheck } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Users"
      description="Manage user accounts, invitations and access."
      breadcrumbs={[{ label: "Administration", to: "/admin/users" }, { label: "Users" }]}
      emptyIcon={UsersRound}
      primaryActionLabel="New record"
      stats={[
      { label: "Active users", value: "197", delta: "+4", trend: "up", icon: Users, accent: "primary" },
      { label: "Pending invites", value: "6", delta: "+2", trend: "up", icon: Mail, accent: "warning" },
      { label: "Disabled", value: "12", delta: "0", trend: "flat", icon: XCircle, accent: "destructive" },
      { label: "Admins", value: "5", delta: "0", trend: "flat", icon: ShieldCheck, accent: "info" }]
      } />);


}
export default Page;
