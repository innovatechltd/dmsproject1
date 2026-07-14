
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  Timer } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Leave"
      description="Request, approve and track leave balances organization-wide."
      breadcrumbs={[{ label: "Human Resources", to: "/hr/leave" }, { label: "Leave" }]}
      emptyIcon={CalendarDays}
      primaryActionLabel="New record"
      stats={[
      { label: "Pending requests", value: "9", delta: "+3", trend: "up", icon: Clock, accent: "warning" },
      { label: "Approved (mo)", value: "42", delta: "+6", trend: "up", icon: CheckCircle2, accent: "success" },
      { label: "On leave today", value: "7", delta: "+2", trend: "up", icon: CalendarDays, accent: "info" },
      { label: "Avg. balance", value: "14d", delta: "−1d", trend: "down", icon: Timer, accent: "primary" }]
      } />);


}
export default Page;
