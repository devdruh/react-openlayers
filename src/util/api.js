import { dateOptions, layerSourceInfo } from "./variables";

const currDate = new Date();
const myLocalDate = currDate.toLocaleDateString(navigator.local, dateOptions);

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


const getClosestAqhi = async (layer, coordinate) => {
    
    const aqhiClosestLocation = layer.getClosestFeatureToCoordinate(coordinate);
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
        
    }
}

export {
    getAirQualityHealthIndex,
    getAirQualityHealthIndexByGeometry,
    getClosestAqhi,
    getClosestAqhiToday,
    getAirSurfaceTemp,
    getClosestAqhiNow
}