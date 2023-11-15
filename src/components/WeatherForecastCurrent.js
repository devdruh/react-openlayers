import React from 'react'
import WeatherMapDisplay from './WeatherMapDisplay'
import WeatherForecastChart from './WeatherForecastChart'

const CurrentForecasted = () => {
    return (
        <div className='pt-3 px-3'>
            <div className='columns-2 gap-3'>
                <WeatherForecastChart/>
                <WeatherMapDisplay/>
            </div>
        </div>
    )
}

export default CurrentForecasted