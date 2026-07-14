
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  Globe2,
  LayoutDashboard,
  Leaf,
  LineChart,
  Menu,
  Moon,
  Play,
  ShieldCheck,
  Sparkles,
  Sun,
  Truck,
  Users,
  Wallet,
  X } from
"lucide-react";
import { BrandLogo } from "@/layouts/BrandLogo";
import { LanguageSwitcher } from "@/layouts/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/utils/theme";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#about", label: "About" },
  { href: "#benefits", label: "Benefits" },
  { href: "#contact", label: "Contact" },
];

const externalNavLinks = [
  { to: "/careers", label: "Recruitment" },
];

// TanStack Route removed

const modules = [
  {
    title: "Human Resources",
    desc: "Recruitment, training, performance, leave, payroll and offences in one place.",
    icon: Users,
  },
  {
    title: "Finance",
    desc: "Payment requests, invoices, petty cash and mission clearance with full audit trails.",
    icon: Wallet,
  },
  {
    title: "Fleet Management",
    desc: "Track vehicles and fuel usage across every office and field programme.",
    icon: Truck,
  },
  {
    title: "Procurement",
    desc: "Manage RFQs and auctions with transparent, governed approval workflows.",
    icon: ShieldCheck,
  },
  {
    title: "Inventory & Assets",
    desc: "Keep stock and organisational assets accounted for down to the last item.",
    icon: Boxes,
  },
  {
    title: "Reports & Analytics",
    desc: "Financial, HR and dashboard reporting to guide decisions at every level.",
    icon: BarChart3,
  },
];

const stats = [
  { value: "8+", label: "Integrated modules" },
  { value: "100%", label: "Audited workflows" },
  { value: "1", label: "System of record" },
  { value: "24/7", label: "Secure access" },
];

const benefits = [
  "Every department working from a single source of truth",
  "Governance and approvals built into each workflow",
  "Full audit trails on financial and HR actions",
  "Role-based access aligned to your organisation",
  "Reporting that turns operations into insight",
];

