import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import moment from "moment";

const FiveDaysGraph = ({ forecastData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (forecastData.length > 0) {
      // Extract unique dates and average temperature for the chart
      const uniqueData = forecastData.reduce(
        (acc, forecastDay) => {
          const date = moment.unix(forecastDay.dt).format("MMMM D");
          if (!acc.dates.includes(date)) {
            acc.dates.push(date);
            acc.avgTemps.push(
              (forecastDay.main.temp_max + forecastDay.main.temp_min) / 2
            );
          }
          return acc;
        },
        { dates: [], avgTemps: [] }
      );

      // Chart configuration
      const chartConfig = {
        type: "line",
        data: {
          labels: uniqueData.dates, // Corrected spelling from "lables" to "labels"
          datasets: [
            {
              label: "Average Temperature (°C)", // Added unit for temperature
              data: uniqueData.avgTemps,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
      };

      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create the chart
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, chartConfig);
    }
  }, [forecastData]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg text-left">
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast Graph</h2>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default FiveDaysGraph;
