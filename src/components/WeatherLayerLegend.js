import React from 'react'
import { Accordion } from 'flowbite-react';

const WeatherLayerLegend = ({legendMapUrl}) => {
    
    return (
        <Accordion collapseAll className="border-none rounded-none shadow-lg shadow-blue-400/50 dark:shadow-lg dark:shadow-blue-800/80" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
            {
                legendMapUrl && legendMapUrl?.map((data) => (
                    <Accordion.Panel key={data.id}>
                        <Accordion.Title className="py-1 px-3 focus:ring-0 focus:ring-gray-700 border-gray-200 text-sm hover:rounded-none bg-slate-100 hover:bg-slate-300 text-gray-800 border-b border-b-sky-200 first:rounded-b-none first:rounded-t-none">{ data.title}</Accordion.Title>
                        <Accordion.Content className="py-1 px-3 last:rounded-b-lg " id={`accordion-legend-${data.id}`}>
                            <img className="h-auto max-w-xs" src={data.url} alt="description"/>
                        </Accordion.Content>
                    </Accordion.Panel>
                ))
            }
        </Accordion>
    )
}

export default WeatherLayerLegend