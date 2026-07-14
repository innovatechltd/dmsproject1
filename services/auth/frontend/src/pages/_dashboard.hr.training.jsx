
import {
  GraduationCap,
  CalendarDays,
  Award,
  TrendingUp } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Training"
      description="Plan learning journeys, sessions and certifications for staff."
      breadcrumbs={[{ label: "Human Resources", to: "/hr/training" }, { label: "Training" }]}
      emptyIcon={GraduationCap}
      primaryActionLabel="New record"
      stats={[
      { label: "Programmes", value: "18", delta: "+2", trend: "up", icon: GraduationCap, accent: "primary" },
      { label: "Sessions", value: "46", delta: "+9", trend: "up", icon: CalendarDays, accent: "info" },
      { label: "Certificates", value: "112", delta: "+11", trend: "up", icon: Award, accent: "success" },
      { label: "Completion", value: "87%", delta: "+4%", trend: "up", icon: TrendingUp, accent: "success" }]
      } />);


}
export default Page;
