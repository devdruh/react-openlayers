import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts'
import { aqhiChartOptions } from '../util/variables';
import { useState } from 'react';
import { isDarkTheme } from '../util/utilities';

const WeatherWidgetChart = ({ aqhiChartData }) => {

    const aqhiChartElement = useRef(null);
    const [aqhiLocName, setAqhiLocName] = useState(null);

    useEffect(() => {

        if (aqhiChartData.length > 0) {

            var _chartSeries = [];
            var _chartCat = [];

            const dataLastIndex = aqhiChartData[aqhiChartData.length - 1];
            const lastIndexDate = new Date(dataLastIndex.properties.forecast_datetime);
            const formatDate = lastIndexDate.toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric', timeZoneName: 'short' });
            aqhiChartOptions.xaxis.title.text = formatDate;
            aqhiChartOptions.xaxis.title.style.color = isDarkTheme() ? '#63748D' : '#1E2A3D';

            setAqhiLocName(dataLastIndex.properties.location_name_en);


            aqhiChartData.forEach((item) => {
                const forecastDate = new Date(Date.parse(item.properties.forecast_datetime));
                const getLocalHrs = forecastDate.toLocaleString([], {
                    // hour: '2-digit',
                    hour: 'numeric'
                });

                _chartSeries.push(item.properties.aqhi);
                _chartCat.push(getLocalHrs)


                aqhiChartOptions.series[0].data = _chartSeries;
                aqhiChartOptions.xaxis.categories = _chartCat;
            });

            var chart = new ApexCharts(aqhiChartElement.current, aqhiChartOptions)
            chart.render();

        }

    }, [aqhiChartData]);

    return (
        <div className="max-w-sm w-full bg-white rounded-b-lg shadow dark:text-slate-200 dark:bg-gray-800 px-4 pb-4">
            <div className="flex justify-between mb-5">
                <div className="grid gap-4 grid-cols-1">
                    <div>
                        <h6 className="inline-flex items-center text-gray-500 dark:text-slate-500 leading-none font-normal mb-2 text-sm">Forecast location</h6>
                        <p className="text-gray-900 dark:text-slate-400 text-lg leading-none font-bold">{aqhiLocName}</p>
                    </div>
                </div>
                <div>
                    <button id="dropdownDefaultButton"
                        data-dropdown-toggle="lastDaysdropdown"
                        data-dropdown-placement="bottom" type="button" className="px-3 py-2 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-sky-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-slate-400 dark:hover:bg-gray-800" disabled>Today<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                            </li>
                            <li>
                                <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                            </li>
                            <li>
                                <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                            </li>
                            <li>
                                <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                            </li>
                            <li>
                                <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="line-chart" ref={aqhiChartElement}></div>
            <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-2.5">
                <div className="pt-5">
                    <button className="px-3 py-2 text-sm font-medium text-slate-200 inline-flex items-center bg-slate-500 cursor-auto focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center border dark:text-slate-500 dark:border-slate-600 dark:bg-gray-800 dark:hover:bg-gray-800 dark:focus:ring-slate-800" disabled>
                        <svg className="w-3.5 h-3.5 text-slate-200 dark:text-slate-500 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                        View full report
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WeatherWidgetChart
