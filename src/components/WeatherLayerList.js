import React, { useCallback, useEffect, useState } from 'react'
import { layerSourceInfo } from '../util/variables';

const WeatherLayerList = ({ layerGroupList }) => {

    const [layerList, setLayerList] = useState([]);

    const handleLayerVisible = (e) => {
        const items = layerGroupList.array_;
        const findLayer = items.find((data) => {
            var layerId = data.get('id');
            return layerId === e.target.id;
        });
        
        findLayer.setVisible(e.target.checked);

        setLayerList(layerList.map(list => {
            if (list.id === e.target.id) {
                return { ...list, visible: e.target.checked }
            } else {
                return list;
            }
        }));
    }

    const layerListFunction = useCallback(() => {

        if (layerGroupList.array_) {
                const items = layerGroupList.array_;
                for (let index = 0; index < items.length; index++) {
                    const element = items[index];
                    const layerId = element.get('id');
                    const isVisible = element.getVisible();
                    const layerSource = element.getSource();
                    const layers = layerSource.getParams().LAYERS;
                    const layerOpacity = element.getOpacity();
                    const findLayer = layerSourceInfo.find(({ layer }) => layer === layers);

                    setLayerList((data) => {

                        const filterData = data.filter(lyr => lyr.id !== layerId);
                        return [
                            {
                                id: layerId,
                                visible: isVisible,
                                layer: layers,
                                name: findLayer.name,
                                opacity: layerOpacity
                            }, ...filterData
                        ]
                    });
                }
            }

    }, [layerGroupList]);


    useEffect(() => {

        layerListFunction();

    }, [layerListFunction]);

    return (
        <>
            <ul className="text-xs space-y-1 font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white list-inside py-1 last:rounded-b-lg">
            {
                layerList.length > 0 ? 
                
                    layerList.map((item) => (
                        <li className="w-full border-b last:border-b-0" key={item.id}>
                            <div className="flex items-center ps-3">
                                <input id={item.id} type="checkbox" value={item.layer} className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer" onChange={handleLayerVisible} checked={item.visible} />
                                <label htmlFor="vue-checkbox" className="w-full py-1 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.name}{ item.visible}</label>
                            </div>
                            <ul className="ps-5 space-y-1 list-inside list-none">
                                <li>
                                    <div className="flex items-center ps-5 pr-2 gap-1">
                                        <label htmlFor="vue-checkbox" className=" w-1/4 py-1 ms-2 text-xs font-thin text-gray-900 dark:text-gray-300">Opacity</label>
                                        <input className=" h-1 w-3/4 rounded-lg range-sm dark:bg-gray-700" defaultValue={item.opacity} type="range" min="0" max="1" step="0.01"/>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    ))
                :
                null
                }
            </ul>
        </>
    )
}
export default WeatherLayerList