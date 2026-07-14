import { createContext, useContext, useEffect, useState } from "react";

const KEY = "dms.theme";

const Ctx = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem(KEY) || null;
    setTheme(saved ?? "light");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");else
    root.classList.remove("dark");
    try {localStorage.setItem(KEY, theme);} catch {}
  }, [theme]);

  return (
    <Ctx.Provider value={{ theme, setTheme, toggle: () => setTheme((t) => t === "dark" ? "light" : "dark") }}>
      {children}
    </Ctx.Provider>);

}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}