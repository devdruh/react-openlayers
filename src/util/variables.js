const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
};

const layerSourceInfo = [
    { name: 'Air Surface Temperature', layer: 'GDPS.ETA_TT', url: 'https://geo.weather.gc.ca/geomet' },
    { name: 'RAQDPS - FireWork', layer: 'RAQDPS-FW.EATM_PM2.5-DIFF', url: 'https://geo.weather.gc.ca/geomet' },
    { name: 'Air Quality Health Index', layer: '', url: 'https://api.weather.gc.ca/collections/aqhi-forecasts-realtime/items?f=json' }
];

export { dateOptions, layerSourceInfo }