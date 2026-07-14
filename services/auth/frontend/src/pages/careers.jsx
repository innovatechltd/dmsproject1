import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Clock,
  Mail,
  MapPin,
  Menu,
  Moon,
  Sun,
  X } from
"lucide-react";
import { BrandLogo } from "@/layouts/BrandLogo";
import { LanguageSwitcher } from "@/layouts/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/utils/theme";

const CAREERS_EMAIL = "careers@inades.rw";

const openings = [
  {
    title: "Programme Officer — Rural Development",
    department: "Programmes",
    location: "Kigali, Rwanda",
    type: "Full-time",
  },
  {
    title: "Finance & Grants Officer",
    department: "Finance",
    location: "Kigali, Rwanda",
    type: "Full-time",
  },
  {
    title: "M&E Officer",
    department: "Monitoring & Evaluation",
    location: "Huye, Rwanda",
    type: "Full-time",
  },
  {
    title: "Field Facilitator — Farmer Training",
    department: "Field Operations",
    location: "Musanze, Rwanda",
    type: "Contract",
  },
];

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#features", label: "Features" },
  { to: "/#about", label: "About" },
];

function applyMailto(title) {
  const subject = encodeURIComponent(`Application: ${title}`);
  const body = encodeURIComponent(
    `Dear INADES-Formation Rwanda Recruitment Team,\n\nI would like to apply for the "${title}" position.\n\nPlease find my CV and cover letter attached.\n\nKind regards,\n`
  );
  return `mailto:${CAREERS_EMAIL}?subject=${subject}&body=${body}`;
}

function CareersPage() {
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
              <Link key={n.to} to={n.to} className="hover:text-foreground">{n.label}</Link>
            ))}
            <span className="text-foreground">Recruitment</span>
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
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 hover:bg-accent/40 hover:text-foreground">
                    {n.label}
                  </Link>
                ))}
                <span className="rounded-lg px-3 py-2.5 text-foreground">Recruitment</span>
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
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Recruitment</span>
            <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Build your career with INADES-Formation Rwanda
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Join a mission-driven team working alongside rural communities across
              Rwanda. Explore our open positions below and apply directly by email.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OPENINGS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Open positions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {openings.length} roles currently open across our programmes
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          {openings.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-elevated sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-4">
                <div className="hidden shrink-0 rounded-xl bg-primary/10 p-3 text-primary sm:grid sm:place-items-center">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">{job.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground sm:text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" /> {job.department}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {job.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:shrink-0">
                <Badge variant="secondary" className="hidden sm:inline-flex">Open</Badge>
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-[var(--primary-hover)] sm:w-auto">
                  <a href={applyMailto(job.title)}>
                    Apply now <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* General application */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-card/60 p-6 shadow-soft sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Don't see a matching role?</h3>
            <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
              We're always glad to hear from people who care about our mission.
              Send us a general application and CV.
            </p>
          </div>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <a href={applyMailto("General Application")}>
              <Mail className="h-4 w-4" /> Send general application
            </a>
          </Button>
        </motion.div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer className="border-t border-border bg-card/60">
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
              <li><Link className="hover:text-primary" to="/#features">Features</Link></li>
              <li><Link className="hover:text-primary" to="/#benefits">Benefits</Link></li>
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
              <li>{CAREERS_EMAIL}</li>
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
    </div>
  );
}

export default CareersPage;
