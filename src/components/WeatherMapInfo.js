import React from 'react'

const WeatherMapInfo = ({ radarTime }) => {
    
    return (
        <div className='px-2 flex items-center py-3 content-evenly'>
            <div className='text-sm md:text-base px-3'>
                <p><span className='font-semibold'>Local Time: </span> {radarTime.local}</p>
            </div>
            <div className='text-sm md:text-base px-3'>
                <p><span className='font-semibold'>UTC: </span> {radarTime.iso}</p>
            </div>
        </div>
    )
}

export default WeatherMapInfo