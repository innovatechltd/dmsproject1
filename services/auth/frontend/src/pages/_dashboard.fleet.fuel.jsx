
import {
  Fuel,
  Wallet,
  TrendingUp,
  CreditCard } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Fuel"
      description="Fuel consumption, budgets, cards and refuel logs."
      breadcrumbs={[{ label: "Fleet Management", to: "/fleet/fuel" }, { label: "Fuel" }]}
      emptyIcon={Fuel}
      primaryActionLabel="New record"
      stats={[
      { label: "Litres (mo)", value: "4,820", delta: "+3%", trend: "up", icon: Fuel, accent: "primary" },
      { label: "Cost (mo)", value: "RWF 8.4M", delta: "+5%", trend: "up", icon: Wallet, accent: "warning" },
      { label: "Avg L/100km", value: "11.2", delta: "−0.4", trend: "down", icon: TrendingUp, accent: "success" },
      { label: "Cards active", value: "19", delta: "0", trend: "flat", icon: CreditCard, accent: "info" }]
      } />);


}
export default Page;
