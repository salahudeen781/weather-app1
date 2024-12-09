import React, { useEffect, useRef } from "react";
import moment from "moment";
import chart from "chart.js/auto";

const HourlyWeather = ({ hourlyTemperatureData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const createChart = () => {
      //Extract uniqute itemsand temperature for the chart
      const uniqueData = hourlyTemperatureData.reduce(
        (acc, entry) => {
          const time = moment.unix(entry.time).format("H A");
          if (!acc.times.includes(time)) {
            acc.times.push(time);
            acc.temperatures.push(entry.temperature);
          }
          return acc;
        },
        { times: [], temperatures: [] }
      );

      //chart configuration
      const chartConfig = {
        type: "line",
        data: {
          labels: uniqueData.times,
          datasets: [
            {
              label: "Temperature ()",
              data: uniqueData.temperatures,
              fill: false,
              borderColor: "rgb(75,192,192)",
              tension: 0.1,
            },
          ],
        },
      };
      //destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      //Create the chart
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new chart(ctx, chartConfig);
    };
    if (hourlyTemperatureData.length > 0) {
      createChart();
    }
  }, [hourlyTemperatureData]);

  return (
    <div className="bg-gray-900 p-8 rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">HourlyWeather</h2>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default HourlyWeather;
