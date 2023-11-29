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
    { name: 'Air Quality Health Index', layer: '', url: 'https://api.weather.gc.ca/collections/aqhi-forecasts-realtime/items?f=json' },
    { name: 'Climate Hourly', layer: '', url: 'https://api.weather.gc.ca/collections/climate-hourly/items' },
    { name: 'Weather Condition', layer: 'CURRENT_CONDITIONS', url: 'https://geo.weather.gc.ca/geomet' }
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

const weatherForecastChartOptions = {

    chart: {
        events: {
            render: function (event) { 

                var _data = event.target.series[0];

                if (_data.customMarkers) {
                    _data.customMarkers.forEach(function(marker) {
                        marker.destroy();
                    });
                }

                _data.customMarkers = [];
                
                if (_data.hasOwnProperty('data')) {

                    setTimeout(() => {

                        for (let index = 0; index < _data.data.length; index++) {
                            const element = _data.data[index];

                            if (index % 2 === 0) {
                                const markerImage = 'https://meteo.gc.ca/weathericons/' + element.symbolCode + '.gif';
                                const markerWidth = 35;
                                const markerHeight = 30;
                                const markerXOffset = event.target.plotLeft - 8;
                                const markerYOffset = event.target.plotTop - 40;
                                const xPos = element.plotX + markerXOffset;
                                const yPos = element.plotY + markerYOffset;

                                const marker = event.target.renderer.image(markerImage, xPos, yPos, markerWidth, markerHeight)
                                    .attr({
                                        zIndex: 5
                                    })
                                    .add();

                                _data.customMarkers.push(marker);

                            }

                        }

                    }, 1000);
                    
                }
            }
        },
    },

    time: {
        useUTC: false,
    },

    title: {
        text: '',
        style: {
            fontWeight: '500',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        }
    },

    credits: {
        text: 'Data from <a href="https://weather.gc.ca/">Canada Weather</a>',
        href: 'https://weather.gc.ca/',
        // position: {
        //     x: -40
        // }
    },


    subtitle: {
        text: 'As of '
    },

    xAxis: [
        { // Bottom X axis
            type: 'datetime',
            tickInterval: 2 * 36e5, // two hours
            minorTickInterval: 36e5, // one hour
            tickLength: 0,
            gridLineWidth: 1,
            gridLineColor: 'rgba(128, 128, 128, 0.1)',
            startOnTick: false,
            endOnTick: false,
            minPadding: 0,
            maxPadding: 0,
            offset: 30,
            showLastLabel: true,
            labels: {
                format: '{value:%H}'
            },
            crosshair: true
        },
        { // Top X axis
            linkedTo: 0,
            type: 'datetime',
            tickInterval: 24 * 3600 * 1000,
            labels: {
                format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
                align: 'left',
                x: 3,
                y: 8
            },
            opposite: true,
            tickLength: 20,
            gridLineWidth: 1
        }
    ],

    yAxis: [
        { // temperature axis
            title: {
                text: null
            },
            labels: {
                format: '{value}°',
                style: {
                    fontSize: '10px'
                },
                x: -3
            },
            plotLines: [{ // zero plane
                value: 0,
                color: '#BBBBBB',
                width: 1,
                zIndex: 2
            }],
            maxPadding: 0.3,
            minRange: 8,
            tickInterval: 1,
            gridLineColor: 'rgba(128, 128, 128, 0.1)'
        }
    ],

    legend: {
        enabled: false
    },

    plotOptions: {
        series: {
            pointPlacement: 'between'
        }
    },

    tooltip: {
        shared: true,
        useHTML: true,
        headerFormat:
            '<small>{point.x:%A, %b %e, %H:%M} - {point.point.to:%H:%M}</small><br>' +
            '<b>{point.point.symbolName}</b><br>'
    },

    series: [
        {
            name: 'Temperature',
            data: [],
            type: 'spline',
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true
                    },
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
                    '{series.name}: <b>{point.y}°C</b><br/>'
            },
            zIndex: 1,
            color: '#FF3333',
            negativeColor: '#48AFE8'
        },
    ]
}

export { dateOptions, layerSourceInfo, aqhiChartOptions, weatherForecastChartOptions }