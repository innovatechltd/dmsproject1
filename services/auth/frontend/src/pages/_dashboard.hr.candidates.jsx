
import {
  IdCard,
  Users,
  Star,
  XCircle,
  Clock } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Candidate Profiles"
      description="Central register of candidates evaluated across positions."
      breadcrumbs={[{ label: "Human Resources", to: "/hr/candidates" }, { label: "Candidate Profiles" }]}
      emptyIcon={IdCard}
      primaryActionLabel="New record"
      stats={[
      { label: "Total candidates", value: "482", delta: "+24", trend: "up", icon: Users, accent: "info" },
      { label: "Shortlisted", value: "64", delta: "+7", trend: "up", icon: Star, accent: "primary" },
      { label: "Rejected", value: "210", delta: "+12", trend: "up", icon: XCircle, accent: "destructive" },
      { label: "Under review", value: "32", delta: "−3", trend: "down", icon: Clock, accent: "warning" }]
      } />);


}
export default Page;
