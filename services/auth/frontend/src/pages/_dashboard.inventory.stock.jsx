
import {
  Package,
  AlertCircle,
  ArrowLeftRight,
  Wallet } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Stock"
      description="Consumables, supplies and warehouse levels."
      breadcrumbs={[{ label: "Inventory", to: "/inventory/stock" }, { label: "Stock" }]}
      emptyIcon={Package}
      primaryActionLabel="New record"
      stats={[
      { label: "SKUs", value: "428", delta: "+6", trend: "up", icon: Package, accent: "primary" },
      { label: "Low stock", value: "14", delta: "+3", trend: "up", icon: AlertCircle, accent: "warning" },
      { label: "Movements (mo)", value: "312", delta: "+22", trend: "up", icon: ArrowLeftRight, accent: "info" },
      { label: "Value", value: "RWF 46M", delta: "+1%", trend: "up", icon: Wallet, accent: "success" }]
      } />);


}
export default Page;
