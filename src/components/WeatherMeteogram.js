import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { useCallback } from 'react';
import { weatherForecastChartOptions } from '../util/variables';
import { useTranslation } from "react-i18next";
import WeatherForecastWeek from './WeatherForecastWeek';

const WeatherMeteogram = ({ cityWeather }) => {

    const [chartOptions, setChartOptions] = useState(weatherForecastChartOptions);
    const [isLoading, setIsLoading] = useState(true);
    const { t, i18n } = useTranslation();
    const [weekForecast, setWeekForecast] = useState({});

    const language = i18n.language;
    var currentCondition, sunriseSunset;

    if (language === 'en') {
        currentCondition = cityWeather[0]?.siteData?.currentConditions;
        sunriseSunset = cityWeather[0]?.siteData?.riseSet;
    } else if (language === 'fr') {
        currentCondition = cityWeather[1]?.siteData?.currentConditions;
        sunriseSunset = cityWeather[1]?.siteData?.riseSet;
    }
    
    const initHighCharts = useCallback(async () => {

        if (Array.isArray(cityWeather) && cityWeather.length > 0) {

            var forecastLocation, dateForecast, hourlyForecast;

            const forecastTitle = t('common:forecastFor');
            const forecastSubTitle = t('common:forecastAsOf');
            const langTemperature = t('common:temperature');

            if (language === 'en') {
                forecastLocation = cityWeather[0].siteData.location;
                dateForecast = cityWeather[0].siteData.hourlyForecastGroup.dateTime[1];
                hourlyForecast = cityWeather[0].siteData.hourlyForecastGroup.hourlyForecast;
                setWeekForecast(cityWeather[0].siteData.forecastGroup);
                Highcharts.setOptions({
                    lang: {
                        months: [
                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
                        ],
                        weekdays: [
                            'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                            'Thursday', 'Friday', 'Saturday'
                        ],
                    }
                });
            } else if (language === 'fr') {
                forecastLocation = cityWeather[1].siteData.location;
                dateForecast = cityWeather[1].siteData.hourlyForecastGroup.dateTime[1];
                hourlyForecast = cityWeather[1].siteData.hourlyForecastGroup.hourlyForecast;
                setWeekForecast(cityWeather[1].siteData.forecastGroup);
                Highcharts.setOptions({
                    lang: {
                        months: [
                            'Jan', 'Fév', 'Mar', 'Avr', 'Peut', 'juin',
                            'Juillet', 'Août', 'septembre', 'Octobre', 'Nov', 'Déc'
                        ],
                        weekdays: [
                            'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
                            'Jeudi', 'Vendredi', 'Samedi'
                        ],
                    }
                });
            }

            setChartOptions(data => {
                return {
                    ...data,
                    title: {
                        text: forecastTitle + ' ' + forecastLocation.region + ', ' + forecastLocation.province
                    },
                    subtitle: {
                        text: forecastSubTitle + ' ' + dateForecast.textSummary
                    },
                    series: [{
                        ...data.series[0],
                        name: langTemperature,
                        data: []
                    }]
                }
            });

            const _date = new Date();
            _date.setDate(dateForecast.day);
            _date.setMonth(dateForecast.month - 1);
            _date.setFullYear(dateForecast.year);
            _date.setHours('00');
            _date.setMinutes('00');
            _date.setSeconds('00');
            var pointStart, maxValue = 0;
            
            for (let index = 0; index < hourlyForecast.length; index++) {

                const element = hourlyForecast[index];
                const x = Date.parse(_date),
                to = x + 36e5

                if (to > pointStart + 48 * 36e5) {
                    return;
                }
            
                const x_hrs = Date.parse(_date);

                setChartOptions(data => {

                    return {
                        ...data,
                        series: [{
                            ...data.series[0],
                            data: [
                                ...data.series[0].data,
                                {
                                    x: x_hrs,
                                    y: parseFloat(element.temperature),
                                    to: to,
                                    symbolName: element.condition,
                                    symbolCode: element.iconCode
                                }
                            ]
                        }],
                        yAxis: [
                            {
                                softMax: Math.max(maxValue, element.temperature) + 2
                            }
                        ]
                    }
                });
                
                _date.setHours(_date.getHours() + 1);

                if (index === 0) {
                    pointStart = (x + to) / 2;
                }
                
            }

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);

        }

    }, [cityWeather, language, t]);

    
    useEffect(() => { 
    
        setIsLoading(true);
        initHighCharts();

    }, [initHighCharts]);

    return (
        <div className='flex flex-col'>
            <div>
                <div className='pt-5 w-full'>
                {
                    isLoading ? 
                    <div className='grid sm:grid-cols-2 max-sm:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg shadow animate-pulse md:p-6 dark:border-gray-700'>
                        <div role="status">
                            <div className="flex items-center max-sm:justify-stretch">
                                <div className="max-sm:h-14 max-sm:pt-2 max-sm:mr-2 max-sm:mt-2 sm:h-12 sm:w-24 sm:mr-4 sm:mt-3 md:h-14 md:w-24 w-24 md:mt-3 xl:w-20 bg-gray-300 rounded-full dark:bg-gray-700">
                                    <svg className="max-sm:w-14 max-sm:h-7 max-sm:mt-1 sm:w-6 sm:ml-3 sm:mt-2 md:ml-4 md:mt-3 xl:ml-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                    </svg>
                                </div>
                                <div className='w-full'>
                                    <div className="h-2 w-4/5 bg-gray-200 rounded-full dark:bg-gray-700 mt-2 max-sm:mt-3 sm:mt-4 md:mt-4 lg:mt-2"></div>
                                    <div className="h-2 w-10/12 bg-gray-200 rounded-full dark:bg-gray-700 mt-2"></div>
                                    <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2"></div>
                                    <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2"></div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className="h-2 w-2/3 bg-gray-200 rounded-full dark:bg-gray-700 mt-2 sm:mt-4 sm:mb-5 md:mt-4 md:mb-1 lg:mb-1"></div>
                            </div>
                        </div>
                        <div role="status">
                            <div className="flex justify-end">
                                <div className='w-1/2'>
                                    <div className="h-7 w-3/4 bg-gray-200 rounded-full dark:bg-gray-700 mt-2 md:mt-3 sm:mt-3 lg:mt-2"></div>
                                    <div className="h-2 w-3/4 bg-gray-200 rounded-full dark:bg-gray-700 mt-2"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-2"></div>
                                </div>
                            </div>  
                            <div className='flex justify-end'>
                                <div className="h-2 w-1/2 bg-gray-200 rounded-full dark:bg-gray-700 sm:mt-5 md:mt-4 mt-3"></div>
                            </div>
                        </div>
                    </div>  
                    : 
                    <div className='grid md:grid-cols-2 items-center p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                        <div>
                            <div className='flex sm:flex-row justify-center '>
                                {
                                    currentCondition?.iconCode ? 
                                        <img src={`https://meteo.gc.ca/weathericons/${currentCondition?.iconCode}.gif`} className='h-[51px] translate-y-1' width={60} alt={`${currentCondition?.condition}`} />
                                        : null
                                }
                                <h5 className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-slate-300">{ currentCondition?.temperature ? Math.floor(currentCondition?.temperature) : null }</h5>
                                {/* <p className='pl-2 flex gap-1'><a href='/'>°C</a> | <a href='/' className='text-gray-500'>°F</a></p> */}
                                <p className='pl-2 flex gap-1 text-gray-500 dark:text-gray-400'>°C</p>
                                <div className='text-xs pl-4 whitespace-nowrap'>
                                    <p className='font-normal text-gray-500 dark:text-gray-400'>{t('common:dewPoint')}: { currentCondition?.dewpoint}°C</p> 
                                            <p className='font-normal text-gray-500 dark:text-gray-400'>{ t('common:humidity')}: {currentCondition?.relativeHumidity}%</p> 
                                    {
                                        currentCondition?.wind ?
                                            <p className='font-normal text-gray-500 dark:text-gray-400'>{t('common:wind')}: {
                                                    currentCondition?.wind.direction + ' ' + currentCondition?.wind.speed
                                                }
                                                {
                                                    currentCondition?.wind.gust === '' ? '' : ' gust ' + currentCondition?.wind.gust
                                                } km/h</p>
                                            :
                                            null
                                    }
                                    {
                                        currentCondition?.windChill !== undefined ?  <p className='font-normal text-gray-500 dark:text-gray-400'>{t('common:windChill')}: { currentCondition?.windChill }</p> : null
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='md:text-right text-center'>
                                <h5 className='text-lg text-gray-500 dark:text-gray-400'>{t('common:weather')}</h5>
                                <p className='text-sm font-thin text-gray-500 dark:text-gray-400'>{ new Date(currentCondition?.dateTime[1].year, currentCondition?.dateTime[1].month - 1, currentCondition?.dateTime[1].day, currentCondition?.dateTime[1].hour, currentCondition?.dateTime[1].minute).toLocaleDateString(i18n.language === 'fr' ? 'fr-CA' : undefined, { weekday: 'short', hour: 'numeric', minute: 'numeric', timeZoneName:'short'}) }</p>
                                <p className='text-sm font-thin text-gray-500 dark:text-gray-400'>{ currentCondition?.condition }</p>
                            </div>
                        </div>
                        <div className='col-span-2 columns-2 align-middle'>
                            <div className='pt-2'><p className='flex flex-nowrap text-xs font-normal text-gray-400 dark:text-gray-400'>{t('common:observedAt')}: {currentCondition?.station}</p></div>
                                    
                            <div className='pt-2 text-right'><p className='flex justify-end text-xs font-normal text-gray-400 dark:text-gray-400'>
                                <svg className="w-5 h-5 text-slate-700 hover:text-slate-800 dark:text-slate-300" aria-hidden="true" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 100 100">
                                    <path d="M415 910c-62-63-77-82-67-92s25 0 72 47l59 59 3-170c3-142 5-169 18-169s15 27 18 169l3 170 59-59c47-47 62-57 72-47s-5 29-67 92c-44 44-82 80-85 80s-41-36-85-80zM484 427c-3-8-4-43-2-78 2-49 7-64 18-64 12 0 15 15 15 74 0 51-4 76-12 78-7 3-15-2-19-10zM200 307c0-16 91-107 108-107 24 0 11 27-36 73-48 47-72 58-72 34zM727 272c-47-48-58-72-34-72 16 0 107 91 107 108 0 24-27 11-73-36zM412 194c-56-28-88-65-103-119l-10-34-147-3C29 35 5 33 5 20S67 5 500 5s495 2 495 15-24 15-147 18l-147 3-12 37c-19 58-45 88-101 116-66 33-110 33-176 0zm176-41c31-23 58-60 67-90l6-23H500c-144 0-161 2-156 16 3 9 6 19 6 24 0 17 55 73 85 86 40 19 120 12 153-13z"
                                    transform="matrix(.1 0 0 -.1 0 100)"></path>
                                </svg>
                                    {new Date(sunriseSunset?.dateTime[1].year, sunriseSunset?.dateTime[1].month - 1, sunriseSunset?.dateTime[1].day, sunriseSunset?.dateTime[1].hour, sunriseSunset?.dateTime[1].minute).toLocaleTimeString(i18n.language === 'fr' ? 'fr-CA' : undefined, { hour: 'numeric', minute: 'numeric', hour12: false, timeZoneName: 'short' })} 
                                <svg className="w-5 h-5 text-slate-700 hover:text-slate-800 dark:text-slate-300" aria-hidden="true" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 100 100">
                                    <path
                                        d="M487 994c-4-4-7-82-7-173V656l-60 59c-47 47-62 57-72 47s5-30 70-95l82-82 82 82c65 65 80 85 70 95s-25 0-72-47l-59-59-3 169c-3 158-9 191-31 169zM484 427c-3-8-4-43-2-78 2-49 7-64 18-64 12 0 15 15 15 74 0 51-4 76-12 78-7 3-15-2-19-10zM200 307c0-16 91-107 108-107 24 0 11 27-36 73-48 47-72 58-72 34zM727 272c-47-48-58-72-34-72 16 0 107 91 107 108 0 24-27 11-73-36zM412 194c-56-28-88-65-103-119l-10-34-147-3C29 35 5 33 5 20S67 5 500 5s495 2 495 15-24 15-147 18l-147 3-12 37c-19 58-45 88-101 116-66 33-110 33-176 0zm176-41c31-23 58-60 67-90l6-23H500c-144 0-161 2-156 16 3 9 6 19 6 24 0 17 55 73 85 86 40 19 120 12 153-13z"
                                        transform="matrix(.1 0 0 -.1 0 100)"
                                    ></path>
                                </svg> 
                                    {new Date(sunriseSunset?.dateTime[3].year, sunriseSunset?.dateTime[3].month - 1, sunriseSunset?.dateTime[3].day, sunriseSunset?.dateTime[3].hour, sunriseSunset?.dateTime[3].minute).toLocaleTimeString(i18n.language === 'fr' ? 'fr-CA' : undefined, { hour: 'numeric', minute: 'numeric', hour12: false, timeZoneName: 'short' })}
                            </p></div>
                        </div>
                    </div>
                }
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                </div>
            </div>
            <div>
                <WeatherForecastWeek forecast={weekForecast} />
            </div>
        </div>
    )
}

export default WeatherMeteogram