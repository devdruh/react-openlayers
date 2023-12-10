import React, { useCallback, useEffect, useState } from 'react'
import { Accordion } from 'flowbite-react';
import { layerSourceInfo } from '../util/variables';

const WeatherLayerLegend = ({ layerLegendList, map }) => {

    const [layerLegendUrl, setLayerLegendUrl] = useState([]);

    const getLayerLegend = useCallback(() => {

        const mapResolution = map.getView().getResolution();

        if (layerLegendList.array_.length > 0) {

            const layerList = layerLegendList.array_;

            for (let index = 0; index < layerList.length; index++) {
                const element = layerList[index];
                const layerId = element.get('id');
                const isVisible = element.getVisible();
                const layerSource = element.getSource();
                const layers = layerSource.getParams().LAYERS;
                const findLayer = layerSourceInfo.find(({ layer }) => layer === layers);
                const findLayerUrl = layerSource.getLegendUrl(mapResolution, { "SLD_VERSION": '1.1.0' });

                setLayerLegendUrl((data) => {
                    const filterData = data.filter(lyr => lyr.id !== layerId);
                    return [
                        {
                            id: layerId,
                            visible: isVisible,
                            title: findLayer.name,
                            url: findLayerUrl,
                        }, ...filterData
                    ]
                });
            }
        }

    }, [layerLegendList.array_, map]);

    useEffect(() => {

        getLayerLegend();

    }, [getLayerLegend]);

    return (
        <>
            {
                layerLegendUrl && layerLegendUrl?.map((data) => {

                    return data.visible ?
                        <Accordion collapseAll className="border-none rounded-none shadow-lg shadow-blue-400/50 dark:shadow-lg dark:shadow-blue-800/80" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400" key={data.id}>
                            <Accordion.Panel key={data.id}>
                                <Accordion.Title className="py-1 px-3 focus:ring-0 focus:ring-gray-700 border-gray-200 text-sm hover:rounded-none bg-slate-100 hover:bg-slate-300 text-gray-800 border-b border-b-sky-200 dark:border-slate-400 first:rounded-b-none first:rounded-t-none dark:bg-gray-800">{data.title}</Accordion.Title>
                                <Accordion.Content className="py-1 px-3 last:rounded-b-lg dark:rounded-none transition ease-in delay-1000" id={`accordion-legend-${data.id}`}>
                                    <img className="h-auto max-w-xs" src={data.url} alt={`${data.title} legend`} />
                                </Accordion.Content>
                            </Accordion.Panel>
                        </Accordion>
                        : ''
                })
            }
        </>
    )
}

export default WeatherLayerLegend