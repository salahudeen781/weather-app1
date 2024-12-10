import React from "react";

const FeelsLike = ({ actualTemperature, feelsLikeTemperature }) => {
  //Calculate the temperature difference
  const temperatureDifference = feelsLikeTemperature - actualTemperature;

  //Determine the description based on the temperature difference

  let description = "";
  if (temperatureDifference < 0) {
    description = "Feels colder than the actual temperature.";
  } else if (temperatureDifference > 0) {
    description = "Feels warmer than the actual Temperature.";
  } else {
    description = "Feels the same as the actual Temperature.";
  }

  return (
    <div className="bg-gray-900 P-8 rounded-lg mb-3">
      <h2 className="text-xl font-bold mb-4">Feels Like</h2>
      <p className="text-xl mb-2 font-bold">{feelsLikeTemperature}°C</p>
      <p className="text-lg">{description}</p>
    </div>
  );
};

export default FeelsLike;
