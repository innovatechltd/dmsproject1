
import {
  PieChart,
  LayoutDashboard,
  Database,
  Users,
  Camera } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Dashboard Reports"
      description="Executive dashboards across programmes and finance."
      breadcrumbs={[{ label: "Reports", to: "/reports/dashboard" }, { label: "Dashboard Reports" }]}
      emptyIcon={PieChart}
      primaryActionLabel="New record"
      stats={[
      { label: "Boards", value: "14", delta: "+1", trend: "up", icon: LayoutDashboard, accent: "primary" },
      { label: "Datasets", value: "62", delta: "+4", trend: "up", icon: Database, accent: "info" },
      { label: "Subscribers", value: "38", delta: "+2", trend: "up", icon: Users, accent: "success" },
      { label: "Snapshots", value: "1,248", delta: "+126", trend: "up", icon: Camera, accent: "warning" }]
      } />);


}
export default Page;
