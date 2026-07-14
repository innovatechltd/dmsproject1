
import {
  Coins,
  Wallet,
  ReceiptText,
  Plus } from
"lucide-react";
import { PlaceholderModule } from "@/layouts/PlaceholderModule";

// TanStack Route removed

function Page() {
  return (
    <PlaceholderModule
      title="Petty Cash"
      description="Manage petty cash floats, top-ups and vouchers."
      breadcrumbs={[{ label: "Financial Management", to: "/finance/petty-cash" }, { label: "Petty Cash" }]}
      emptyIcon={Coins}
      primaryActionLabel="New record"
      stats={[
      { label: "Active floats", value: "6", delta: "0", trend: "flat", icon: Coins, accent: "primary" },
      { label: "Balance", value: "RWF 4.2M", delta: "−0.3M", trend: "down", icon: Wallet, accent: "info" },
      { label: "Vouchers (mo)", value: "124", delta: "+18", trend: "up", icon: ReceiptText, accent: "success" },
      { label: "Top-ups", value: "8", delta: "+1", trend: "up", icon: Plus, accent: "warning" }]
      } />);


}
export default Page;
