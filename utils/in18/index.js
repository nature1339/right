import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ko from "./locales/ko/translation.json";
import en from "./locales/en/translation.json";

const isClient = typeof window !== "undefined";

const resources = {
  ko: {
    translation: ko,
  },
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: isClient ? localStorage.getItem("i18nextLng") || "ko" : "ko",
  fallbackLng: "ko",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
