import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { LANGUAGES, useLanguage } from "@/utils/lang";
import { cn } from "@/utils/utils";





export function LanguageSwitcher({ compact = false }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const active = LANGUAGES.find((l) => l.code === lang);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-accent/30",
          compact && "px-2 py-1"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}>
        
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="hidden sm:inline">{active.flag}</span>
        <span className="hidden md:inline">{active.label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )} />
        
      </button>

      <AnimatePresence>
        {open &&
        <motion.ul
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-elevated">
          
            {LANGUAGES.map((l) => {
            const isActive = l.code === lang;
            return (
              <li key={l.code}>
                  <button
                  type="button"
                  onClick={() => {
                    if (!l.available) {
                      toast.info(`${l.label} — Coming soon`, {
                        description: "French translations are on the way."
                      });
                      return;
                    }
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                    l.available ? "hover:bg-accent/40" : "cursor-not-allowed opacity-70",
                    isActive && "bg-accent/30"
                  )}>
                  
                    <span className="text-base">{l.flag}</span>
                    <span className="flex-1 text-left font-medium text-foreground">
                      {l.label}
                    </span>
                    {!l.available &&
                  <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warning">
                        Coming soon
                      </span>
                  }
                    {isActive && <Check className="h-4 w-4 text-primary" />}
                  </button>
                </li>);

          })}
          </motion.ul>
        }
      </AnimatePresence>
    </div>);

}