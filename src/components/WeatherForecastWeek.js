import React, { useEffect, useState } from 'react'
import { initFlowbite } from 'flowbite';
import { useTranslation } from "react-i18next";

const WeatherForecastWeek = ({ forecast }) => {

    const [formatWeek, setFormatWeek] = useState([]);
    const { t, i18n } = useTranslation();
    const [forecastData, setForecastData] = useState();

    useEffect(() => {
        if (Object.keys(forecast).length > 0) {
            setForecastData(forecast);
            var _format = [];

            for (let index = 0; index < forecast.forecast.length; index++) {
                const element = forecast.forecast[index];

                if (index % 2 === 0) {
                    
                    if (index === 0 && (element.period.includes('night') || element.period.includes('nuit'))) {
                        _format.push([element])
                    } else if (element.period.includes('night') || element.period.includes('nuit')) {
                        _format[_format.length-1].push(element)
                    } else { // day
                        _format.push([element])
                    }
                    
                } else {

                    if (index === 1 && (_format[0][0].period.includes('night') || _format[0][0].period.includes('nuit'))) {
                        _format.push([element])
                    } else {
                        if (_format[0][0].period.includes('night') || _format[0][0].period.includes('nuit')) {
                            _format.push([element]);
                        } else { //day
                            _format[_format.length-1].push(element);
                        }
                    }
                    
                }
            }
            
            setFormatWeek(_format);
        }
        initFlowbite()
    },[forecast])

    return (
        <div className='pt-5 mb-4 w-full bg-gradient-to-br mt-3 from-sky-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-md dark:from-gray-900 dark:to-gray-800'>
            <h4 className='text-center text-slate-100 dark:text-gray-300 font-medium text-lg'>{ t('common:weekForecast')}</h4>
            <p className='text-center text-slate-200 dark:text-gray-400 font-normal text-xs'>{t('common:forecastAsOf')}  {new Date(forecastData?.dateTime[1].year, forecastData?.dateTime[1].month - 1, forecastData?.dateTime[1].day, forecastData?.dateTime[1].hour, forecastData?.dateTime[1].minute).toLocaleDateString(i18n.language === 'fr' ? 'fr-CA' : undefined, { weekday: 'short', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' })}</p>

            <div className="relative pt-2 shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full text-sm text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='text-center'>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3">
                                Day
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Night
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            formatWeek.length > 0 ?
                                formatWeek.map((item, i) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:last:border-none w-full" key={i}>
                                        <th scope="row" className="px-6 py-1 w-1/3 text-left font-medium text-gray-900 whitespace-nowrap dark:text-slate-400 dark:bg-gray-900">
                                            {i === 0 ? `${t('common:today')}` : item[0].period}
                                        </th>
                                        <td className='px-2 py-1 w-1/3'>
                                            <table className='w-full'>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <table className='w-full'>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className='whitespace-nowrap text-right font-medium dark:text-slate-300 w-1/2'>
                                                                            {
                                                                                item.length > 1 ?
                                                                                    item[0].temperatures.temperature + ' °C' :
                                                                                    i === 0 ? null : item[0].temperatures.temperature + ' °C'
                                                                            }
                                                                        </td>
                                                                        <td className='w-1/2'>
                                                                            {
                                                                                item.length > 1 ?
                                                                                    <img src={`https://meteo.gc.ca/weathericons/${item[0].abbreviatedForecast.iconCode}.gif`} width={30} alt={`${item[0].abbreviatedForecast.textSummary}`} /> :
                                                                                    i === 0 ? null : <img src={`https://meteo.gc.ca/weathericons/${item[0].abbreviatedForecast.iconCode}.gif`} width={30} alt={`${item[0].abbreviatedForecast.textSummary}`} />
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-xs text-center'>
                                                            <table className='w-full'>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className='w-1/12'></td>
                                                                        <td className='w-10/12 text-center'>
                                                                            {
                                                                                item.length > 1 ?
                                                                                    item[0].abbreviatedForecast.textSummary :
                                                                                    i === 0 ? null : item[0].abbreviatedForecast.textSummary
                                                                            }
                                                                        </td>
                                                                        <td className='w-1/12'>
                                                                            {
                                                                                item.length > 1 ?
                                                                                    <button data-popover-target={`popover-summary-sm-${item[0].period}-day`} data-popover-placement="top-start" type="button">
                                                                                        <svg className="w-4 h-4 ms-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                                                                        </svg>
                                                                                        <span className="sr-only">Show information</span>
                                                                                    </button>
                                                                                    :
                                                                                    i === 0 ? null :
                                                                                        <button data-popover-target={`popover-summary-sm-${item[0].period}-day`} data-popover-placement="top-start" type="button">
                                                                                            <svg className="w-4 h-4 ms-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                                                                            </svg>
                                                                                            <span className="sr-only">Show information</span>
                                                                                        </button>
                                                                            }
                                                                            <div data-popover id={

                                                                                item.length > 1 ?
                                                                                    `popover-summary-sm-${item[0].period}-day` :
                                                                                    i === 0 ? null : `popover-summary-sm-${item[0].period}-day`

                                                                            } role="tooltip" className="absolute z-10 invisible text-sm max-w-xs text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                                                                <div className="p-3 space-y-2">
                                                                                    <h3 className="font-semibold text-gray-900 dark:text-gray-300">{t('common:summary')}</h3>
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[0].cloudPrecip.textSummary !== '' ?
                                                                                                <p className='text-justify text-xs'>- {item[0].cloudPrecip.textSummary}</p> : null :
                                                                                            i === 0 ? null : item[0].cloudPrecip.textSummary !== '' ?
                                                                                                <p className='text-justify text-xs'>- {item[0].cloudPrecip.textSummary}</p> : null
                                                                                    }
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[0]?.uv?.textSummary !== '' && item[0]?.uv?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.uv?.textSummary}</p> : null :
                                                                                            i === 0 ? null : item[0]?.uv?.textSummary !== '' && item[0]?.uv?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.uv?.textSummary}</p> : null
                                                                                    }
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[0]?.visibility?.windVisib?.textSummary !== '' && item[0]?.visibility?.windVisib?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.visibility?.windVisib?.textSummary}</p> : null :
                                                                                            i === 0 ? null : item[0]?.visibility?.windVisib?.textSummary !== '' && item[0]?.visibility?.windVisib?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.visibility?.windVisib?.textSummary}</p> : null
                                                                                    }
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[0]?.precipitation?.textSummary !== '' && item[0]?.precipitation?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.precipitation?.textSummary}</p> : null :
                                                                                            i === 0 ? null : item[0]?.precipitation?.textSummary !== '' && item[0]?.precipitation?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.precipitation?.textSummary}</p> : null
                                                                                    }
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[0]?.temperatures?.textSummary !== '' && item[0]?.temperatures?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.temperatures?.textSummary}</p> : null :
                                                                                            i === 0 ? null : item[0]?.temperatures?.textSummary !== '' && item[0]?.temperatures?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.temperatures?.textSummary}</p> : null
                                                                                    }
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[0]?.winds?.textSummary !== '' && item[0]?.winds?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.winds?.textSummary}</p> : null :
                                                                                            i === 0 ? null : item[0]?.winds?.textSummary !== '' && item[0]?.winds?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.winds?.textSummary}</p> : null
                                                                                    }
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[0]?.windChill?.textSummary !== '' && item[0]?.windChill?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.windChill?.textSummary}</p> : null :
                                                                                            i === 0 ? null : item[0]?.windChill?.textSummary !== '' && item[0]?.windChill?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.windChill?.textSummary}</p> : null
                                                                                    }
                                                                                </div>
                                                                                <div data-popper-arrow></div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td className='px-2 py-1 w-1/3 dark:bg-gray-900'>
                                            <table className='w-full'>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <table className='w-full'>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className='whitespace-nowrap px-1 text-right font-medium dark:text-slate-300 w-1/2'>
                                                                            {
                                                                                item.length > 1 ?
                                                                                    item[1].temperatures.temperature + ' °C' :
                                                                                    i === 0 ? item[0].temperatures.temperature + ' °C' : null
                                                                            }
                                                                        </td>
                                                                        <td className='w-1/2'>
                                                                            {
                                                                                item.length > 1 ?
                                                                                    <img src={`https://meteo.gc.ca/weathericons/${item[1].abbreviatedForecast.iconCode}.gif`} width={30} alt={`${item[1].abbreviatedForecast.textSummary}`} /> :
                                                                                    i === 0 ? <img src={`https://meteo.gc.ca/weathericons/${item[0].abbreviatedForecast.iconCode}.gif`} width={30} alt={`${item[0].abbreviatedForecast.textSummary}`} /> : null
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-xs'>
                                                            <table className='w-full'>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className='w-1/12'></td>
                                                                        <td className='w-10/12 text-center'>
                                                                            {
                                                                                item.length > 1 ?
                                                                                    item[1].abbreviatedForecast.textSummary :
                                                                                    i === 0 ? item[0].abbreviatedForecast.textSummary : null
                                                                            }
                                                                        </td>
                                                                        <td className='w-1/12'>
                                                                            {
                                                                                item.length > 1 ?

                                                                                    <button data-popover-target={`popover-summary-sm-${item[1].period.replace(' night', '')}-night`} data-popover-placement="top-start" type="button">
                                                                                        <svg className="w-4 h-4 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                                                                        </svg>
                                                                                        <span className="sr-only">Show information</span>
                                                                                    </button> :
                                                                                    i === 0 ?
                                                                                        <button data-popover-target={`popover-summary-sm-${item[0].period.replace(' night', '')}-night`} data-popover-placement="top-start" type="button">
                                                                                            <svg className="w-4 h-4 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                                                                            </svg>
                                                                                            <span className="sr-only">Show information</span>
                                                                                        </button>
                                                                                        : null
                                                                            }

                                                                            <div data-popover id={

                                                                                item.length > 1 ?
                                                                                    `popover-summary-sm-${item[1].period.replace(' night', '')}-night` :
                                                                                    i === 0 ? `popover-summary-sm-${item[0].period.replace(' night', '')}-night` : null

                                                                            } role="tooltip" className="absolute z-10 invisible text-sm max-w-xs text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                                                                <div className="p-3 space-y-2">
                                                                                    <h3 className="font-semibold text-gray-900 dark:text-gray-300">{t('common:summary')}</h3>
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[1].cloudPrecip.textSummary !== '' ?
                                                                                                <p className='text-justify text-xs'>- {item[1].cloudPrecip.textSummary}</p> : null :
                                                                                            i === 0 ? item[0].cloudPrecip.textSummary !== '' ?
                                                                                                <p className='text-justify text-xs'>- {item[0].cloudPrecip.textSummary}</p> : null : null
                                                                                    }
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[1]?.uv?.textSummary !== '' && item[1]?.uv?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[1]?.uv?.textSummary}</p> : null :
                                                                                            i === 0 ? item[0]?.uv?.textSummary !== '' && item[0]?.uv?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.uv?.textSummary}</p> : null : null
                                                                                    }
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[1]?.visibility?.windVisib?.textSummary !== '' && item[1]?.visibility?.windVisib?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[1]?.visibility?.windVisib?.textSummary}</p> : null :
                                                                                            i === 0 ? item[0]?.visibility?.windVisib?.textSummary !== '' && item[0]?.visibility?.windVisib?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.visibility?.windVisib?.textSummary}</p> : null : null
                                                                                    }
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[1]?.precipitation?.textSummary !== '' && item[1]?.precipitation?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[1]?.precipitation?.textSummary}</p> : null :
                                                                                            i === 0 ? item[0]?.precipitation?.textSummary !== '' && item[0]?.precipitation?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.precipitation?.textSummary}</p> : null : null
                                                                                    }
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[1]?.temperatures?.textSummary !== '' && item[1]?.temperatures?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[1]?.temperatures?.textSummary}</p> : null :
                                                                                            i === 0 ? item[0]?.temperatures?.textSummary !== '' && item[0]?.temperatures?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.temperatures?.textSummary}</p> : null : null
                                                                                    }
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[1]?.winds?.textSummary !== '' && item[1]?.winds?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[1]?.winds?.textSummary}</p> : null :
                                                                                            i === 0 ? item[0]?.winds?.textSummary !== '' && item[0]?.winds?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.winds?.textSummary}</p> : null : null
                                                                                    }
                                                                                    {
                                                                                        item.length > 1 ?
                                                                                            item[1]?.windChill?.textSummary !== '' && item[1]?.windChill?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[1]?.windChill?.textSummary}</p> : null :
                                                                                            i === 0 ? item[0]?.windChill?.textSummary !== '' && item[0]?.windChill?.textSummary !== undefined ?
                                                                                                <p className='text-justify text-xs'>- {item[0]?.windChill?.textSummary}</p> : null : null
                                                                                    }
                                                                                </div>
                                                                                <div data-popper-arrow></div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                )) : null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WeatherForecastWeek