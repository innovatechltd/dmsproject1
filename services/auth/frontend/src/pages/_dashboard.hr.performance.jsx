
import {
  TrendingUp,
  ClipboardList,
  Target,
  Star,
  AlertCircle } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Performance"
      description="Objectives, evaluations and 360° feedback across the organization."
      breadcrumbs={[{ label: "Human Resources", to: "/hr/performance" }, { label: "Performance" }]}
      emptyIcon={TrendingUp}
      primaryActionLabel="New record"
      stats={[
      { label: "Reviews open", value: "28", delta: "+4", trend: "up", icon: ClipboardList, accent: "primary" },
      { label: "Objectives", value: "164", delta: "+12", trend: "up", icon: Target, accent: "info" },
      { label: "Avg. rating", value: "4.2", delta: "+0.1", trend: "up", icon: Star, accent: "success" },
      { label: "Overdue", value: "6", delta: "+2", trend: "up", icon: AlertCircle, accent: "warning" }]
      } />);


}
export default Page;
