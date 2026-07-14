
import {
  UserPlus,
  Briefcase,
  Users,
  CalendarDays,
  Award } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Recruitment"
      description="Track open positions, applicants and hiring pipelines."
      breadcrumbs={[{ label: "Human Resources", to: "/hr/recruitment" }, { label: "Recruitment" }]}
      emptyIcon={UserPlus}
      primaryActionLabel="New record"
      stats={[
      { label: "Open positions", value: "12", delta: "+2", trend: "up", icon: Briefcase, accent: "primary" },
      { label: "Applicants", value: "148", delta: "+18", trend: "up", icon: Users, accent: "info" },
      { label: "Interviews", value: "23", delta: "+5", trend: "up", icon: CalendarDays, accent: "warning" },
      { label: "Hires this month", value: "4", delta: "+1", trend: "up", icon: Award, accent: "success" }]
      } />);


}
export default Page;
