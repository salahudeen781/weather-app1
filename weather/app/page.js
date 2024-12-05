"use client";

import { useState } from "react";
import Weather from "./components/Weather";

export default function Home() {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyTemperatureData, setHourlyTemperaturedata] = useState([]);
  const [errorAlert, setErrorAlert] = useState(null);

  const fetchWeatherData = async () => {
    const apiKey = "32bb2892c952edf8c123b36b85bdf8bd";

    const commonUrl = `https://api.openweathermap.org/data/2.5`;
    const weatherUrl = `${commonUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `${commonUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const hourlyUrl = `${commonUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const [weatherResponse, forecastResponse, hourlyResponse] =
        await Promise.all([
          fetch(weatherUrl),
          fetch(forecastUrl),
          fetch(hourlyUrl),
        ]);

      // Check if all responses are OK
      if (weatherResponse.ok && forecastResponse.ok && hourlyResponse.ok) {
        const weatherData = await weatherResponse.json();
        setCurrentWeather(weatherData);

        const forecastData = await forecastResponse.json();
        // Extracting only the next Five Days data
        setForecastData(forecastData.list.slice(0, 5 * 8));

        const hourlyData = await hourlyResponse.json();
        // Extract hourly Temperature data
        const hourlyTemperatureData = hourlyData.list.map((hourlyEntry) => ({
          time: hourlyEntry.dt,
          temperature: hourlyEntry.main.temp,
        }));
        setHourlyTemperaturedata(hourlyTemperatureData);

        // Clear any previous error alert
        setErrorAlert(null);
      } else {
        // Show alert for incorrect city name
        setErrorAlert("Invalid city name. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Show alert for general error
      setErrorAlert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <main className="text-center flex-1 w-full">
        <h1 className="text-4xl text-white font-bold mb-8 mt-4">
          Welcome to the Weather App
        </h1>

        {/* Search options with input on the left and button on the right */}
        <div className="flex items-center justify-center mb-8">
          <input
            className="p-4 mr-4 bg-gray-700 text-white rounded"
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="p-4 bg-blue-500 text-white rounded cursor-pointer"
            onClick={() => fetchWeatherData()}
          >
            Search
          </button>

          {/* Show error alert if applicable */}
          {errorAlert && <div className="text-red-500 mb-4">{errorAlert}</div>}

          {/* Additional weather information */}
          {currentWeather &&
            forecastData &&
            hourlyTemperatureData.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Weather currentWeather={currentWeather} />
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}
