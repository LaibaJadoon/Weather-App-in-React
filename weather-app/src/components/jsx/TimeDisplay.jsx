import React, { useState, useEffect } from "react";
import "../styles/TimeDisplay.css";

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const time = currentTime.toLocaleTimeString();
  const date = currentTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="time-display">
      <p className="time">{time}</p>
      <p className="date">{date}</p>
    </div>
  );
};

export default TimeDisplay;
