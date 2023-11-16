const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
};

const layerSourceInfo = [
    { name: 'Air Surface Temperature', layer: 'GDPS.ETA_TT' },
    { name: 'RAQDPS - FireWork', layer: 'RAQDPS-FW.EATM_PM2.5-DIFF' }
];

export { dateOptions, layerSourceInfo }