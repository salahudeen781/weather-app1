"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyTemperatureData, setHourlyTemperaturedata] = useState([]);
  const [errorAlert, setErrorAlert] = useState(null);

  const fetchWeatherData = async () => {
    const apiKey = "32bb2892c952edf8c123b36b85bdf8bd";

    const commonUrl = `https://api.openweathermap.org/data/2.5`;
    const weatherUrl = `${commonUrl}/weather?q=${cityname}&appid=${apiKey}&units=metric`;
    const forecastUrl = `${commonUrl}/forecastUrl?q=${cityname}&appid=${apiKey}&units=metric`;

    try {
      const [weatherResponse, forecastResponse, hourlyResponse] =
        await Promise.all([
          fetch(weatherUrl),
          fetch(forecastUrl),
          fetch(forecastUrl),
        ]);

      //Check if all response are ok

      if (weatherResponse.ok && forecastResponse.ok && hourlyResponse.ok) {
        const weatherData = await weatherResponse.json();
        setCurrentWeather(weatherData);

        const forecastData = await forecastResponse.json();
        //Extracting only the next Five Days data
        setForecastData(forecastData.list.slic(0, 5 * 8));

        const hourlyData = await hourlyResponse.json();
        // Extract hourly Temperature data
        const hourlyTemperatureData = hourlyData.list.map((hourlyEntry) => ({
          time: hourlyEntry.dt,
          temperature: hourlyEntry.main.temp,
        }));
        setHourlyTemperaturedata(hourlyTemperatureData);

        //Clear any previous error alert
        setErrorAlert(null);
      } else {
        //show alert for incorrect city name
        setErrorAlert("Invalid city name. Please Try again.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // show alert for general error
      setErrorAlert("An error occured.please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <main className="text-center flex-1 w-full">
        <h1 className="text-4xl text-white font-bold mb-8 mt-4">
          welcome to the Weather App
        </h1>

        {/*serach options with input on the left and button on the right*/}
        <div className="flex items-center justify-center mb-8">
          <input
            className="p-4 mr-4 bg-gray-700 text-white rounded"
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
          <button className="p-4 bg-blue-500 text-white rounded cursor-pointer onClick={fetchWeatherData}">
            Search
          </button>

          {/*show error alert if applicable */}
          {errorAlert && <div className="text-red-500 mb-4">{errorAlert}</div>}
        </div>
      </main>
    </div>
  );
}
