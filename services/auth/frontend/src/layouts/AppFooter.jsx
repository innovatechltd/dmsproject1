import { Link } from "react-router-dom";
import logoFull from "@/assets/inades-logo-full.png";

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-card px-5 py-4">
      <div className="flex flex-col items-start justify-between gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <img src={logoFull} alt="INADES-Formation" className="h-6 w-6 shrink-0 rounded-md" />
          <span className="font-semibold text-foreground">DMS · INADES-Formation Rwanda</span>
          <span className="hidden h-3 w-px bg-border sm:inline-block" />
          <span>v1.0.0</span>
          <span className="hidden h-3 w-px bg-border sm:inline-block" />
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <FooterLink to="/support/help">Support</FooterLink>
            <FooterLink to="/support/docs">Docs</FooterLink>
          </nav>
          <span className="hidden h-3 w-px bg-border sm:inline-block" />
          <span>
            Developed by{" "}
            <a
              href="https://www.futureinnovatech.rw/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary hover:underline">
              
              FUTURE INNOVATECH LTD
            </a>
          </span>
        </div>
      </div>
    </footer>);

}

function FooterLink({ to, children }) {
  return (
    <Link to={to} className="hover:text-primary hover:underline">
      {children}
    </Link>);

}