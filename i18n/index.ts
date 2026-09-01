import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import tr from "../locales/tr.json";
import en from "../locales/en.json";

const resources = {
    tr: { translation: tr },
    en: { translation: en },
};

const deviceLanguage = getLocales()[0]?.languageCode ?? "en";

i18n.use(initReactI18next).init({
    resources,
    compatibilityJSON: "v4",
    lng: deviceLanguage,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
});

export default i18n;
