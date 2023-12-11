import React, { useEffect, useCallback, useState } from 'react';
import WeatherMeteogram from './WeatherMeteogram';
import { getProvincesName, getProvinceCitiesByProvCode, getCityWeatherByCode } from '../util/api';
import "flowbite";

const DisplayAlert = () => {
    return (
        <>
            <div id="advisory-alert" className="p-4 mb-10 border border-sky-300 rounded-lg bg-slate-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 mr-2 fill-sky-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium">Weather Advisory</h3>
                </div>
                <div className="mt-2 mb-4 text-sm">
                   <p>More info about this advisory goes here.</p>
                </div>
                <div className="flex">
                    <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="-ml-0.5 mr-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                    </svg>
                    View more
                    </button>
                    <button type="button" className="text-sky-800 bg-transparent border border-sky-700 from-orange-400 to-pink-500 hover:border-yellow-500 hover:bg-gradient-to-bl hover:text-white focus:ring-3 focus:outline-none focus:ring-orange-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" data-dismiss-target="#advisory-alert" aria-label="Close">
                    Dismiss
                    </button>
                </div>
            </div>
        </>
    )
}

const defaultCityName = "Toronto";
const defaultProvinceCode = "ON";
const defaultCityCode = "s0000458";

const DisplayForecastChart = () => {

    const [provinces, setProvinces] = useState([]);
    const [provinceName, setProvinceName] = useState({ code: 35, term: defaultProvinceCode, description: 'Ontario' });
    const [citiesName, setCitiesName] = useState([]);
    const [cityCode, setCityCode] = useState(defaultCityCode);
    const [cityWeather, setCityWeather] = useState({});

    const [stationName, setStationName] = useState(defaultCityName);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isSelectProvince, setIsSelectProvince] = useState(false);
    const [isSelectStation, setIsSelectStation] = useState(false);
    const [isDisSearchBtn, setIsDisSearchBtn] = useState(true);

    const findProvinces = useCallback(async () => {

        getProvincesName().then((response) => {

            const sortProvinces = response.definitions.sort((a, b) => {
                const nameA = a.description.toUpperCase(); // ignore upper and lowercase
                const nameB = b.description.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            
            const filteredProvinces = sortProvinces.filter(function (prov) {
                return prov.term !== 'IW' && prov.term !== 'UF';
            });

            setProvinces(filteredProvinces);
        });

    }, []);

    const findProvinceCities = useCallback(async (province) => {

        getProvinceCitiesByProvCode(province).then((response) => {
            // start loading 
            if (response) {
                // end loading
                setCitiesName(response);
            }
        });

    }, []);

    const initClimateWeather = useCallback(async (province, code) => {

        findProvinces();
        findProvinceCities(province);

        getCityWeatherByCode(province, code).then((response) => {
            setCityWeather(response);
        });

    }, [findProvinceCities, findProvinces]);
    
    const cityWeatherClimate = useCallback(async (province, code) => {
        
        getCityWeatherByCode(province, code).then((response) => {
            // console.log(response, "<<<<< set data cityWeatherClimate");
            setCityWeather(response);
        });

    }, []);


    const handleSearchProvince = (e) => {
        
        setIsSelectStation(true);
        setIsSelectProvince(!isSelectProvince)
    }

    const handleSelectProvince = (e) => {
        setIsSelectProvince(!isSelectProvince);
        setProvinceName((data) => {
            return {
                ...data,
                code: e.target.key,
                description: e.target.innerHTML,
                term: e.target.id
            }
        });

        setStationName('');

        findProvinceCities(e.target.id);
        
    }

    const handleSearchStation = (e) => {
        clearTimeout(searchTimeout);
        setStationName(e.target.value);
        setIsDisSearchBtn(true);
        setIsSelectProvince(false);

        
        if (e.target.value === '') {
            setIsSelectStation(true);
            setIsDisSearchBtn(true);
        }

        setSearchTimeout(
            setTimeout(() => {

                if (e.target.value.length === 1) {
                    console.log("set error")
                    setIsSelectStation(true);
                    setIsDisSearchBtn(true);
                } else if (e.target.value.length >= 2) { 

                    const findCities = citiesName.filter((item) => item.properties['English Names'].toLowerCase().includes(e.target.value.toLowerCase()));                    
                    setSearchResults(findCities);
                    setIsSelectStation(false);
                }
                
            }, 1000)
        )
    }

    const handleSelectCity = (e) => {
        setCityCode(e.target.id);
        setStationName(e.target.innerHTML);
        setIsSelectStation(true);
        setIsDisSearchBtn(false);
    }

    const handleSearchBtn = useCallback(async () => {

        cityWeatherClimate(provinceName.term, cityCode);

    }, [cityCode, provinceName, cityWeatherClimate]);
    
    useEffect(() => {
        
        initClimateWeather(defaultProvinceCode, defaultCityCode);

    }, [initClimateWeather]);
    
    return (
        <div className='flex flex-col'>
            <DisplayAlert />
            <div className="flex self-center">
                <button id="dropdown-button-2"  className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button" onClick={handleSearchProvince} title={provinceName.description}>
                    
                    {provinceName.term} <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                <div id="dropdown-search-city" className={`absolute order-1 z-10 translate-y-12 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 ${isSelectProvince ? '': 'hidden'}`}>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button-2">
                        {
                            provinces.length > 0 ? 
                                provinces.map((item) => {
                                    return (
                                        <li key={item.code}>
                                            <button type="button" id={item.term} className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" onClick={handleSelectProvince}>
                                                       
                                                {item.description}
                                                
                                            </button>
                                        </li>
                                    )
                                })
                                : null
                        }
                    </ul>
                </div>
                <div className="relative max-sm:w-60 sm:w-60 max-md:w-80 lg:w-96">
                    <input type="search" id="location-search" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-sky-500" placeholder="Search for city | address | station" required value={stationName} onChange={handleSearchStation}/>
                    
                    <div id='list-station-result' className={`z-10 w-full absolute translate-y-1 bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 ${!isSelectStation ? '' : 'hidden'}`}>
                        <ul className="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button-2">
                        {
                            searchResults.length > 0 ? 
                                searchResults.map((item, i) => {
                                    return (
                                        <li key={i} className='border-b last:border-b-0'>
                                            <button type="button" id={item.properties.Codes} className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" onClick={handleSelectCity}>
                                                {item.properties["English Names"]}
                                            </button>
                                        </li>
                                    )
                                })
                                : null
                        }
                        </ul>
                    </div>
                    <button type="submit" className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium disabled:bg-slate-500 text-white enabled:bg-gradient-to-br enabled:from-green-400 enabled:to-blue-600 hover:bg-gradient-to-bl hover:bg-sky-800 rounded-e-lg focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 focus:ease-in focus:duration-300 focus:scale-110 focus:transition" disabled={isDisSearchBtn} onClick={handleSearchBtn}>
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
            <WeatherMeteogram cityWeather={cityWeather} />
        </div>
    )
}

export default DisplayForecastChart;