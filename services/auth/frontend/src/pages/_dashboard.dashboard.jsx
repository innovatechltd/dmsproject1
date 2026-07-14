
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  Banknote,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Download,
  FileCheck2,
  GraduationCap,
  Package,
  Plus,
  ShieldCheck,
  Truck,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/layouts/PageHeader";
import { StatCard } from "@/layouts/StatCard";
import { Button } from "@/components/ui/button";
import { useChartTheme } from "@/hooks/use-chart-theme";

// ---- Sample data (replace with live API data later) ----
const spendingData = [
  { month: "Jul", spending: 58, budget: 70 },
  { month: "Aug", spending: 66, budget: 70 },
  { month: "Sep", spending: 61, budget: 72 },
  { month: "Oct", spending: 74, budget: 75 },
  { month: "Nov", spending: 69, budget: 75 },
  { month: "Dec", spending: 82, budget: 80 },
];

const deptBudget = [
  { dept: "HR", used: 62 },
  { dept: "Finance", used: 88 },
  { dept: "Fleet", used: 54 },
  { dept: "Procure", used: 71 },
  { dept: "Inventory", used: 43 },
  { dept: "Reports", used: 29 },
];

const expenseBreakdown = [
  { name: "Salaries", value: 42 },
  { name: "Operations", value: 26 },
  { name: "Fleet & fuel", value: 18 },
  { name: "Procurement", value: 14 },
];

const activityTrend = [
  { week: "W1", missions: 12, approvals: 20 },
  { week: "W2", missions: 18, approvals: 24 },
  { week: "W3", missions: 15, approvals: 30 },
  { week: "W4", missions: 22, approvals: 27 },
  { week: "W5", missions: 19, approvals: 33 },
  { week: "W6", missions: 27, approvals: 29 },
];

const headcountByDept = [
  { dept: "HR", staff: 22 },
  { dept: "Finance", staff: 18 },
  { dept: "Fleet", staff: 14 },
  { dept: "Procurement", staff: 11 },
  { dept: "Inventory", staff: 9 },
  { dept: "Programmes", staff: 68 },
  { dept: "Admin", staff: 42 },
];

const fuelVsDistance = [
  { month: "Jul", distanceKm: 4200, fuelL: 620 },
  { month: "Aug", distanceKm: 4650, fuelL: 690 },
  { month: "Sep", distanceKm: 3980, fuelL: 580 },
  { month: "Oct", distanceKm: 5120, fuelL: 740 },
  { month: "Nov", distanceKm: 4800, fuelL: 705 },
  { month: "Dec", distanceKm: 5340, fuelL: 780 },
];

const complianceScores = [
  { label: "HR documentation", score: 96, icon: FileCheck2 },
  { label: "Financial controls", score: 89, icon: ShieldCheck },
  { label: "Training completion", score: 78, icon: GraduationCap },
  { label: "Onboarding SLA", score: 91, icon: UserPlus },
];

function ChartTooltip({ active, payload, label, suffix = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-elevated">
      {label != null && (
        <p className="mb-1 font-semibold text-foreground">{label}</p>
      )}
      {payload.map((p) => (
        <p key={p.dataKey ?? p.name} className="flex items-center gap-2 text-muted-foreground">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color || p.payload?.fill }} />
          <span className="capitalize">{p.name}:</span>
          <span className="font-medium text-foreground">
            {p.value}
            {suffix}
          </span>
        </p>
      ))}
    </div>
  );
}

function Card({ children, className = "", delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`rounded-2xl border border-border bg-card p-5 shadow-soft ${className}`}
    >
      {children}
    </motion.section>
  );
}

