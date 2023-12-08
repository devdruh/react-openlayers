import React, { useEffect, useState } from 'react'
import { initFlowbite } from 'flowbite';
import { useTranslation } from "react-i18next";

const WeatherForecastWeek = ({ forecast }) => {

    const [formatWeek, setFormatWeek] = useState([]);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (Object.keys(forecast).length > 0) {

            var _format = [];

            for (let index = 0; index < forecast.forecast.length; index++) {
                const element = forecast.forecast[index];

                if (index % 2 === 0) {
                    
                    if (index === 0 && element.period.includes('night')) {
                        _format.push([element])
                    } else if (element.period.includes('night')) {
                        _format[_format.length-1].push(element)
                    } else { // day
                        _format.push([element])
                    }
                    
                } else {

                    if (index === 1 && _format[0][0].period.includes('night')) {
                        _format.push([element])
                    } else {
                        if (_format[0][0].period.includes('night')) {
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
        <div className='py-5 px-2 w-full bg-gradient-to-br from-sky-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-md'>
            <h4 className='text-center text-slate-50 font-normal text-lg'>7 Day Weather Forecast</h4>
            <p className='text-center text-slate-200 font-normal text-xs'>{t('common:forecastAsOf') } { new Date(forecast?.dateTime[1].year, forecast?.dateTime[1].month - 1, forecast?.dateTime[1].day, forecast?.dateTime[1].hour, forecast?.dateTime[1].minute).toLocaleDateString(i18n.language === 'fr' ? 'fr-CA' : undefined, { weekday: 'short', hour: 'numeric', minute: 'numeric', timeZoneName:'short'}) }</p>
            <div className='flex flex-nowrap max-w-full p-3 gap-1 overflow-y-auto'>
                {/* xl:justify-center */}
            
                {
                    formatWeek.length > 0 ?
                        formatWeek.map((item, i) => (

                            item.length > 1 ?
                                    
                            <div key={i} className='shadow-lg shadow-sky-500/800 dark:shadow-lg dark:shadow-sky-800/80'>
                                
                                <div className="sm:w-[120px] min-w-[100px] p-1 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            
                                    <div><p className='text-sm font-medium text-gray-700 dark:text-gray-400'>DAY</p></div>
                                    <div className='border-b border-b-slate-400 grid grid-cols-2 justify-items-center'>
                                        <div>
                                            <p className='text-xs text-gray-500 dark:text-gray-400'>{item[0].period}</p>
                                        </div>
                                        <div>
                                            <p className='text-xs text-gray-500 dark:text-gray-400'>Dec 6</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-center'>
                                    <div><img src={`https://meteo.gc.ca/weathericons/${item[0].abbreviatedForecast.iconCode}.gif`} className='h-[51px] translate-y-1' width={60} alt={`${item[0].abbreviatedForecast.textSummary}`} /></div>
                                    </div>
                                    <h5 className='text-xl font-semibold'>{item[0].temperatures.temperature }</h5>
                                    <div className='min-h-[40px] max-h-[40px] mb-2'>
                                        <p className='font-normal text-sm text-gray-500 dark:text-gray-400' title={`${item[0].abbreviatedForecast.textSummary}`}>{item[0].abbreviatedForecast.textSummary}</p>
                                    </div>
                                    <p className=" inline-flex text-xs text-center align-middle text-gray-500 dark:text-gray-400">More info
                                        <button data-popover-target={`popover-summary-${item[0].period}-day`} data-popover-placement="top-start" type="button">
                                            <svg className="w-4 h-4 ms-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="sr-only">Show information</span>
                                        </button>
                                    </p>

                                    <div data-popover id={`popover-summary-${item[0].period}-day`} role="tooltip" className="absolute z-10 invisible inline-block text-sm max-w-xs text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                        <div className="p-3 space-y-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Summary</h3>
                                            {
                                                item[0]?.cloudPrecip?.textSummary !== '' && item[0]?.cloudPrecip?.textSummary !== undefined ? 
                                                <p className='text-justify text-xs'>- { item[0]?.cloudPrecip?.textSummary}</p> : null
                                            }
                                            {
                                                item[0]?.uv?.textSummary !== '' && item[0]?.uv?.textSummary !== undefined ? 
                                                <p className='text-justify text-xs'>- { item[0]?.uv?.textSummary}</p> : null
                                            }
                                            {
                                                item[0]?.visibility?.windVisib?.textSummary !== '' && item[0]?.visibility?.windVisib?.textSummary !== undefined ? 
                                                <p className='text-justify text-xs'>- { item[0]?.visibility?.windVisib?.textSummary}</p> : null
                                            }

                                            {
                                                item[0]?.precipitation?.textSummary !== '' && item[0]?.precipitation?.textSummary !== undefined ? 
                                                <p className='text-justify text-xs'>- { item[0]?.precipitation?.textSummary}</p> : null
                                            }
                                            {
                                                item[0]?.temperatures?.textSummary !== '' && item[0]?.temperatures?.textSummary !== undefined ? 
                                                <p className='text-justify text-xs'>- { item[0]?.temperatures?.textSummary}</p> : null
                                            }
                                            {
                                                item[0]?.winds?.textSummary !== '' && item[0]?.winds?.textSummary !== undefined ? 
                                                <p className='text-justify text-xs'>- { item[0]?.winds?.textSummary}</p> : null
                                            }
                                            {
                                                item[0]?.windChill?.textSummary !== '' && item[0]?.windChill?.textSummary !== undefined ? 
                                                <p className='text-justify text-xs'>- { item[0]?.windChill?.textSummary}</p> : null
                                            }
                                        </div>
                                        <div data-popper-arrow></div>
                                    </div>
                                </div>

                                <div className="sm:w-[120px] min-w-[100px] p-1 text-center bg-white border border-gray-200 rounded-lg shadow-lg shadow-sky-100/50 dark:bg-gray-800 dark:border-gray-700">
                                    <div><p className='text-sm font-medium text-gray-700 dark:text-gray-400'>NIGHT </p></div>
                                    <div className='border-b border-b-slate-400 grid grid-cols-2 justify-items-center'>
                                        <div>
                                            <p className='text-xs text-gray-500 dark:text-gray-400'>{item[1].period.replace(' night','') }</p>
                                        </div>
                                        <div>
                                            <p className='text-xs text-gray-500 dark:text-gray-400'>Dec 6</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-center'>
                                        <div><img src={`https://meteo.gc.ca/weathericons/${item[1].abbreviatedForecast.iconCode}.gif`} className='h-[51px] translate-y-1' width={60} alt={`${item[1].abbreviatedForecast.textSummary}`} /></div>
                                    </div>
                                    <h5 className='text-xl font-medium'>{item[1].temperatures.temperature} C</h5>
                                    <div className='min-h-[40px] max-h-[40px] mb-2'>
                                        <p className='font-normal text-sm text-gray-500 dark:text-gray-400' title={`${item[1].abbreviatedForecast.textSummary}`}>{item[1].abbreviatedForecast.textSummary}</p>
                                    </div>
                                    <p className=" inline-flex text-xs text-center align-middle text-gray-500 dark:text-gray-400">More info
                                        <button data-popover-target={`popover-summary-${item[1].period.replace(' night','')}-night`} data-popover-placement="top-start" type="button">
                                            <svg className="w-4 h-4 ms-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="sr-only">Show information</span>
                                        </button>
                                    </p>

                                    <div data-popover id={`popover-summary-${item[1].period.replace(' night','')}-night`} role="tooltip" className="absolute z-10 invisible inline-block text-sm max-w-xs text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                        <div className="p-3 space-y-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Summary</h3>
                                            {
                                                item[1].cloudPrecip.textSummary !== '' ? 
                                                <p className='text-justify text-xs'>- { item[1].cloudPrecip.textSummary}</p> : null
                                            }
                                            {
                                                item[1]?.uv?.textSummary !== '' && item[1]?.uv?.textSummary !== undefined ? 
                                                <p className='text-justify text-xs'>- { item[1]?.uv?.textSummary}</p> : null
                                            }
                                            {
                                                item[1]?.visibility?.windVisib?.textSummary !== '' && item[1]?.visibility?.windVisib?.textSummary !== undefined ? 
                                                <p className='text-justify text-xs'>- { item[1]?.visibility?.windVisib?.textSummary}</p> : null
                                            }

                                            {
                                                item[1]?.precipitation?.textSummary !== '' && item[1]?.precipitation?.textSummary !== undefined ? 
                                                <p className='text-justify text-xs'>- { item[1]?.precipitation?.textSummary}</p> : null
                                            }
                                            {
                                                item[1]?.temperatures?.textSummary !== '' && item[1]?.temperatures?.textSummary !== undefined ? 
                                                <p className='text-justify text-xs'>- { item[1]?.temperatures?.textSummary}</p> : null
                                            }
                                            {
                                                item[1]?.winds?.textSummary !== '' && item[1]?.winds?.textSummary !== undefined ? 
                                                <p className='text-justify text-xs'>- { item[1]?.winds?.textSummary}</p> : null
                                            }
                                            {
                                                item[1]?.windChill?.textSummary !== '' && item[1]?.windChill?.textSummary !== undefined ? 
                                                <p className='text-justify text-xs'>- { item[1]?.windChill?.textSummary}</p> : null
                                            }
                                        </div>
                                        <div data-popper-arrow></div>
                                    </div>
                                </div>

                            </div>

                            :
                            
                                i === 0 ?
                                    
                                    <div key={i} className='shadow-lg shadow-sky-500/800 dark:shadow-lg dark:shadow-sky-800/80'>
                                        
                                        <div className="sm:w-[120px] min-h-[198px] min min-w-[100px] p-1 text-center bg-slate-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    
                                            
                                        </div>

                                        <div className="sm:w-[120px] min-h-[198px] min-w-[100px] p-1 text-center bg-white border border-gray-200 rounded-lg shadow-lg shadow-sky-100/50 dark:bg-gray-800 dark:border-gray-700">
                                            <div><p className='text-sm font-medium text-gray-700 dark:text-gray-400'>NIGHTs</p></div>
                                            <div className='border-b border-b-slate-400 grid grid-cols-2 justify-items-center'>
                                                <div>
                                                    <p className='text-xs text-gray-500 dark:text-gray-400'>{item[0].period.replace(' night','') }</p>
                                                </div>
                                                <div>
                                                    <p className='text-xs text-gray-500 dark:text-gray-400'>Dec 6</p>
                                                </div>
                                            </div>
                                            <div className='flex justify-center'>
                                                <div><img src={`https://meteo.gc.ca/weathericons/${item[0].abbreviatedForecast.iconCode}.gif`} className='h-[51px] translate-y-1' width={60} alt={`${item[0].abbreviatedForecast.textSummary}`} /></div>
                                            </div>
                                            <h5 className='text-xl font-medium'>{item[0].temperatures.temperature } C</h5>
                                            <div className='min-h-[40px] max-h-[40px] mb-2'>
                                                <p className='font-normal text-sm text-gray-500 dark:text-gray-400' title={`${item[0].abbreviatedForecast.textSummary}`}>{item[0].abbreviatedForecast.textSummary}</p>
                                            </div>

                                            <p className=" inline-flex text-xs text-center align-middle text-gray-500 dark:text-gray-400">More info
                                                <button data-popover-target={`popover-summary-${item[0].period.replace(' night','')}-night`} data-popover-placement="top-start" type="button">
                                                    <svg className="w-4 h-4 ms-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                                    </svg>
                                                    <span className="sr-only">Show information</span>
                                                </button>
                                            </p>

                                            <div data-popover id={`popover-summary-${item[0].period.replace(' night','')}-night`} role="tooltip" className="absolute z-10 invisible inline-block text-sm max-w-xs text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                                <div className="p-3 space-y-2">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">Summary</h3>
                                                    {
                                                        item[0]?.cloudPrecip?.textSummary !== '' && item[0]?.cloudPrecip?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.cloudPrecip?.textSummary}</p> : null
                                                    }
                                                    {
                                                        item[0]?.uv?.textSummary !== '' && item[0]?.uv?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.uv?.textSummary}</p> : null
                                                    }
                                                    {
                                                        item[0]?.visibility?.windVisib?.textSummary !== '' && item[0]?.visibility?.windVisib?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.visibility?.windVisib?.textSummary}</p> : null
                                                    }

                                                    {
                                                        item[0]?.precipitation?.textSummary !== '' && item[0]?.precipitation?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.precipitation?.textSummary}</p> : null
                                                    }
                                                    {
                                                        item[0]?.temperatures?.textSummary !== '' && item[0]?.temperatures?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.temperatures?.textSummary}</p> : null
                                                    }
                                                    {
                                                        item[0]?.winds?.textSummary !== '' && item[0]?.winds?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.winds?.textSummary}</p> : null
                                                    }
                                                    {
                                                        item[0]?.windChill?.textSummary !== '' && item[0]?.windChill?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.windChill?.textSummary}</p> : null
                                                    }
                                                </div>
                                                <div data-popper-arrow></div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div key={i} className='shadow-lg shadow-sky-500/800 dark:shadow-lg dark:shadow-sky-800/80'>
                                
                                        <div className="sm:w-[120px] min-h-[198px] min-w-[100px] p-1 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    
                                            <div><p className='text-sm font-medium text-gray-700 dark:text-gray-400'>DAY</p></div>
                                            <div className='border-b border-b-slate-400 grid grid-cols-2 justify-items-center'>
                                                <div>
                                                    <p className='text-xs text-gray-500 dark:text-gray-400'>{item[0].period}</p>
                                                </div>
                                                <div>
                                                    <p className='text-xs text-gray-500 dark:text-gray-400'>Dec 6</p>
                                                </div>
                                            </div>
                                            <div className='flex justify-center'>
                                            <div><img src={`https://meteo.gc.ca/weathericons/${item[0].abbreviatedForecast.iconCode}.gif`} className='h-[51px] translate-y-1' width={60} alt={`${item[0].abbreviatedForecast.textSummary}`} /></div>
                                            </div>
                                            <h5 className='text-xl font-semibold'>{item[0].temperatures.temperature }</h5>
                                            <div className='min-h-[40px] max-h-[40px] mb-2'>
                                                <p className='font-normal text-sm text-gray-500 dark:text-gray-400' title={`${item[0].abbreviatedForecast.textSummary}`}>{item[0].abbreviatedForecast.textSummary}</p>
                                            </div>

                                            <p className=" inline-flex text-xs text-center align-middle text-gray-500 dark:text-gray-400">More info
                                                <button data-popover-target={`popover-summary-${item[0].period}-day`} data-popover-placement="top-end" type="button">
                                                    <svg className="w-4 h-4 ms-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                                    </svg>
                                                    <span className="sr-only">Show information</span>
                                                </button>
                                            </p>

                                            <div data-popover id={`popover-summary-${item[0].period}-day`} role="tooltip" className="absolute z-10 invisible inline-block text-sm max-w-xs text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                                <div className="p-3 space-y-2">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">Summary</h3>
                                                    {
                                                        item[0]?.cloudPrecip?.textSummary !== '' && item[0]?.cloudPrecip?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.cloudPrecip?.textSummary}</p> : null
                                                    }
                                                    {
                                                        item[0]?.uv?.textSummary !== '' && item[0]?.uv?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.uv?.textSummary}</p> : null
                                                    }
                                                    {
                                                        item[0]?.visibility?.windVisib?.textSummary !== '' && item[0]?.visibility?.windVisib?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.visibility?.windVisib?.textSummary}</p> : null
                                                    }

                                                    {
                                                        item[0]?.precipitation?.textSummary !== '' && item[0]?.precipitation?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.precipitation?.textSummary}</p> : null
                                                    }
                                                    {
                                                        item[0]?.temperatures?.textSummary !== '' && item[0]?.temperatures?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.temperatures?.textSummary}</p> : null
                                                    }
                                                    {
                                                        item[0]?.winds?.textSummary !== '' && item[0]?.winds?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.winds?.textSummary}</p> : null
                                                    }
                                                    {
                                                        item[0]?.windChill?.textSummary !== '' && item[0]?.windChill?.textSummary !== undefined ? 
                                                        <p className='text-justify text-xs'>- { item[0]?.windChill?.textSummary}</p> : null
                                                    }
                                                    
                                                </div>
                                                <div data-popper-arrow></div>
                                            </div>
                                        </div>

                                        <div className="sm:w-[120px] min-h-[198px] min-w-[100px] p-1 text-center bg-slate-200 border border-gray-200 rounded-lg shadow-lg shadow-sky-100/50 dark:bg-gray-800 dark:border-gray-700">
                                            
                                        </div>
                                    </div>
                            
                        ))
                    
                        : null
                }
            
            </div>
        </div>
    )
}

export default WeatherForecastWeek