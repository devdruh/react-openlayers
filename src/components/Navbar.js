import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDarkTheme } from './DarkThemeContext';

const Navbar = () => {

    const { i18n } = useTranslation();
    const [lang, setLang] = useState();
    const [isDarkTheme, setIsDartkTheme] = useState(false);

    const { switchDarkTheme } = useDarkTheme();

    const handleChangeLanguage = (e) => {
        const newLang = e.target.innerText === 'English' ? 'en' : 'fr';
        i18n.changeLanguage(newLang);
        setLang(newLang);
    };

    const handleChangeTheme = (e) => {
        setIsDartkTheme(!isDarkTheme);
        document.documentElement.classList.toggle('dark');
        if (localStorage.getItem('color-theme')) {
            
            const forecastWeatherChart = document.getElementById('forecast-weather-highchart');
            if (localStorage.getItem('color-theme') === 'light') {
                localStorage.setItem('color-theme', 'dark');
                forecastWeatherChart.firstChild.classList.add('highcharts-dark');
            } else {
                localStorage.setItem('color-theme', 'light');
                forecastWeatherChart.firstChild.classList.remove('highcharts-dark');
                forecastWeatherChart.firstChild.classList.add('highcharts-light');
            }
        }
        switchDarkTheme(!isDarkTheme);
    }

    useEffect(() => {
        setLang(i18n.language)

        const forecastWeatherChart = document.getElementById('forecast-weather-highchart');
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            if (forecastWeatherChart !== null) {
                forecastWeatherChart.firstChild.classList.add('highcharts-dark');
            }
            setIsDartkTheme(true);
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            if (forecastWeatherChart !== null) {
                forecastWeatherChart.firstChild.classList.add('highcharts-light');
            }
            setIsDartkTheme(false);
        }
    }, [i18n]);

    return (
        <>
            <nav className="bg-gradient-to-tr fixed top-0 start-0 w-full from-gray-50 to-sky-200 border-gray-200 dark:bg-gray-900 dark:bg-gradient-to-br dark:from-gray-950 dark:to-gray-800 z-20 shadow-md dark:shadow-sky-950">
                <div className="flex flex-wrap justify-between items-center mx-auto p-4">
                    <a href="/" className="flex items-center">
                        {/* <img src='https://via.placeholder.com/120/120&text=LOGO' className='h-8 mr-3 rounded-full' alt='Logo here' /> */}
                        <svg className="w-6 h-6 text-slate-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"/>
                        </svg>
                        <span className="ml-2 text-slate-900 self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-300">LOGO</span>
                    </a>
                    <div className="flex items-center md:order-2 rtl:space-x-reverse">
                        <button type="button" className="inline-flex items-center font-medium justify-center px-2 md:px-3 py-2 text-sm text-gray-800 dark:text-gray-300 rounded-lg cursor-pointer dark:hover:text-gray-100" onClick={handleChangeLanguage}>
                            {lang === 'en' ? 'Français' : 'English'}
                        </button>
                        <button type="button" className="text-slate-600 hover:scale-110 hover:ease-in hover:duration-300 hover:bg-slate-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:hover:text-white dark:focus:ring-slate-800 dark:hover:bg-slate-700" onClick={handleChangeTheme}>
                            {
                                isDarkTheme ? 
                                    <svg id='light-theme' className="w-4 h-4 text-slate-700 hover:text-slate-800 dark:text-gray-300 dark:hover:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"/>
                                    </svg>
                                    :
                                    <svg id='dark-theme' className="w-4 h-4 text-slate-700 hover:text-slate-800 dark:text-gray-300 dark:hover:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"/>
                                    </svg>
                            }
                            <span className="sr-only">Light/Dark theme</span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

// https://eccc-msc.github.io/open-data/msc-animet/readme_en/ Radar Precipitation rate for rain