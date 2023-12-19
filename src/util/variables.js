const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
};

const dateOptions_1 = {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
}

const layerSourceInfo = [
    { name: 'Air Surface Temperature', layer: 'GDPS.ETA_TT', url: 'https://geo.weather.gc.ca/geomet' },
    { name: 'RAQDPS - FireWork', layer: 'RAQDPS-FW.EATM_PM2.5-DIFF', url: 'https://geo.weather.gc.ca/geomet' },
    { name: 'Air Quality Health Index', layer: '', url: 'https://api.weather.gc.ca/collections/aqhi-forecasts-realtime/items?f=json' },
    { name: 'Climate Hourly', layer: '', url: 'https://api.weather.gc.ca/collections/climate-hourly/items' },
    { name: 'Weather Condition', layer: 'CURRENT_CONDITIONS', url: 'https://geo.weather.gc.ca/geomet' },
    { name: 'Weather Alerts', layer: 'ALERTS', url: 'https://geo.weather.gc.ca/geomet' }
];

var aqhiChartOptions = {
    chart: {
        height: 200,
        parentHeightOffset: 0,
        // maxWidth: "422px",
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
            top: -20,
            bottom: -20
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
            text: '',
            style: {
                fontWeight: 400,
                color: ''
            },
            offsetY: -25
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
        styledMode: true,
        marginRight: 20,
        borderRadius: 10,
        spacingBottom: 25,
        spacingTop: 20,
        className: 'rounded-lg',
        events: {

            redraw: function (event) {

                const _data = event.target.series;

                const node = event.target.renderer.box.children;
                for (let index = 0; index < node.length; index++) {
                    const element = node[index];
                    if (element.id === "weather-condition-container") {
                        element.remove();
                    }
                }

                const container = event.target.renderer.g(event.target.plotLeft, event.target.plotTop, event.target.plotWidth, event.target.plotHeight)
                .attr({
                    id: "weather-condition-container"
                }).attr({
                    zIndex: 5
                })
                .add();

                for (let index = 0; index < _data.length; index++) {
                    const element = _data[index];
                    if (element.points) {
                        
                        element.points.forEach((series, i) => {
                            
                            if (i % 2 === 0) {
                                const imageUrl = 'https://meteo.gc.ca/weathericons/' + series.symbolCode + '.gif';
                                const imageWidth = 35;
                                const imageHeight = 30;
                                const imageXOffset = event.target.plotLeft - 8;
                                const imageYOffset = event.target.plotTop - 40;
                                const xPos = series.plotX + imageXOffset;
                                const yPos = series.plotY + imageYOffset;

                                event.target.renderer.image(imageUrl, xPos, yPos, imageWidth, imageHeight)
                                    .attr({
                                        zIndex: 5
                                    })
                                    .add(container);
                            }
                        })
                    }
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
        },
        useHTML: true
    },

    credits: {
        text: 'Source: Canada Weather',
        href: 'https://weather.gc.ca/',
        position: {
            x: -20,
            y: -10
        }
    },


    subtitle: {
        text: '',
        useHTML: true
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
            // tickInterval: 1,
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
        useHTML: false,
        headerFormat:
            '<small class="dark:text-xs" style="font-size:10px">{point.x:%A, %b %e, %H:%M} - {point.point.to:%H:%M}</small><br>' +
            '<b style="color:{point.color}">{point.point.symbolName} </b><br>',
        // formatter: function (tooltip) {
        //     console.log(tooltip, "<<< p", this.points)
        //     // chart.options.colors
        //     console.log(tooltip.chart.options.colors[this.points[0].colorIndex],"<<< color")
            
        //     return tooltip.defaultFormatter.call(this, tooltip);

        // },
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

export { dateOptions, layerSourceInfo, aqhiChartOptions, weatherForecastChartOptions, dateOptions_1 }