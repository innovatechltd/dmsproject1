import {
  Activity,
  BadgeCheck,
  Banknote,
  BarChart3,
  Bell,
  BookOpen,
  Boxes,
  CalendarDays,
  Car,
  Cog,
  Coins,
  FileQuestion,
  FileText,
  Fuel,
  Gavel,
  GraduationCap,
  HelpCircle,
  IdCard,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  MessageSquare,
  Package,
  PieChart,
  ReceiptText,
  Send,
  Server,
  Settings,
  Settings2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  Truck,
  UserCircle,
  UserPlus,
  Users,
  UsersRound,
  Wallet
} from "lucide-react";















export const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  {
    id: "hr",
    label: "Human Resources",
    icon: Users,
    children: [
      { label: "Recruitment", to: "/hr/recruitment", icon: UserPlus },
      { label: "Candidate Profiles", to: "/hr/candidates", icon: IdCard },
      { label: "Training", to: "/hr/training", icon: GraduationCap },
      { label: "Performance", to: "/hr/performance", icon: TrendingUp },
      { label: "Leave", to: "/hr/leave", icon: CalendarDays },
      { label: "Payroll", to: "/hr/payroll", icon: Banknote },
      { label: "Offences", to: "/hr/offences", icon: ShieldAlert }]
  },
  {
    id: "finance",
    label: "Financial Management",
    icon: Wallet,
    children: [
      { label: "Requests", to: "/finance/requests", icon: Send },
      { label: "Payments", to: "/finance/payments", icon: ReceiptText },
      { label: "Mission Clearance", to: "/finance/mission-clearance", icon: BadgeCheck },
      { label: "Petty Cash", to: "/finance/petty-cash", icon: Coins },
      { label: "Invoices", to: "/finance/invoices", icon: FileText }]
  },
  {
    id: "fleet",
    label: "Fleet Management",
    icon: Truck,
    children: [
      { label: "Vehicles", to: "/fleet/vehicles", icon: Car },
      { label: "Fuel", to: "/fleet/fuel", icon: Fuel }]
  },
  {
    id: "procurement",
    label: "Procurement",
    icon: ShoppingCart,
    children: [
      { label: "RFQ", to: "/procurement/rfq", icon: FileQuestion },
      { label: "Auctions", to: "/procurement/auctions", icon: Gavel }]
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: Boxes,
    children: [
      { label: "Stock", to: "/inventory/stock", icon: Package },
      { label: "Assets", to: "/inventory/assets", icon: Server }]
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    children: [
      { label: "Daily Report", to: "/reports/daily", icon: FileText },
      { label: "Weekly Report", to: "/reports/weekly", icon: FileText },
      { label: "Monthly Report", to: "/reports/monthly", icon: FileText }]
  },
  {
    id: "admin",
    label: "Administration",
    icon: Settings2,
    children: [
      { label: "Users", to: "/admin/users", icon: UsersRound },
      { label: "Roles", to: "/admin/roles", icon: ShieldCheck },
      { label: "Permissions", to: "/admin/permissions", icon: KeyRound },
      { label: "Settings", to: "/admin/settings", icon: Cog }]
  },
  {
    id: "support",
    label: "Support",
    icon: LifeBuoy,
    children: [
      { label: "Help Center", to: "/support/help", icon: HelpCircle },
      { label: "Documentation", to: "/support/docs", icon: BookOpen },
      { label: "Contact Support", to: "/support/contact", icon: MessageSquare }]
  }];