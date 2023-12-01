import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { useCallback } from 'react';
import { weatherForecastChartOptions } from '../util/variables';

const WeatherMeteogram = ({ cityWeather }) => {

    const [chartOptions, setChartOptions] = useState(weatherForecastChartOptions);
    const [isLoading, setIsLoading] = useState(true);
    const currentCondition = cityWeather?.siteData?.currentConditions;
    const sunriseSunset = cityWeather?.siteData?.riseSet;

    const initHighCharts = useCallback(async () => {

        if (cityWeather.hasOwnProperty('siteData')) {

            const forecastLocation = cityWeather.siteData.location;
            const dateForecast = cityWeather.siteData.hourlyForecastGroup.dateTime[1];
            const hourlyForecast = cityWeather.siteData.hourlyForecastGroup.hourlyForecast;

            setChartOptions(data => {
                return {
                    ...data,
                    title: {
                        text: 'Forecast for ' + forecastLocation.region + ', ' + forecastLocation.province
                    },
                    subtitle: {
                        text: 'As of '+dateForecast.textSummary
                    },
                    series: [{
                        ...data.series[0],
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

    }, [cityWeather]);

    
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
                                <div className="h-[60px] max-sm:h-12 max-sm:w-14 max-sm:pl-0 max-sm:mt-4 sm:w-[75px] sm:mt-3 pl-2 pt-2 mr-2 mb-3 bg-gray-300 rounded-full dark:bg-gray-700">
                                    <svg className="w-10 h-10 max-sm:w-12 max-sm:h-8 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                    </svg>
                                </div>
                                <div className='w-full'>
                                    <div className="h-2 w-32 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
                                    <div className="h-2 w-60 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
                                    <div className="h-2 w-40 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
                                    <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className="h-2 w-2/3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                        </div>
                        <div role="status">
                            <div className="flex justify-end">
                                <div className='w-3/4'>
                                    <div className="h-7 w-1/2 bg-gray-200 rounded-full dark:bg-gray-700 mb-1"></div>
                                    <div className="h-2 w-48 bg-gray-200 rounded-full dark:bg-gray-700  mb-1"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-1"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
                                    
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-1"></div>
                                </div>
                                
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
                                <h5 className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">{ currentCondition?.temperature ? Math.floor(currentCondition?.temperature) : null }</h5>
                                {/* <p className='pl-2 flex gap-1'><a href='/'>°C</a> | <a href='/' className='text-gray-500'>°F</a></p> */}
                                <p className='pl-2 flex gap-1'>°C</p>
                                <div className='text-xs pl-4 whitespace-nowrap'>
                                    <p className='font-normal text-gray-500 dark:text-gray-400'>Dew point: { currentCondition?.dewpoint}°C</p> 
                                    <p className='font-normal text-gray-500 dark:text-gray-400'>Humidity: {currentCondition?.relativeHumidity}%</p> 
                                    {
                                        currentCondition?.wind ?
                                            <p className='font-normal text-gray-500 dark:text-gray-400'>Wind: {
                                                    currentCondition?.wind.direction + ' ' + currentCondition?.wind.speed
                                                }
                                                {
                                                    currentCondition?.wind.gust === '' ? '' : ' gust ' + currentCondition?.wind.gust
                                                } km/h</p>
                                            :
                                            null
                                    }
                                    {
                                        currentCondition?.windChill !== undefined ?  <p className='font-normal text-gray-500 dark:text-gray-400'>Wind Chill: { currentCondition?.windChill }</p> : null
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='md:text-right text-center'>
                                <h5 className='text-lg'>Weather</h5>
                                <p className='text-sm font-thin text-gray-500 dark:text-gray-400'>{ new Date(currentCondition?.dateTime[1].year, currentCondition?.dateTime[1].month - 1, currentCondition?.dateTime[1].day, currentCondition?.dateTime[1].hour, currentCondition?.dateTime[1].minute).toLocaleDateString(undefined, { weekday: 'short', hour: 'numeric', minute: 'numeric', timeZoneName:'short'}) }</p>
                                <p className='text-sm font-thin text-gray-500 dark:text-gray-400'>{ currentCondition?.condition }</p>
                            </div>
                        </div>
                        <div className='col-span-2 columns-2 align-middle'>
                            <div className='pt-2'><p className='flex flex-nowrap text-xs font-normal text-gray-400 dark:text-gray-400'>Observed at: {currentCondition?.station}</p></div>
                            <div className='pt-2 text-right'><p className='flex justify-end text-xs font-normal text-gray-400 dark:text-gray-400'><img width="15" height="15" src="https://img.icons8.com/ios-filled/50/sunrise--v1.png" alt="sunrise" title='Sunrise' /> {new Date(sunriseSunset?.dateTime[1].year, sunriseSunset?.dateTime[1].month - 1, sunriseSunset?.dateTime[1].day, sunriseSunset?.dateTime[1].hour, sunriseSunset?.dateTime[1].minute).toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: false, timeZoneName: 'short' })} <img width="15" height="15" src="https://img.icons8.com/ios-filled/50/sunset.png" alt="sunset" title='Sunset'/> {new Date(sunriseSunset?.dateTime[3].year, sunriseSunset?.dateTime[3].month - 1, sunriseSunset?.dateTime[3].day, sunriseSunset?.dateTime[3].hour, sunriseSunset?.dateTime[3].minute).toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: false, timeZoneName: 'short' })}</p></div>
                        </div>
                    </div>
                }
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                </div>
            </div>
            <div>
                <div className='p-5 w-full bg-slate-200 text-center'>5-Day Weather Forecast</div>
            </div>
        </div>
    )
}

export default WeatherMeteogram