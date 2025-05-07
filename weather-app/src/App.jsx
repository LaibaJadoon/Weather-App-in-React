import React, { useState, useEffect } from "react";
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

  // 📍 Fetch weather using geolocation on first load
  useEffect(() => {
    getWeatherByLocation();
  }, []);

  const getWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch weather for current location.");
          }

          const data = await response.json();
          setWeatherData(data);
          setCity(data.name); // Optional: update input with detected city
        } catch (err) {
          setError(err.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError("Permission denied or location not available.");
        setLoading(false);
      }
    );
  };

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

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
