import { useRef, useEffect, useState } from "react";
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import Overlay from 'ol/Overlay.js';
import { toStringXY } from 'ol/coordinate';
import { fromLonLat, toLonLat } from 'ol/proj';

const DisplayMap = () => {

    const mapDiv = useRef(null);
    const popupDiv = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [airSurfaceData, setAirSurfaceData] = useState({ coordinate: "", value: "" })

    const closePopup = (e) => {
        e.target.parentElement.setAttribute('class', 'invisible');
        return false;
    }

    useEffect(() => {

        if (mapDiv.current) {

            const overlay = new Overlay({
                element: popupDiv.current,
                autoPan: true
            });

            const basemapLayer = new TileLayer({
                source: new OSM()
            })
            
            const weatherWMS = new TileWMS({
                url: 'https://geo.weather.gc.ca/geomet',
                params: { 'LAYERS': 'GDPS.ETA_TT'},
                transition: 0
            });

            const weatherLayer = new TileLayer({
                source: weatherWMS,
                opacity: 0.4
            });

            const view = new View({
                center: fromLonLat([-97, 57]),
                zoom: 4,
                maxZoom: 7
            });

            const map = new Map({
                layers: [basemapLayer, weatherLayer],
                view: view,
                overlays: [overlay]
            });

            map.setTarget(mapDiv?.current)

            map.on('singleclick', function (event) {

                const coordinate = event.coordinate;
                const toStringCoordinate = toStringXY(toLonLat(coordinate), 4)
                const viewResolution = map.getView().getResolution();
                const wms_source = map.getLayers().item(1).getSource();
                const wms_url = wms_source.getFeatureInfoUrl(
                    coordinate,
                    viewResolution,
                    "EPSG:3857",
                    { INFO_FORMAT: "application/json" }
                );
                
                overlay.setPosition(coordinate);
                setIsLoading(true);

                if (wms_url) {
                    fetch(wms_url)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (json) {
                            const isObjNull = Object.keys(json).length;
                            if (isObjNull > 0) {
                                const temperature = json.features[0].properties.value;
                                setAirSurfaceData({
                                    ...airSurfaceData,
                                    coordinate: toStringCoordinate,
                                    value: temperature
                                })
                            }
                            setIsLoading(false);
                        });
                }
            });

            return () => {
                if (!!mapDiv) {
                    mapDiv.current = null;
                }
            };
        }
                
    },[airSurfaceData])
    
    return (
        <>
            <div id='map' ref={mapDiv}></div>
            <div ref={popupDiv}>
                {isLoading ?
                    <div className="text-center">
                        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    :
                    <div data-popover role="tooltip" className="ol-popup absolute rounded-lg bottom-3 min-w-max border border-solid border-slate-400 -left-12 transition-opacity duration-300 bg-white shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                        <span id="popup-closer" className="ol-popup-closer hover:cursor-pointer" onClick={closePopup}></span>
                        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-white">Air surface temperature</h3>
                        </div>
                        <div className="px-3 py-2">
                            <p className="text-sm">Value: <span className="font-semibold text-gray-900 dark:text-white">{Math.round(airSurfaceData.value)} °C </span></p>
                            <p className="text-sm">Coordinates (Lon/Lat): <span className="font-semibold text-gray-900 dark:text-white">{airSurfaceData.coordinate}</span></p>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default DisplayMap