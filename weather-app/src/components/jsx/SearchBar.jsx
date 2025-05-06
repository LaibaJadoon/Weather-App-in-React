import React from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ city, setCity, handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
