
import {
  Users,
  TrendingDown,
  GraduationCap,
  Sparkles } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="HR Reports"
      description="Headcount, turnover, training and payroll analytics."
      breadcrumbs={[{ label: "Reports", to: "/reports/hr" }, { label: "HR Reports" }]}
      emptyIcon={Users}
      primaryActionLabel="New record"
      stats={[
      { label: "Headcount", value: "184", delta: "+3", trend: "up", icon: Users, accent: "primary" },
      { label: "Turnover (yr)", value: "6.4%", delta: "−0.3%", trend: "down", icon: TrendingDown, accent: "success" },
      { label: "Training hrs", value: "1,240", delta: "+92", trend: "up", icon: GraduationCap, accent: "info" },
      { label: "Diversity", value: "48%", delta: "+1%", trend: "up", icon: Sparkles, accent: "warning" }]
      } />);


}
export default Page;
