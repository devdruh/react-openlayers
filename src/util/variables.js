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

var aqhiChartOptions = {
    chart: {
        height: "100%",
        maxWidth: "100%",
        type: "line",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
        y: {
            formatter: function (value) { 
                return value
            },
            title: {
                formatter: (seriesName) => seriesName + ":",
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 4,
        curve: 'smooth',
    },
    grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
            top: -26
        },
    },
    series: [
        {
            name: "AQHI",
            data: [],
            // color: '#0ea5e9'
        }
    ],
    legend: {
        show: false
    },
    xaxis: {
        categories: [],
        labels: {
            show: false,
            style: {
                fontFamily: "Inter, sans-serif",
                cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
            },
        },
        title: {
            style: {
                fontWeight: 400
            }
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
}

export { dateOptions, layerSourceInfo, aqhiChartOptions }