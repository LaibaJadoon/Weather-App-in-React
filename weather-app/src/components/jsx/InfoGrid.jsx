import React from "react";
import "../styles/InfoGrid.css";

const InfoGrid = ({ data }) => {
  const { wind, main, sys } = data;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="info-grid">
      <div className="info-item">
        <h4>Wind</h4>
        <p>{wind.speed} m/s</p>
      </div>
      <div className="info-item">
        <h4>Humidity</h4>
        <p>{main.humidity}%</p>
      </div>
      <div className="info-item">
        <h4>Pressure</h4>
        <p>{main.pressure} hPa</p>
      </div>
      <div className="info-item">
        <h4>Sunrise</h4>
        <p>{formatTime(sys.sunrise)}</p>
      </div>
      <div className="info-item">
        <h4>Sunset</h4>
        <p>{formatTime(sys.sunset)}</p>
      </div>
    </div>
  );
};

export default InfoGrid;
