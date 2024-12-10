import React from "react";

const VisibilityInfo = ({ visibility }) => {
  let visibilityDescription = "";
  if (visibility < 1000) {
    visibilityDescription = "Low Visibility.Take extra precautions";
  } else if (visibility >= 1000 && visibility < 5000) {
    visibilityDescription = "Moderate Visibility.Drive carefully.";
  } else {
    visibilityDescription = "High visibility.Clear conditions";
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg mb-2">
      <h2 className="text-2xl font-bold mb-4">Visibility</h2>
      <p className="text-xl mb-2 font-bold">
        Current Visibility:{visibility}meters
      </p>
      <p className="text-lg">{visibilityDescription}</p>
    </div>
  );
};

export default VisibilityInfo;
