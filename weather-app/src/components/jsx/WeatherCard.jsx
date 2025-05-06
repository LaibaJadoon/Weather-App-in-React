import React from "react";
import "../styles/WeatherCard.css";

const WeatherCard = ({ data }) => {
  const {
    name,
    sys,
    main,
    weather
  } = data;

  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{name}, {sys.country}</h2>
      <img src={iconUrl} alt={weather[0].description} />
      <p className="condition">{weather[0].main} - {weather[0].description}</p>
      <p className="temp">{main.temp}°C</p>
      <p>Feels like: {main.feels_like}°C</p>
      <p>Min: {main.temp_min}°C / Max: {main.temp_max}°C</p>
    </div>
  );
};

export default WeatherCard;
