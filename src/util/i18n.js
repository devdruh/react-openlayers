import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en','fr'],
        fallbackLng: 'en',
        detection: {
            order: ['cookie', 'path', 'htmlTag', 'localStorage', 'subdomain'],
            caches: ['cookie'],
        },
        defaultNS: ['translation'],
        // interpolation: {
        //     escapeValue: false, 
        // },
        keySeparator: true
    });

export default i18n;