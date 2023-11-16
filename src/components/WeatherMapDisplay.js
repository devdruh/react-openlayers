import { useRef, useEffect, useState, useCallback, useId } from "react";
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import Overlay from 'ol/Overlay.js';
import LayerGroup from 'ol/layer/Group.js';
import { toStringXY } from 'ol/coordinate';
import { fromLonLat, toLonLat } from 'ol/proj';
import { dateOptions, layerSourceInfo } from "../util/variables";
import { Accordion } from 'flowbite-react';
import WeatherMapInfo from "./WeatherMapInfo";
import WeatherLayerList from "./WeatherLayerList";

const WeatherMapDisplay = () => {

    const map = useRef(null);
    const mapRef = useRef(null);
    const popupDiv = useRef(null);
    const airTempLayerId = useId();
    const airQualityLayerId = useId();
    const [isLoading, setIsLoading] = useState(true);
    const [airSurfaceData, setAirSurfaceData] = useState({ coordinate: "", value: "" });
    const [radarTime, setRadarTime] = useState({ start: null, end: null, current: null, iso: null, local: null });
    const [isClickPlayBtn, setIsClickPlayBtn] = useState(false);
    const [isClickLegendBtn, setIsClickLegendBtn] = useState(false);
    const [isClickLayerBtn, setIsClickLayerBtn] = useState(false);
    const [isNewTimeVal, setIsNewTimeVal] = useState();
    const [legendMapUrl, setLegendMapUrl] = useState([]);
    const [layerGroupList, setLayerGroupList] = useState([]);
    
    const closePopup = (e) => {
        e.target.parentElement.setAttribute('class', 'invisible');
        return false;
    }

    const handlePlayBtn = () => {
        setIsClickPlayBtn(!isClickPlayBtn);
    }

    const handleLegendBtn = (e) => {
        setIsClickLegendBtn(!isClickLegendBtn);
    }

    const handleLayerBtn = (e) => {
        setIsClickLayerBtn(!isClickLayerBtn);
    }
   
    const initMap = useCallback(() => {

        if (mapRef.current) {

            const overlay = new Overlay({
                element: popupDiv.current,
                autoPan: true
            });

            const basemapLayer = new TileLayer({
                source: new OSM()
            })
            
            const airSurfaceTempWMS = new TileWMS({
                url: 'https://geo.weather.gc.ca/geomet',
                params: { 'LAYERS': layerSourceInfo[0].layer },
                transition: 0
            });

            const raqdpsWMS = new TileWMS({
                url: 'https://geo.weather.gc.ca/geomet',
                params: { 'LAYERS': layerSourceInfo[1].layer, 't': new Date(Math.round(Date.now())).toISOString().split('.')[0] + "Z" },
                
            });

            const airSurfaceTempLayer = new TileLayer({
                id: airTempLayerId,
                title: layerSourceInfo[0].name,
                source: airSurfaceTempWMS,
                opacity: 0.4,
                zIndex: 0
            });

            const raqdpsLayer = new TileLayer({
                id: airQualityLayerId,
                title: layerSourceInfo[1].name,
                source: raqdpsWMS,
                // opacity: 0.4,
                zIndex: 1
            })

            const view = new View({
                center: fromLonLat([-97, 57]),
                zoom: 3,
                maxZoom: 7
            });

            const layerGroup = new LayerGroup({
                layers: [airSurfaceTempLayer, raqdpsLayer]
            });

            map.current = new Map({
                layers: [basemapLayer, layerGroup],
                view: view,
                overlays: [overlay]
            });

            map.current.setTarget(mapRef.current)

            map?.current.on('singleclick', function (event) {

                const coordinate = event.coordinate;
                const toStringCoordinate = toStringXY(toLonLat(coordinate), 4)
                const viewResolution = map.current.getView().getResolution();
                // const wms_source = map.current.getLayers().item(1).getSource();
                const wms_source = layerGroup.getLayers().item(0).getSource();
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
                                setAirSurfaceData(airSurfaceData => {
                                    return { ...airSurfaceData, coordinate: toStringCoordinate, value: temperature }
                                });
                            }
                            setIsLoading(false);
                        });
                }
            });

            const updateLegend = (resolution) => {

                const allLayers = map.current.getAllLayers();
                const raqdpsWMSParams = raqdpsWMS.getParams();
                const airQualityUrl = raqdpsWMS.getLegendUrl(resolution, { "SLD_VERSION": '1.1.0' });
                const airSurfaceTempWMSParams = airSurfaceTempWMS.getParams();
                const airTempUrl = airSurfaceTempWMS.getLegendUrl(resolution, { "SLD_VERSION": '1.1.0' });
                
                for (let index = 0; index < allLayers.length; index++) {
                    const element = allLayers[index].getSource();
                    if (element.params_) {
                        const layerName = element.params_.LAYERS;
                        setLegendMapUrl(data => {
                            if (raqdpsWMSParams.LAYERS === layerName) {
                                return [{
                                    id: Math.floor(Math.random() * 100),
                                    title: raqdpsLayer.get('title'),
                                    url: airQualityUrl
                                }, ...data]
                            }

                            if (airSurfaceTempWMSParams.LAYERS === layerName) { 
                                return [{
                                    id: Math.floor(Math.random() * 100),
                                    title: airSurfaceTempLayer.get('title'),
                                    url: airTempUrl
                                }, ...data]
                            }
                        });
                    }
                }
            }
            const initLegend = map?.current.getView().getResolution();
            updateLegend(initLegend);
            setLayerGroupList(layerGroup.getLayers());
        }

    }, [airQualityLayerId, airTempLayerId]);

    useEffect(() => {

        initMap();

        const getRadarStartEndTime = async () => {

            try {
                const response = await fetch('https://geo.weather.gc.ca/geomet/?lang=en&service=WMS&request=GetCapabilities&version=1.3.0&LAYERS=RAQDPS-FW.EATM_PM2.5-DIFF&t=' + new Date().getTime());

                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                } else {
                    const result = await response.text();
                    const xmlDoc = new DOMParser().parseFromString(result, "text/xml");
                    const [startTime, endTime] = xmlDoc.getElementsByTagName('Dimension')[0].innerHTML.split('/')
                    const defaultTime = xmlDoc.getElementsByTagName('Dimension')[0].getAttribute('default')
                    const utcTime = new Date(defaultTime);
                    const localTime = utcTime.toLocaleString(navigator.local, dateOptions);
                    const isoTime = utcTime.toISOString().substring(0, 16) + "Z";

                    if (isNewTimeVal !== localTime) {
                        setRadarTime((data) => ({
                            ...data,
                            start: startTime,
                            end: endTime,
                            current: defaultTime,
                            local: localTime,
                            iso: isoTime
                        }));
                    }
                    setIsNewTimeVal(localTime);
                }

            } catch (error) {
                console.log(error)
            }
        };

        getRadarStartEndTime();


        var getSmokeLayer = map.current.getAllLayers()[2];
        var _radarInterval;
        if (isClickPlayBtn) {

            _radarInterval = setInterval(() => {
                setRadarTime(radarTime => {
                    var radarCurrTime = new Date(radarTime.current);
                        radarCurrTime.setUTCMinutes(radarCurrTime.getUTCMinutes() + 60);
                    var localTime = radarCurrTime.toLocaleString(navigator.local, dateOptions);
                    var newRadarCurrTime = new Date(radarCurrTime).toISOString().split('.')[0] + 'Z';
                        getSmokeLayer.getSource().updateParams({ 'TIME': newRadarCurrTime });
                    var isoTime = radarCurrTime.toISOString().substring(0, 16) + "Z";

                    if (isoTime >= radarTime.end) {
                        return {
                            ...radarTime,
                            current: radarTime.start,
                            local: localTime,
                            iso: isoTime
                        }
                    }
                    return {
                        ...radarTime,
                        current: newRadarCurrTime,
                        local: localTime,
                        iso: isoTime
                    }
                });
            }, 1000 / 1.0);

        }

        return () => {
            if (!!mapRef) {
                mapRef.current = null;
            }
            clearInterval(_radarInterval)
        };
                
    }, [initMap, isClickPlayBtn, isNewTimeVal]);
    
    return (
        <>
            <div className="mapRef" id='mapRef' ref={mapRef}></div>
            <div className="absolute right-5 top-[85px] flex flex-row-reverse z-[1] justify-end gap-2">
                <div className="flex">
                    {
                        isClickLegendBtn && isClickLegendBtn ? 
                            <button type="button" className="h-7 bg-slate-200 hover:bg-slate-200 focus:ring-2 focus:outline-none focus:ring-sky-400 font-sm rounded text-sm p-1 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 hover:border-sky-400 ease-in duration-300 hover:ease-in hover:scale-125 transition bg-gradient-to-br from-emerald-500 to-sky-800 hover:bg-gradient-to-b hover:text-slate-100 hover:focus:scale-110" onClick={handleLegendBtn} title="Legend">
                                <svg className="w-5 h-5 text-gray-200 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"/>
                                </svg>
                                <span className="sr-only">Layers Legend</span>
                            </button>
                            : 
                            <button type="button" className="h-7 bg-slate-200 hover:bg-slate-50 ring-1 ring-sky-300 hover:text-slate-200 hover:ring-sky-500 focus:ring-2 focus:outline-none focus:ring-sky-300 font-sm rounded text-sm p-1 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 hover:border-sky-400 ease-in duration-300 hover:ease-in hover:scale-110 transition" onClick={handleLegendBtn} title="Legend">
                                <svg className="w-5 h-5 text-slate-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"/>
                                </svg>
                                <span className="sr-only">Layers Legend</span>
                            </button>
                    }
                </div>
                {
                    isClickLegendBtn && isClickLegendBtn ? 
                        <div className=" bg-white w-52 transition duration-1000 ease-in">
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
                        </div>  : ""
                }
            </div>
            <div className="absolute right-5 top-[120px] flex flex-row-reverse z-[2] justify-end gap-2">
                <div className="flex">
                    {
                        isClickLayerBtn && isClickLayerBtn ? 
                            <button type="button" className="h-7 bg-slate-200 hover:bg-slate-200 focus:ring-2 focus:outline-none focus:ring-sky-400 font-sm rounded text-sm p-1 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 hover:border-sky-400 ease-in duration-300 hover:ease-in hover:scale-125 transition bg-gradient-to-br from-emerald-500 to-indigo-800 hover:bg-gradient-to-b hover:text-slate-100 hover:focus:scale-110" onClick={handleLayerBtn} title="Layer">
                                <svg className="w-5 h-5 text-gray-200 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 9.376v.786l8 3.925 8-3.925v-.786M1.994 14.191v.786l8 3.925 8-3.925v-.786M10 1.422 2 5.347l8 3.925 8-3.925-8-3.925Z"/>
                                </svg>
                                <span className="sr-only">Layers Legend</span>
                            </button>
                            : 
                            <button type="button" className="h-7 bg-slate-200 hover:bg-slate-50 ring-1 ring-sky-300 hover:text-slate-200 hover:ring-sky-500 focus:ring-2 focus:outline-none focus:ring-sky-300 font-sm rounded text-sm p-1 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 hover:border-sky-400 ease-in duration-300 hover:ease-in hover:scale-110 transition" onClick={handleLayerBtn} title="Layer">
                                <svg className="w-5 h-5 text-slate-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 9.376v.786l8 3.925 8-3.925v-.786M1.994 14.191v.786l8 3.925 8-3.925v-.786M10 1.422 2 5.347l8 3.925 8-3.925-8-3.925Z"/>
                                </svg>
                                <span className="sr-only">Layers</span>
                            </button>
                    }
                </div>
                <div className="flex justify-end">
                    {
                        isClickLayerBtn && isClickLayerBtn ?
                            <div className=" bg-white w-52 transition duration-1000 ease-in shadow-lg shadow-blue-400/50 dark:shadow-lg last:rounded-b-lg">
                                <WeatherLayerList layerGroupList={layerGroupList} />
                            </div>
                            :
                            null
                    }
                </div>
            </div>
            {isLoading ?
                <div ref={popupDiv}>
                    <div className="text-center">
                        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
                :
                <div ref={popupDiv}>
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
                </div>
            }
            <div className="flex flex-row bg-slate-300">
                <div className=" flex-none px-3 items-center ">
                    <div role="group" aria-label="Animation controls" className="py-3">
                        {
                            !isClickPlayBtn ?
                            <>
                                <button type="button" className="px-3 py-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80" onClick={handlePlayBtn}>
                                    <svg className="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1.984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L2.506 1.139A1 1 0 0 0 1 1.984Z" />
                                    </svg>
                                    <span className="sr-only">Play</span>
                                </button>
                            </>
                            :
                            <>  
                                <button type="button" className="px-3 py-2 text-white bg-gradient-to-br from-orange-400 to-pink-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80" onClick={handlePlayBtn}>
                                    <svg className="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                                        <path fillRule="evenodd" d="M0 .8C0 .358.32 0 .714 0h1.429c.394 0 .714.358.714.8v14.4c0 .442-.32.8-.714.8H.714a.678.678 0 0 1-.505-.234A.851.851 0 0 1 0 15.2V.8Zm7.143 0c0-.442.32-.8.714-.8h1.429c.19 0 .37.084.505.234.134.15.209.354.209.566v14.4c0 .442-.32.8-.714.8H7.857c-.394 0-.714-.358-.714-.8V.8Z" clipRule="evenodd" />
                                    </svg>
                                    <span className="sr-only">Pause</span>
                                </button>
                                <span id="info"></span>
                            </>
                        }
                    </div>
                </div>
                <div className=" flex-auto">
                    <WeatherMapInfo radarTime={radarTime} isClickPlayBtn={isClickPlayBtn} />
                </div>
            </div>
        </>
    )
}

export default WeatherMapDisplay


