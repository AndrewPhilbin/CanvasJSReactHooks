import React, { useState, useEffect, useRef } from 'react';
import CanvasJSReact from '../../canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Graph = () => {
  const [dataPoints, setDataPoints] = useState([]);

  const chart = useRef();

  const options = {
    theme: 'light2',
    title: {
      text: 'Stock Price of NIFTY 50',
    },
    axisX: {
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: 'Price in USD',
      prefix: '$',
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        labelFormatter: function (e) {
          return '$' + CanvasJS.formatNumber(e.value, '##0.00');
        },
      },
    },
    data: [
      {
        type: 'line',
        xValueFormatString: 'MMM YYYY',
        yValueFormatString: '$#,##0.00',
        dataPoints: dataPoints,
      },
    ],
  };

  useEffect(() => {
    fetch('https://canvasjs.com/data/gallery/react/nifty-stock-price.json')
      .then(response => response.json())
      .then(data => {
        let dataEls = data.map(el => {
          return { x: new Date(el.x), y: el.y };
        });
        console.log(dataEls);
        setDataPoints(dataEls);
      });
  }, []);

  return (
    <div>
      <CanvasJSChart options={options} ref={chart.current} />
    </div>
  );
};

export default Graph;