function LandingPage() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandLogo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            {navLinks.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-foreground">{n.label}</a>
            ))}
            {externalNavLinks.map((n) => (
              <Link key={n.to} to={n.to} className="hover:text-foreground">{n.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher compact />
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="inline-flex rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground">
              {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>
            <Button asChild size="sm" className="hidden bg-primary text-primary-foreground hover:bg-[var(--primary-hover)] sm:inline-flex">
              <Link to="/login">
                Sign in <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="inline-flex rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground md:hidden">
              {menuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border/60 md:hidden">
              <div className="flex flex-col gap-1 px-4 py-3 text-sm font-medium text-muted-foreground sm:px-6">
                {navLinks.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 hover:bg-accent/40 hover:text-foreground">
                    {n.label}
                  </a>
                ))}
                {externalNavLinks.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 hover:bg-accent/40 hover:text-foreground">
                    {n.label}
                  </Link>
                ))}
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
                  Sign in <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center">
            
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              One platform to run every{" "}
              <span className="text-primary">
                INADES programme
              </span>{" "}
              in Rwanda.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              DMS brings HR, Finance, Fleet, Procurement, Inventory and Reporting
              into a single enterprise workspace — built for INADES-Formation Rwanda
              teams, partners and auditors.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-[var(--primary-hover)] shadow-elevated">
                <Link to="/login">
                  Login to DMS <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#features">
                  <Play className="h-4 w-4" /> Learn more
                </a>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-6">
              {[
              { icon: ShieldCheck, label: "ISO-aligned security" },
              { icon: LineChart, label: "Donor-ready reporting" },
              { icon: Sparkles, label: "Built for INADES teams" }].
              map((t) =>
              <div key={t.label} className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 py-2 text-xs font-medium text-muted-foreground shadow-soft sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
                  <t.icon className="h-4 w-4 shrink-0 text-primary" />
                  {t.label}
                </div>
              )}
            </div>
          </motion.div>

          {/* Hero illustration: mock dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative">
            
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
              <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                <span className="ml-3 truncate text-[11px] font-medium text-muted-foreground">DMS INADES System / dashboard</span>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-3">
                {[
                { icon: Users, label: "Staff", val: "184", accent: "text-info bg-info/10" },
                { icon: Wallet, label: "Budget used", val: "62%", accent: "text-primary bg-primary/10" },
                { icon: Truck, label: "Missions", val: "27", accent: "text-success bg-success/10" }].
                map((c) =>
                <div key={c.label} className="rounded-xl border border-border p-3">
                    <div className={`inline-grid h-8 w-8 place-items-center rounded-lg ${c.accent}`}>
                      <c.icon className="h-4 w-4" />
                    </div>
                    <p className="mt-2 text-[10px] font-medium uppercase text-muted-foreground">{c.label}</p>
                    <p className="text-lg font-bold text-foreground">{c.val}</p>
                  </div>
                )}
                <div className="rounded-xl border border-border p-4 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-foreground">Programme spending</p>
                    <span className="text-[10px] text-muted-foreground">Last 6 months</span>
                  </div>
                  <svg viewBox="0 0 300 90" className="mt-3 h-24 w-full text-primary">
                    <path
                      d="M0,70 C40,60 60,30 100,35 C140,40 160,15 200,25 C240,35 260,55 300,40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round" />
                  </svg>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs font-semibold text-foreground">Approvals</p>
                  <div className="mt-3 space-y-2">
                    {["HR · Leave", "Finance · Petty cash", "Procurement · RFQ"].map((t) =>
                    <div key={t} className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">{t}</span>
                        <span className="rounded-full bg-warning/15 px-1.5 py-0.5 font-semibold text-warning">Pending</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-3 shadow-elevated sm:block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}>
              
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-success/10 text-success">
                  <LineChart className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">On-time reporting</p>
                  <p className="text-sm font-bold text-foreground">+18% this quarter</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Features</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Every department, one system of record
          </h2>
          <p className="mt-3 text-muted-foreground">
            Purpose-built modules for the way INADES-Formation Rwanda operates —
            with governance and audit built into every workflow.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) =>
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
            
              <div className="inline-grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <m.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{m.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{m.desc}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-y border-border bg-card/50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">About INADES</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              A mission-driven organization,<br />equipped with modern tools
            </h2>
            <p className="mt-4 text-muted-foreground">
              INADES-Formation Rwanda supports rural populations through training,
              research and advocacy. DMS gives programme staff, finance teams and
              leadership a single, transparent workspace to serve those communities
              faster.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
              { icon: Leaf, title: "Community-first" },
              { icon: Globe2, title: "Pan-African network" },
              { icon: ShieldCheck, title: "Governance-ready" },
              { icon: LayoutDashboard, title: "Data-driven decisions" }].
              map((p) =>
              <div key={p.title} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/40 text-primary">
                    <p.icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{p.title}</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div id="stats" className="grid grid-cols-2 gap-4">
            {stats.map((s, i) =>
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-background p-6 shadow-soft">
              
                <p className="text-4xl font-bold text-primary">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Benefits</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for accountability, designed for speed
            </h2>
            <p className="mt-3 text-muted-foreground">
              Replace scattered spreadsheets and email chains with structured
              workflows, audit-ready trails and real-time programme visibility.
            </p>
            <ul className="mt-6 space-y-3">
              {benefits.map((b) =>
              <li key={b} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm text-foreground">{b}</span>
                </li>
              )}
            </ul>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-elevated">

            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Impact
            </p>
            <p className="mt-3 text-4xl font-bold leading-tight text-foreground">
              From weeks to minutes.
            </p>
            <p className="mt-3 max-w-md text-muted-foreground">
              Programme approvals, expense clearances and monthly reports that
              used to take weeks now happen in a few clicks — without losing
              the audit trail.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-6 sm:gap-4">
              {[
              { v: "-72%", l: "Approval time" },
              { v: "+3x", l: "Report accuracy" },
              { v: "100%", l: "Audit trail coverage" }].
              map((k) =>
              <div key={k.l}>
                  <p className="text-xl font-bold text-primary sm:text-2xl">{k.v}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{k.l}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl border border-border bg-card p-10 text-center shadow-elevated">
          
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to modernize your operations?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Sign in with your INADES-Formation account to access the Integrated
            Programme Management System.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
              <Link to="/login">Login to DMS <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">Contact support</a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="border-t border-border bg-card/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <BrandLogo />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              INADES-Formation Rwanda — training, research and advocacy in
              service of rural communities.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Platform</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a className="hover:text-primary" href="#features">Features</a></li>
              <li><a className="hover:text-primary" href="#benefits">Benefits</a></li>
              <li><Link className="hover:text-primary" to="/careers">Recruitment</Link></li>
              <li><Link className="hover:text-primary" to="/login">Sign in</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Support</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link className="hover:text-primary" to="/support/help">Help Center</Link></li>
              <li><Link className="hover:text-primary" to="/support/docs">Documentation</Link></li>
              <li><Link className="hover:text-primary" to="/support/contact">Contact Support</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Kigali, Rwanda</li>
              <li>dms@inades.rw</li>
              <li>+250 000 000 000</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
            <p>© {new Date().getFullYear()} INADES-Formation Rwanda · DMS v1.0.0</p>
            <div className="flex gap-4">
              <a className="hover:text-primary" href="#">Privacy</a>
              <a className="hover:text-primary" href="#">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>);

}
export default LandingPage;