function Dashboard() {
  const c = useChartTheme();

  return (
    <div>
      <PageHeader
        title="Welcome back, Jean"
        description="Here's what's happening across INADES programmes today."
        breadcrumbs={[{ label: "Dashboard" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
              <Plus className="h-4 w-4" /> New request
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active staff" value="184" delta="+3.2%" trend="up" icon={Users} accent="info" index={0} />
        <StatCard label="Budget utilised" value="RWF 412M" delta="+8.1%" trend="up" icon={Wallet} accent="primary" index={1} />
        <StatCard label="Missions in progress" value="27" delta="-2" trend="down" icon={Truck} accent="success" index={2} />
        <StatCard label="Pending approvals" value="14" delta="+5" trend="up" icon={AlertCircle} accent="warning" index={3} />
      </div>

      {/* Row 1: spending area (2/3) + expense donut (1/3) */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Programme spending vs budget</h3>
              <p className="text-xs text-muted-foreground">Last 6 months · RWF millions</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
              <ArrowUpRight className="h-3 w-3" /> On track
            </span>
          </div>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c.chart1} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={c.chart1} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 4" stroke={c.border} vertical={false} />
                <XAxis dataKey="month" stroke={c.muted} tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke={c.muted} tickLine={false} axisLine={false} fontSize={12} width={40} />
                <Tooltip content={<ChartTooltip suffix="M" />} />
                <Area
                  type="monotone"
                  dataKey="budget"
                  stroke={c.muted}
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  fill="transparent"
                  name="Budget"
                />
                <Area
                  type="monotone"
                  dataKey="spending"
                  stroke={c.chart1}
                  strokeWidth={2.5}
                  fill="url(#spendFill)"
                  name="Spending"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card delay={0.06}>
          <h3 className="text-base font-semibold text-foreground">Expense breakdown</h3>
          <p className="text-xs text-muted-foreground">Share of total spend</p>
          <div className="mt-2 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={82}
                  paddingAngle={2}
                  stroke={c.card}
                  strokeWidth={2}
                >
                  {expenseBreakdown.map((_, i) => (
                    <Cell key={i} fill={[c.chart1, c.chart2, c.chart3, c.chart4][i % 4]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip suffix="%" />} />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  formatter={(val) => <span style={{ color: c.muted, fontSize: 12 }}>{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 2: dept budget bars (2/3) + approvals queue (1/3) */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">Budget utilisation by department</h3>
            <span className="text-xs text-muted-foreground">% of allocation</span>
          </div>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptBudget} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 4" stroke={c.border} vertical={false} />
                <XAxis dataKey="dept" stroke={c.muted} tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke={c.muted} tickLine={false} axisLine={false} fontSize={12} width={40} />
                <Tooltip cursor={{ fill: c.border, opacity: 0.25 }} content={<ChartTooltip suffix="%" />} />
                <Bar dataKey="used" name="Used" radius={[6, 6, 0, 0]} maxBarSize={48}>
                  {deptBudget.map((d, i) => (
                    <Cell key={i} fill={d.used >= 85 ? c.chart5 : c.chart1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card delay={0.06}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">Approvals queue</h3>
            <span className="text-xs text-muted-foreground">14 pending</span>
          </div>
          <ul className="mt-4 space-y-3">
            {[
              { title: "Petty cash — Field mission", who: "M. Uwase · Finance", icon: Banknote },
              { title: "Leave request — 5 days", who: "P. Nkusi · HR", icon: CalendarDays },
              { title: "RFQ — Office supplies", who: "Procurement", icon: ClipboardList },
              { title: "Mission clearance", who: "S. Habimana · Finance", icon: CheckCircle2 },
            ].map((a) => (
              <li key={a.title} className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent/20">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.who}</p>
                </div>
                <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent/40 hover:text-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Row 3: activity trend line (full width) */}
      <div className="mt-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Missions & approvals trend</h3>
              <p className="text-xs text-muted-foreground">Last 6 weeks</p>
            </div>
          </div>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 4" stroke={c.border} vertical={false} />
                <XAxis dataKey="week" stroke={c.muted} tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke={c.muted} tickLine={false} axisLine={false} fontSize={12} width={40} />
                <Tooltip content={<ChartTooltip />} />
                <Legend iconType="circle" iconSize={8} formatter={(val) => <span style={{ color: c.muted, fontSize: 12 }}>{val}</span>} />
                <Line type="monotone" dataKey="missions" name="Missions" stroke={c.chart1} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="approvals" name="Approvals" stroke={c.chart2} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 4: fleet / inventory / activity */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <h3 className="text-base font-semibold text-foreground">Fleet at a glance</h3>
          <div className="mt-4 space-y-3">
            {[
              { label: "Vehicles active", value: "18/24", pct: 75 },
              { label: "Fuel budget used", value: "62%", pct: 62 },
              { label: "Missions on-time", value: "94%", pct: 94 },
            ].map((r) => (
              <div key={r.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-semibold text-foreground">{r.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card delay={0.05}>
          <h3 className="text-base font-semibold text-foreground">Inventory alerts</h3>
          <ul className="mt-4 space-y-3">
            {[
              { name: "A4 paper", meta: "Low stock · 42 left", tone: "warning" },
              { name: "Toner cartridges", meta: "Reorder point reached", tone: "warning" },
              { name: "First-aid kits", meta: "Expiring in 30 days", tone: "destructive" },
            ].map((i) => (
              <li key={i.name} className="flex items-center gap-3">
                <div
                  className={`grid h-9 w-9 place-items-center rounded-lg ${
                    i.tone === "warning" ? "bg-warning/15 text-warning" : "bg-destructive/10 text-destructive"
                  }`}
                >
                  <Package className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{i.name}</p>
                  <p className="text-xs text-muted-foreground">{i.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card delay={0.1}>
          <h3 className="text-base font-semibold text-foreground">Recent activity</h3>
          <ul className="mt-4 space-y-4">
            {[
              { who: "P. Nkusi", what: "submitted a leave request", when: "2m ago" },
              { who: "Finance", what: "approved payment #INV-2041", when: "18m ago" },
              { who: "HR", what: "onboarded 3 new staff", when: "1h ago" },
              { who: "Procurement", what: "published RFQ #RFQ-334", when: "3h ago" },
            ].map((a) => (
              <li key={a.when} className="flex gap-3">
                <div className="mt-1 grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">
                  <Activity className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.what}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{a.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Row 5: headcount by department (2/3) + SLA gauge (1/3) */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Headcount by department</h3>
              <p className="text-xs text-muted-foreground">184 active staff, organisation-wide</p>
            </div>
          </div>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={headcountByDept} layout="vertical" margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 4" stroke={c.border} horizontal={false} />
                <XAxis type="number" stroke={c.muted} tickLine={false} axisLine={false} fontSize={12} />
                <YAxis dataKey="dept" type="category" stroke={c.muted} tickLine={false} axisLine={false} fontSize={12} width={90} />
                <Tooltip cursor={{ fill: c.border, opacity: 0.25 }} content={<ChartTooltip />} />
                <Bar dataKey="staff" name="Staff" radius={[0, 6, 6, 0]} maxBarSize={22}>
                  {headcountByDept.map((_, i) => (
                    <Cell key={i} fill={[c.chart1, c.chart2, c.chart3, c.chart4, c.chart5, c.chart1, c.chart2][i % 7]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card delay={0.06}>
          <h3 className="text-base font-semibold text-foreground">Overall SLA compliance</h3>
          <p className="text-xs text-muted-foreground">Approvals resolved within target time</p>
          <div className="relative mt-2 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={[{ name: "SLA", value: 92, fill: c.chart1 }]}
                innerRadius="70%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar dataKey="value" cornerRadius={12} background={{ fill: c.border }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">92%</p>
                <p className="text-xs text-muted-foreground">on target</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Row 6: fleet fuel vs distance (full width) */}
      <div className="mt-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Fleet distance vs fuel consumption</h3>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </div>
          </div>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fuelVsDistance} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 4" stroke={c.border} vertical={false} />
                <XAxis dataKey="month" stroke={c.muted} tickLine={false} axisLine={false} fontSize={12} />
                <YAxis yAxisId="left" stroke={c.muted} tickLine={false} axisLine={false} fontSize={12} width={48} />
                <YAxis yAxisId="right" orientation="right" stroke={c.muted} tickLine={false} axisLine={false} fontSize={12} width={48} />
                <Tooltip content={<ChartTooltip />} />
                <Legend iconType="circle" iconSize={8} formatter={(val) => <span style={{ color: c.muted, fontSize: 12 }}>{val}</span>} />
                <Bar yAxisId="left" dataKey="distanceKm" name="Distance (km)" fill={c.chart2} radius={[6, 6, 0, 0]} maxBarSize={36} />
                <Bar yAxisId="right" dataKey="fuelL" name="Fuel (L)" fill={c.chart1} radius={[6, 6, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 7: compliance scorecard */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {complianceScores.map((s, i) => (
          <Card key={s.label} delay={i * 0.05}>
            <div className="flex items-center justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-4 w-4" />
              </div>
              <span className="text-2xl font-bold text-foreground">{s.score}%</span>
            </div>
            <p className="mt-3 text-sm font-medium text-foreground">{s.label}</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${s.score >= 90 ? "bg-success" : s.score >= 80 ? "bg-primary" : "bg-warning"}`}
                style={{ width: `${s.score}%` }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default Dashboard;
