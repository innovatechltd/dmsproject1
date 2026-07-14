import { useEffect, useState } from "react";
import { useTheme } from "@/utils/theme";

/**
 * Reads the app's CSS design tokens (--chart-1..5, --foreground, --border, ...)
 * from the document root so Recharts renders in real theme colors and updates
 * automatically when the user toggles light/dark.
 */
function readTokens() {
  if (typeof window === "undefined") return {};
  const s = getComputedStyle(document.documentElement);
  const v = (name, fallback) => {
    const val = s.getPropertyValue(name).trim();
    return val || fallback;
  };
  return {
    chart1: v("--chart-1", "#F58220"),
    chart2: v("--chart-2", "#2563EB"),
    chart3: v("--chart-3", "#16A34A"),
    chart4: v("--chart-4", "#FFC56B"),
    chart5: v("--chart-5", "#DC2626"),
    primary: v("--primary", "#F58220"),
    foreground: v("--foreground", "#1F2937"),
    muted: v("--muted-foreground", "#6B7280"),
    border: v("--border", "#E5E7EB"),
    card: v("--card", "#FFFFFF"),
  };
}

export function useChartTheme() {
  const { theme } = useTheme();
  const [tokens, setTokens] = useState(readTokens);

  useEffect(() => {
    // Re-read after the .dark class has been applied for this theme.
    setTokens(readTokens());
  }, [theme]);

  return tokens;
}
