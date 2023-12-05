import { xml2json } from "./utilities";
import { dateOptions, layerSourceInfo } from "./variables";

const currDate = new Date();
const myLocalDate = currDate.toLocaleDateString(navigator.local, dateOptions);
// const proxy_url = 'https://api.allorigins.win/raw?url=';
const proxy_url = 'https://corsproxy.io/?';

const getAirQualityHealthIndex = async (locId) => {

    try {
        const paramsObj = { location_id: locId };
        const searchParams = new URLSearchParams(paramsObj);
        const searchToString = searchParams.toString();
        const url = new URL(layerSourceInfo[2].url+'&'+searchToString);
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const result = await response.json();
        
        return result;

    } catch (error) {
        console.log(error);
    }
}

const getAirQualityHealthIndexByGeometry = async (locGeo) => {

    try {
        const paramsObj = { geometry: locGeo };
        const searchParams = new URLSearchParams(paramsObj);
        const searchToString = searchParams.toString();
        const url = new URL(layerSourceInfo[2].url + '&' + searchToString);
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const result = await response.json();
        
        return result;

    } catch (error) {
        console.log(error);
    }
}


const getClosestAqhi = async (layer, coordinate) => {
    
    const aqhiClosestLocation = layer.getClosestFeatureToCoordinate(coordinate);

    if (aqhiClosestLocation === null) {
        return null
    }
    const aqhiLocationId = aqhiClosestLocation.values_.location_id;
    const result = await getAirQualityHealthIndex(aqhiLocationId);

    return result;
}


const getClosestAqhiToday = async (items) => {

    const result = items.features.filter((item) => {
        const featureDate = new Date(item.properties.forecast_datetime);
        return featureDate.getDate() === new Date(myLocalDate).getDate();
    });

    return result;
}

const getClosestAqhiNow = async (items) => {

    const result = items.find((item) => {
        const featureDate = new Date(item.properties.forecast_datetime);
        return featureDate.getHours() === new Date(myLocalDate).getHours();
    });

    return result;
}

const getAirSurfaceTemp = async (url) => { 

    try {
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const result = await response.json();
        return result;

    } catch (error) {
        console.log(error);
    }
}

const getWeatherAlerts = async (url) => {

    try {
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const result = await response.json();
        return result;

    } catch (error) {
        console.log(error);
    }
}

const getWeatherClimateHourly = async (province, station) => {

    var hasItems = true;
    var newDate = new Date(myLocalDate).getDate();
    var ctr = 1;

    while (hasItems) {
        
        const url = new URL(layerSourceInfo[3].url);
        const searchParams = new URLSearchParams(url.search);
        searchParams.set("f","json")
        searchParams.set("UTC_YEAR", new Date(myLocalDate).getFullYear());
        searchParams.set("UTC_MONTH", currDate.getMonth() + 1);
        searchParams.set("UTC_DAY", newDate);
        searchParams.set("PROVINCE_CODE", province);
    
        if (station !== undefined) {
            searchParams.set("STATION_NAME", station);
        }

        try {

            const urlToString = searchParams.toString();
            console.log(url.href + '?' + urlToString, "<<< url");
            const response = await fetch(url.href + '?' + urlToString);

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = response.json();
            const items = await result;
            if (items.features !== undefined) {
                if (items.features.length > 0) {
                    hasItems = false;
                    return items
                } else {
                    newDate = new Date(myLocalDate).getDate() - ctr;
                    hasItems = true;
                    ctr += 1;
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    }

}

const getProvincesName = async () => {

    try {
        const response = await fetch('https://geogratis.gc.ca/services/geoname/en/codes/province.json');

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const result = response.json();

        return result;

    } catch (error) {
        console.log(error);
    }

}

const getProvinceCitiesByProvCode = async (code) => { 

    try {
        // const response = await fetch(proxy_url + 'https://collaboration.cmc.ec.gc.ca/cmc/cmos/public_doc/msc-data/citypage-weather/site_list_en.geojson')
        const response = await fetch(proxy_url + encodeURIComponent('https://collaboration.cmc.ec.gc.ca/cmc/cmos/public_doc/msc-data/citypage-weather/site_list_en.geojson'));
        
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const result = await response.json();
        const filtered = result.features.filter((item) => item.properties["Province Codes"] === code);

        return filtered;

    } catch (error) {
        console.log(error);
    }

}

const getCityWeatherByCode = async (province, code, lang) => {

    var language = 'e';
    if (lang === 'fr') {
        language = 'f';
    }

    try {
        const response = await fetch(proxy_url + 'https://dd.weather.gc.ca/citypage_weather/xml/' + province + '/' + code + '_'+language+'.xml');

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const toText = await response.text();
        const parseText = new DOMParser().parseFromString(toText,'text/xml');
        const result = xml2json(parseText);

        return result;
    } catch (error) {
        console.log(error);
    }

}

export {
    getAirQualityHealthIndex,
    getAirQualityHealthIndexByGeometry,
    getClosestAqhi,
    getClosestAqhiToday,
    getAirSurfaceTemp,
    getClosestAqhiNow,
    getWeatherClimateHourly,
    getProvincesName,
    getProvinceCitiesByProvCode,
    getCityWeatherByCode,
    getWeatherAlerts
}