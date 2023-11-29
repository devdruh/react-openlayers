import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { useCallback } from 'react';
import { weatherForecastChartOptions } from '../util/variables';


const WeatherMeteogram = ({ cityWeather }) => {

    const [chartOptions, setChartOptions] = useState(weatherForecastChartOptions);
    const currentCondition = cityWeather.siteData?.currentConditions;

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
            var pointStart;
            
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
                        }]
                    }
                });
                
                _date.setHours(_date.getHours() + 1);

                if (index === 0) {
                    pointStart = (x + to) / 2;
                }
                
            }
        }

    }, [cityWeather]);

    
    useEffect(() => { 
    
        initHighCharts();

    }, [initHighCharts]);

    return (
        <div className='flex flex-col'>
            <div>
                <div className='pt-5 w-full'>
                    <div className='grid md:grid-cols-2 items-center p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                        <div>
                            <div className='flex sm:flex-row justify-center '>
                                {
                                    currentCondition?.iconCode ? 
                                        <img src={`https://meteo.gc.ca/weathericons/${currentCondition?.iconCode}.gif`} className='h-[51px] translate-y-1' width={60} alt={`${currentCondition?.condition}`} />
                                        : null
                                }
                                <h5 className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">{ Math.floor(currentCondition?.temperature) }</h5>
                                {/* <p className='pl-2 flex gap-1'><a href='/'>°C</a> | <a href='/' className='text-gray-500'>°F</a></p> */}
                                <p className='pl-2 flex gap-1'>°C</p>
                                <div className='text-xs pl-4 whitespace-nowrap'>
                                    <p className='font-normal text-gray-500 dark:text-gray-400'>Dew point: { currentCondition?.dewpoint}°C</p> 
                                    <p className='font-normal text-gray-500 dark:text-gray-400'>Humidity: { currentCondition?.relativeHumidity }%</p> 
                                    <p className='font-normal text-gray-500 dark:text-gray-400'>Wind: { currentCondition?.wind.speed } km/h</p>
                                    <p className='font-normal text-gray-500 dark:text-gray-400'>Wind Chill: { currentCondition?.windChill }</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='md:text-right text-center'>
                                <h5 className='text-lg'>Weather</h5>
                                <p className='text-sm font-thin text-gray-500 dark:text-gray-400'>{ new Date(currentCondition?.dateTime[1].year, currentCondition?.dateTime[1].month - 1, currentCondition?.dateTime[1].day, currentCondition?.dateTime[1].hour, currentCondition?.dateTime[1].minute).toLocaleDateString(undefined, { weekday: 'long',hour: 'numeric', hour12: false, minute: 'numeric', timeZoneName:'shortGeneric'}) }</p>
                                <p className='text-sm font-thin text-gray-500 dark:text-gray-400'>{ currentCondition?.condition }</p>
                            </div>
                        </div>
                        <div className='col-span-2 pt-2'><p className='text-xs font-normal text-gray-400 dark:text-gray-400'>Observed at: { currentCondition?.station}</p></div>
                    </div>

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