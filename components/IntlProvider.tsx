"use client";

import * as React from "react";
import { NextIntlClientProvider } from "next-intl";
import type { AppLocale } from "@/lib/cities";
import enMessages from "@/messages/en.json";
import koMessages from "@/messages/ko.json";

type LocaleSettingsContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
};

const STORAGE_KEY = "weather-dashboard-locale";

const messages = {
  ko: koMessages,
  en: enMessages,
} as const;

const LocaleSettingsContext = React.createContext<LocaleSettingsContextValue | null>(null);

export function useLocaleSettings() {
  const context = React.useContext(LocaleSettingsContext);

  if (!context) {
    throw new Error("useLocaleSettings must be used within IntlProvider");
  }

  return context;
}

export default function IntlProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<AppLocale>("ko");

  React.useEffect(() => {
    const savedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (savedLocale === "ko" || savedLocale === "en") {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = React.useCallback((nextLocale: AppLocale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = React.useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale, setLocale]
  );

  return (
    <LocaleSettingsContext.Provider value={value}>
      <NextIntlClientProvider locale={locale} messages={messages[locale]}>
        {children}
      </NextIntlClientProvider>
    </LocaleSettingsContext.Provider>
  );
}
