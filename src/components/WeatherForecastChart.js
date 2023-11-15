import React from 'react'
import "flowbite";

const DisplayAlert = () => {
    return (
        <>
            <div id="advisory-alert" className="p-4 mb-4 border border-sky-300 rounded-lg bg-slate-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 mr-2 fill-sky-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium">Weather Advisory</h3>
                </div>
                <div className="mt-2 mb-4 text-sm">
                    More info about this advisory goes here.
                </div>
                <div className="flex">
                    <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="-ml-0.5 mr-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                    </svg>
                    View more
                    </button>
                    <button type="button" className="text-sky-800 bg-transparent border border-sky-700 from-orange-400 to-pink-500 hover:border-yellow-500 hover:bg-gradient-to-bl hover:text-white focus:ring-3 focus:outline-none focus:ring-orange-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" data-dismiss-target="#advisory-alert" aria-label="Close">
                    Dismiss
                    </button>
                </div>
            </div>
        </>
    )
}

const DisplayChart = () => {
    return (
        <div className='grid grid-cols-1'>
            <div className='p-10 bg-slate-100 text-center'>Today's Weather Forecast (Meteogram)</div>
            <div className='p-5 bg-slate-200 text-center'>5-Day Weather Forecast</div>
        </div>
    )
}

const DisplayForecastChart = () => {
    return (
        <div className='container'>
            <DisplayAlert />
            <DisplayChart />
        </div>
    )
}

export default DisplayForecastChart