import loginArt from "@/assets/auth/login.svg";
import { BrandLogo } from "@/layouts/BrandLogo";
import { LanguageSwitcher } from "@/layouts/LanguageSwitcher";
import { useTheme } from "@/utils/theme";
import { motion } from "framer-motion";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * AuthShell
 *
 * @param image    URL/import of the illustration for the left panel.
 *                 To use your own picture, drop a file in src/assets/auth/
 *                 (e.g. login.png) and import it in the page, then pass it here.
 * @param caption  Short, plain-English headline above the illustration.
 * @param blurb    One supporting sentence under the caption.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  showBack,
  backTo = "/login",
  backLabel = "Back to sign in",
  image = loginArt,
  caption = "Welcome back to DMS",
  blurb = "Manage HR, finance, and daily operations from one secure workspace.",
}) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="grid flex-1 lg:grid-cols-2">
        {/* Left panel — same page background, separated by a thin divider */}
        <div className="relative hidden flex-col px-12 py-10 lg:flex lg:border-r lg:border-border">
          <BrandLogo />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-10 max-w-sm text-center"
          >
            <h2 className="text-2xl font-bold leading-tight text-foreground">
              {caption}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {blurb}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-8 flex flex-1 items-center justify-center"
          >
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft">
              <img src={image} alt="Security illustration" className="mx-auto w-full max-w-sm" />
            </div>
          </motion.div>
        </div>

        {/* Right form panel */}
        <div className="flex flex-col bg-background">
          <div className="flex items-center justify-between p-4 sm:p-6 lg:justify-end">
            <div className="lg:hidden">
              <BrandLogo compact />
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <LanguageSwitcher compact />
              <button
                type="button"
                onClick={toggle}
                aria-label="Toggle dark mode"
                className="inline-flex rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
              >
                {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-4 pb-10 sm:px-6 sm:pb-12 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              {showBack && (
                <Link
                  to={backTo}
                  className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:mb-6"
                >
                  <ArrowLeft className="h-4 w-4" /> {backLabel}
                </Link>
              )}

              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
              )}
              <div className="mt-6 sm:mt-8">{children}</div>
              {footer && (
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <footer className="px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row sm:gap-3">
          <span className="text-center">© {new Date().getFullYear()} INADES-Formation Rwanda</span>
          <div className="flex items-center gap-4 sm:gap-5">
            <Link to="/support/help" className="font-medium hover:text-primary hover:underline">
              Help Center
            </Link>
            <Link to="/support/contact" className="font-medium hover:text-primary hover:underline">
              Contact support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
