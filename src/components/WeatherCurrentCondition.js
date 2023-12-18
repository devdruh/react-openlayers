import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

const WeatherCurrentCondition = ({ cityWeather }) => {

    const { t, i18n } = useTranslation();
    const [currentCondition, setCurrentCondition] = useState();
    const [sunriseSunset, setSunriseSunset] = useState();

    const language = i18n.language;

    useEffect(() => {

        if (Array.isArray(cityWeather) && cityWeather.length > 0) {

            if (language === 'en') {
                setCurrentCondition(cityWeather[0]?.siteData?.currentConditions);
                setSunriseSunset(cityWeather[0]?.siteData?.riseSet);
            } else if (language === 'fr') {
                setCurrentCondition(cityWeather[1]?.siteData?.currentConditions);
                setSunriseSunset(cityWeather[1]?.siteData?.riseSet);
            }
        }

    }, [cityWeather, language]);

    return (
        <div className='grid md:grid-cols-2 items-center p-4 sm:p-6 mb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div>
                <div className='flex sm:flex-row justify-center '>
                    {
                        currentCondition?.iconCode ?
                            <>
                                <div className='sm:hidden'>
                                    <img src={`https://meteo.gc.ca/weathericons/${currentCondition?.iconCode}.gif`} className='max-sm:translate-y-2 translate-x-2' width={60} height={51} alt={`${currentCondition?.condition}`} />
                                </div>
                                <div className='max-sm:hidden'>
                                    <img src={`https://meteo.gc.ca/weathericons/${currentCondition?.iconCode}.gif`} className='translate-y-1 translate-x-2' width={60} height={51} alt={`${currentCondition?.condition}`} />
                                </div>
                            </>
                            : null
                    }
                    <p className="text-xl md:text-5xl font-semibold ml-2 md:ml-5 text-gray-900 dark:text-slate-300">{currentCondition?.temperature ? Math.floor(currentCondition?.temperature) : null}</p>
                    {/* <p className='pl-2 flex gap-1'><a href='/'>°C</a> | <a href='/' className='text-gray-500'>°F</a></p> */}
                    <p className='pl-1 flex gap-1 text-slate-600 dark:text-gray-400'>°C</p>
                    <div className='text-xs pl-4 whitespace-nowrap'>
                        <p className='font-normal text-slate-600 dark:text-gray-400'><span className='max-sm:dark:font-medium'>{t('common:dewPoint')}:</span> {currentCondition?.dewpoint}°C </p>
                        <p className='font-normal text-slate-600 dark:text-gray-400'><span className='max-sm:dark:font-medium'>{t('common:humidity')}:</span> {currentCondition?.relativeHumidity}%</p>
                        {
                            currentCondition?.wind ?
                                <p className='font-normal text-slate-600 dark:text-gray-400'><span className='max-sm:dark:font-medium'>{t('common:wind')}:</span> {
                                    currentCondition?.wind.direction + ' ' + currentCondition?.wind.speed
                                }
                                    {
                                        currentCondition?.wind.gust === '' ? '' : ' gust ' + currentCondition?.wind.gust
                                    } km/h</p>
                                :
                                null
                        }
                        {
                            currentCondition?.windChill !== undefined ? <p className='font-normal text-slate-600 dark:text-gray-400'><span className='max-sm:dark:font-medium'>{t('common:windChill')}:</span> {currentCondition?.windChill}</p> : null
                        }

                    </div>
                </div>
            </div>
            <div>
                <div className='text-right'>
                    <p className='text-sm md:text-lg max-sm:font-medium text-slate-600 dark:text-gray-400'>{t('common:weather')}</p>
                    <p className='text-xs md:text-sm dark:font-normal text-slate-600 dark:text-gray-400'>{new Date(currentCondition?.dateTime[1].year, currentCondition?.dateTime[1].month - 1, currentCondition?.dateTime[1].day, currentCondition?.dateTime[1].hour, currentCondition?.dateTime[1].minute).toLocaleDateString(i18n.language === 'fr' ? 'fr-CA' : undefined, { weekday: 'short', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' })}</p>
                    <p className='text-xs md:text-sm dark:font-normal text-slate-600 dark:text-gray-400'>{currentCondition?.condition}</p>
                </div>
            </div>
            <div className='col-span-2 columns-2 align-middle'>
                <div className='pt-2'><p className='text-xs font-normal text-slate-600 dark:text-gray-400'><span className='max-sm:dark:font-medium'>{t('common:observedAt')}:</span> {currentCondition?.station}</p></div>

                <div className='pt-2 max-sm:pt-4 text-right'><p className='flex justify-end text-xs font-normal text-slate-600 dark:text-gray-400'>
                    <svg className="w-5 h-5 text-slate-700 hover:text-slate-800 dark:text-slate-300" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 100 100">
                        <path d="M415 910c-62-63-77-82-67-92s25 0 72 47l59 59 3-170c3-142 5-169 18-169s15 27 18 169l3 170 59-59c47-47 62-57 72-47s-5 29-67 92c-44 44-82 80-85 80s-41-36-85-80zM484 427c-3-8-4-43-2-78 2-49 7-64 18-64 12 0 15 15 15 74 0 51-4 76-12 78-7 3-15-2-19-10zM200 307c0-16 91-107 108-107 24 0 11 27-36 73-48 47-72 58-72 34zM727 272c-47-48-58-72-34-72 16 0 107 91 107 108 0 24-27 11-73-36zM412 194c-56-28-88-65-103-119l-10-34-147-3C29 35 5 33 5 20S67 5 500 5s495 2 495 15-24 15-147 18l-147 3-12 37c-19 58-45 88-101 116-66 33-110 33-176 0zm176-41c31-23 58-60 67-90l6-23H500c-144 0-161 2-156 16 3 9 6 19 6 24 0 17 55 73 85 86 40 19 120 12 153-13z"
                            transform="matrix(.1 0 0 -.1 0 100)"></path>
                    </svg>
                    {new Date(sunriseSunset?.dateTime[1].year, sunriseSunset?.dateTime[1].month - 1, sunriseSunset?.dateTime[1].day, sunriseSunset?.dateTime[1].hour, sunriseSunset?.dateTime[1].minute).toLocaleTimeString(i18n.language === 'fr' ? 'fr-CA' : undefined, { hour: 'numeric', minute: 'numeric', hour12: false, timeZoneName: 'short' })}
                    <svg className="w-5 h-5 text-slate-700 hover:text-slate-800 dark:text-slate-300" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 100 100">
                        <path
                            d="M487 994c-4-4-7-82-7-173V656l-60 59c-47 47-62 57-72 47s5-30 70-95l82-82 82 82c65 65 80 85 70 95s-25 0-72-47l-59-59-3 169c-3 158-9 191-31 169zM484 427c-3-8-4-43-2-78 2-49 7-64 18-64 12 0 15 15 15 74 0 51-4 76-12 78-7 3-15-2-19-10zM200 307c0-16 91-107 108-107 24 0 11 27-36 73-48 47-72 58-72 34zM727 272c-47-48-58-72-34-72 16 0 107 91 107 108 0 24-27 11-73-36zM412 194c-56-28-88-65-103-119l-10-34-147-3C29 35 5 33 5 20S67 5 500 5s495 2 495 15-24 15-147 18l-147 3-12 37c-19 58-45 88-101 116-66 33-110 33-176 0zm176-41c31-23 58-60 67-90l6-23H500c-144 0-161 2-156 16 3 9 6 19 6 24 0 17 55 73 85 86 40 19 120 12 153-13z"
                            transform="matrix(.1 0 0 -.1 0 100)"
                        ></path>
                    </svg>
                    {new Date(sunriseSunset?.dateTime[3].year, sunriseSunset?.dateTime[3].month - 1, sunriseSunset?.dateTime[3].day, sunriseSunset?.dateTime[3].hour, sunriseSunset?.dateTime[3].minute).toLocaleTimeString(i18n.language === 'fr' ? 'fr-CA' : undefined, { hour: 'numeric', minute: 'numeric', hour12: false, timeZoneName: 'short' })}
                </p></div>
            </div>
        </div>
    )
}

export default WeatherCurrentCondition