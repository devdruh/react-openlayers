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
        interpolation: {
            escapeValue: false, 
        },
        keySeparator: true
    });

i18n.addResourceBundle('en', 'common', {

    "effective": "Effective",
    "expires": "Expires",
    "forecastAQHI": "Forecast AQHI",
    "forecastDateTime": "Forecast DateTime",
    "forecastClosestLoc": "Closest Forecast Location",
    "airSurfaceTemperature": "Air Surface Temperature",
    "lonlat": "Lon/Lat",
    "AQHI": "AQHI",
    "humidity": "Humidity",
    "dewPoint": "Dew Point",
    "wind": "Wind",
    "windChill": "Wind Chill",
    "observedAt": "Observed at",
    "weather": "Weather",
    "forecastFor": "Forecast for",
    "forecastAsOf": "As of",
    "temperature": "Temperature",

}, true, true);

i18n.addResourceBundle('fr', 'common', {
    
    "effective": "Efficace",
    "expires": "Expire",
    "forecastAQHI": "Prévisions CAS",
    "forecastDateTime": "DateHeure de la prévision",
    "forecastClosestLoc": "Emplacement de prévision le plus proche",
    "airSurfaceTemperature": "Température de la surface de l'air",
    "lonlat": "Longeur/Latitude",
    "AQHI": "CAS",
    "humidity": "Humidité",
    "dewPoint": "Point de rosée",
    "wind": "Vent",
    "windChill": "Refroidissement éolien",
    "observedAt": "Observé à",
    "weather": "Météo",
    "forecastFor": "Prévisions pour",
    "forecastAsOf": "Au",
    "temperature": "Température",

}, true, true);

export default i18n;