import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";














export function PageHeader({ title, description, breadcrumbs = [], actions }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mb-6">
      
      <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/dashboard" className="flex items-center gap-1 hover:text-primary">
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        {breadcrumbs.map((c, i) =>
        <span key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" />
            {c.to ?
          <Link to={c.to} className="hover:text-primary">
                {c.label}
              </Link> :

          <span className="font-medium text-foreground">{c.label}</span>
          }
          </span>
        )}
      </nav>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {description &&
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>
          }
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </motion.div>);

}