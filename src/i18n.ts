import { en } from "./locales/en_translation";
import { uk } from "./locales/uk_translation";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en,
    uk,
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
