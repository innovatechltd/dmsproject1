
import {
  MessageSquare,
  CheckCircle2,
  Clock,
  Star } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Contact Support"
      description="Reach out to the DMS support team."
      breadcrumbs={[{ label: "Support", to: "/support/contact" }, { label: "Contact Support" }]}
      emptyIcon={MessageSquare}
      primaryActionLabel="New record"
      stats={[
      { label: "Open tickets", value: "4", delta: "+1", trend: "up", icon: MessageSquare, accent: "warning" },
      { label: "Resolved (mo)", value: "62", delta: "+8", trend: "up", icon: CheckCircle2, accent: "success" },
      { label: "Avg. reply", value: "2h", delta: "−15m", trend: "down", icon: Clock, accent: "primary" },
      { label: "Satisfaction", value: "4.7", delta: "+0.1", trend: "up", icon: Star, accent: "info" }]
      } />);


}
export default Page;
