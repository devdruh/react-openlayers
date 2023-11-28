import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { useCallback } from 'react';
import { weatherForecastChartOptions } from '../util/variables';


const WeatherMeteogram = ({ cityWeather }) => {
    
    const [chartOptions, setChartOptions] = useState(weatherForecastChartOptions);

    const initHighCharts = useCallback(async () => {

        if (cityWeather.hasOwnProperty('siteData')) {

            const forecastLocation = cityWeather.siteData.location;
            const dateUpdated = cityWeather.siteData.dateTime[1];
            const dateForecast = cityWeather.siteData.hourlyForecastGroup.dateTime[1];
            const hourlyForecast = cityWeather.siteData.hourlyForecastGroup.hourlyForecast;

            setChartOptions(data => {
                return {
                    ...data,
                    title: {
                        text: 'Forecast for ' + forecastLocation.region + ', ' + forecastLocation.province
                    },
                    subtitle: {
                        text: 'As of '+dateUpdated.textSummary
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
                                    to: to
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
        <>
            <div className='flex flex-grow'>
                <div className='pt-5 w-full'>
                    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                </div>
            </div>
            <div className='flex'>
                <div className='p-5 w-full bg-slate-200 text-center'>5-Day Weather Forecast</div>
            </div>
        </>
    )
}

export default WeatherMeteogram