import { createContext, useContext, useEffect, useState } from "react";


const KEY = "dms.lang";








export const LANGUAGES = [
{ code: "en", label: "English", flag: "🇬🇧", available: true },
{ code: "fr", label: "Français", flag: "🇫🇷", available: false }];


const dictionary = {
  en: {
    "nav.signin": "Sign in",
    "nav.features": "Features",
    "nav.about": "About",
    "nav.benefits": "Benefits",
    "nav.contact": "Contact",
    "auth.signin": "Sign in to DMS",
    "auth.subtitle": "Use your INADES-Formation Rwanda account to continue.",
    "footer.developed": "Developed by"
  },
  fr: {
    "nav.signin": "Connexion",
    "nav.features": "Fonctionnalités",
    "nav.about": "À propos",
    "nav.benefits": "Avantages",
    "nav.contact": "Contact",
    "auth.signin": "Connexion à DMS",
    "auth.subtitle": "Utilisez votre compte INADES-Formation Rwanda pour continuer.",
    "footer.developed": "Développé par"
  }
};







const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "en" || saved === "fr") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (code) => {
    const option = LANGUAGES.find((l) => l.code === code);
    if (!option?.available) return;
    setLangState(code);
    try {localStorage.setItem(KEY, code);} catch {}
    if (typeof document !== "undefined") document.documentElement.lang = code;
  };

  const t = (key, fallback) =>
  dictionary[lang]?.[key] ?? dictionary.en[key] ?? fallback ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>);

}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}