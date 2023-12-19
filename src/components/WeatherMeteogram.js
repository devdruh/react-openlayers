import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { useCallback } from 'react';
import { weatherForecastChartOptions } from '../util/variables';
import { useTranslation } from "react-i18next";

require("highcharts/modules/accessibility")(Highcharts);

const WeatherMeteogram = ({ cityWeather }) => {

    const [chartOptions, setChartOptions] = useState(weatherForecastChartOptions);
    const { t, i18n } = useTranslation();

    const language = i18n.language;

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
                        text: '<p class="dark:text-gray-300 text-gray-700 font-medium text-md truncate text-ellipsis" title="' + forecastTitle + ' ' + forecastLocation.region + ', ' + forecastLocation.province + '">' + forecastTitle + ' ' + forecastLocation.region + ', ' + forecastLocation.province + '</p>'
                    },
                    subtitle: {
                        text: '<p class="text-center text-gray-400 dark:text-gray-400 font-normal text-xs">' + forecastSubTitle + ' ' + dateForecast.textSummary + '<p>'
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

        }

    }, [cityWeather, language, t]);

    useEffect(() => {

        initHighCharts();

    }, [initHighCharts]);

    return (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} containerProps={{ id: 'forecast-weather-highchart' }} />
    )
}

export default WeatherMeteogram