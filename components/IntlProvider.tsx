"use client";

import * as React from "react";
import type { AppLocale } from "@/lib/cities";
import enMessages from "@/messages/en.json";
import koMessages from "@/messages/ko.json";

type Messages = typeof enMessages;
type MessageKey = keyof Messages;

type LocaleSettingsContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  t: (key: MessageKey) => string;
};

const STORAGE_KEY = "weather-dashboard-locale";

const messages: Record<AppLocale, Messages> = {
  ko: koMessages,
  en: enMessages,
};

const LocaleSettingsContext = React.createContext<LocaleSettingsContextValue | null>(null);

export function useLocaleSettings() {
  const context = React.useContext(LocaleSettingsContext);

  if (!context) {
    throw new Error("useLocaleSettings must be used within IntlProvider");
  }

  return context;
}

export function useLocale() {
  return useLocaleSettings().locale;
}

export function useTranslations() {
  return useLocaleSettings().t;
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

  const t = React.useCallback(
    (key: MessageKey) => {
      return messages[locale][key];
    },
    [locale]
  );

  const value = React.useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t]
  );

  return <LocaleSettingsContext.Provider value={value}>{children}</LocaleSettingsContext.Provider>;
}
