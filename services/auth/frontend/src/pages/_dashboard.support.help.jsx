
import {
  HelpCircle,
  BookOpen,
  Boxes,
  Sparkles,
  Star } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Help Center"
      description="Search articles, guides and troubleshooting steps."
      breadcrumbs={[{ label: "Support", to: "/support/help" }, { label: "Help Center" }]}
      emptyIcon={HelpCircle}
      primaryActionLabel="New record"
      stats={[
      { label: "Articles", value: "124", delta: "+6", trend: "up", icon: BookOpen, accent: "primary" },
      { label: "Categories", value: "18", delta: "+1", trend: "up", icon: Boxes, accent: "info" },
      { label: "Popular", value: "24", delta: "+3", trend: "up", icon: Sparkles, accent: "success" },
      { label: "Feedback", value: "96%", delta: "+1%", trend: "up", icon: Star, accent: "warning" }]
      } />);


}
export default Page;
