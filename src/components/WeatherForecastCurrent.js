import React, { Suspense, lazy } from 'react'
import WeatherForecastChart from './WeatherForecastChart'
import { delaySkeleton } from '../util/utilities'
import { LoadingMapDisplay } from '../util/skeleton'

const WeatherMapDisplay = lazy(() => delaySkeleton(import('./WeatherMapDisplay')))

const CurrentForecasted = () => {
    return (
        <div className='pt-3 px-3'>
            <div className='sm:grid md:grid-cols-2 sm:grid-rows-1 gap-3'>
                <WeatherForecastChart />
                <Suspense fallback={<LoadingMapDisplay />}>
                    <WeatherMapDisplay />
                </Suspense>
            </div>
        </div>
    )
}

export default CurrentForecasted