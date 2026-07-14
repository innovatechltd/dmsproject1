
import {
  BookOpen,
  Boxes,
  RefreshCw,
  Download } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Documentation"
      description="In-depth technical and admin documentation."
      breadcrumbs={[{ label: "Support", to: "/support/docs" }, { label: "Documentation" }]}
      emptyIcon={BookOpen}
      primaryActionLabel="New record"
      stats={[
      { label: "Pages", value: "312", delta: "+12", trend: "up", icon: BookOpen, accent: "primary" },
      { label: "Modules", value: "12", delta: "0", trend: "flat", icon: Boxes, accent: "info" },
      { label: "Updated (mo)", value: "46", delta: "+8", trend: "up", icon: RefreshCw, accent: "success" },
      { label: "Downloads", value: "842", delta: "+92", trend: "up", icon: Download, accent: "warning" }]
      } />);


}
export default Page;
