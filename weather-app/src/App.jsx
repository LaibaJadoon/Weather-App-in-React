import React, { useState } from "react";
import "./components/styles/SearchBar.css";
import TimeDisplay from "./components/jsx/TimeDisplay";
import SearchBar from "./components/jsx/SearchBar";
import WeatherCard from "./components/jsx/WeatherCard";
import InfoGrid from "./components/jsx/InfoGrid";
import "./App.css";

function App() {
  const [city, setCity] = useState(""); // Input state
  const [weatherData, setWeatherData] = useState(null); // API data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const API_KEY = "2df3a256eea64c0ec59349dfd406b381";

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please Enter a City Name.");
      setWeatherData(null);
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      //Response Handling
      if (!response.ok) {
        throw new Error("City not found");
      }
      //Extracting Data
      const data = await response.json(); //Turns the raw API response into a JavaScript object (data).
      // console.log("Weather API data:", data);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
     finally {
      setLoading(false); // stops the loading state if data found or not
    }
  };

  //Function to determine the background class
  const getBackgroundClass = (weather) => {
    if (!weather) return "default-bg";
    switch (weather[0].main) {
      case "Clear":
        return "clear-bg";
      case "Clouds":
        return "clouds-bg";
      case "Rain":
        return "rain-bg";
      case "Snow":
        return "snow-bg";
      case "Thunderstorm":
        return "storm-bg";
      case "Drizzle":
        return "drizzle-bg";
      case "Mist":
      case "Fog":
        return "fog-bg";
      default:
        return "default-bg";
    }
  };

  // console.log("Weather condition:", weatherData?.weather?.[0]?.main);

  return (
    <div className={`App ${getBackgroundClass(weatherData?.weather)}`}>
      <div className="app-container">
        <h1>Weather App</h1>
        <TimeDisplay />
        <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {weatherData && <WeatherCard data={weatherData} />}
        {weatherData && <InfoGrid data={weatherData} />}
      </div>
    </div>
  );
}

export default App;
