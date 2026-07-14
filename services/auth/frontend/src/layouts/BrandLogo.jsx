import { Link } from "react-router-dom";
import { cn } from "@/utils/utils";
import logoMark from "@/assets/inades-logo.svg";

/**
 * BrandLogo
 *
 * Renders the INADES-Formation mark. To use your own logo file, replace
 * src/assets/inades-logo.svg (or add src/assets/inades-logo.png and update
 * the import above) — everywhere this component is used will update.
 *
 * @param tagline  Show the "Servir le bien commun" strap line under the name
 *                 (used on the auth panel where there's more room).
 */
export function BrandLogo({ compact = false, to = "/", className, tagline = false }) {
  return (
    <Link
      to={to}
      className={cn("group flex items-center gap-3", className)}
      aria-label="DMS — INADES-Formation Rwanda"
    >
      <img
        src={logoMark}
        alt="INADES-Formation"
        className="h-10 w-10 shrink-0 rounded-xl shadow-sm"
      />
      {!compact && (
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-[15px] font-bold text-foreground">
            DMS <span className="font-medium text-muted-foreground">· INADES-Formation</span>
          </span>
          {tagline ? (
            <span className="truncate text-xs italic text-muted-foreground">
              Servir le bien commun · Serving common good
            </span>
          ) : (
            <span className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              INADES · Rwanda
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
