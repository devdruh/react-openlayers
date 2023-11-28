import React from 'react'
import WeatherMapDisplay from './WeatherMapDisplay'
import WeatherForecastChart from './WeatherForecastChart'

const CurrentForecasted = () => {
    return (
        <div className='pt-3 px-3'>
            <div className='sm:grid sm:grid-cols-2 sm:grid-rows-1 gap-3'>
                <WeatherForecastChart/>
                <WeatherMapDisplay/>
            </div>
        </div>
    )
}

export default CurrentForecasted