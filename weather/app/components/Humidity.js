import React from "react";

const HumidityInfo = ({ humidity }) => {
  //Determine the description based on the humidity levels

  let humidityDescription = "";
  if (humidity < 30) {
    humidityDescription = "Low humidity.Consider staying hydrated.";
  } else if (humidity > 70) {
    humidityDescription = "High humidity.Be prepared for mositure.";
  } else {
    humidityDescription = "Normal humdity levels.";
  }
  return (
    <div className="bg-gray-900 p-6 rounded-lg mb-3">
      <h2 className="text-2xl font-bold mb-4">Humidity</h2>
      <p className="text-xl mb-2 font-bold"></p>
      {humidity}%<p className="text-lg">{humidityDescription}</p>
    </div>
  );
};

export default HumidityInfo;
