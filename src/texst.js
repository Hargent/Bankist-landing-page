import React, { useState, useEffect } from "react";
import "./test.css";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(3);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = 3;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      if (isActive && seconds <= -1) {
        reset();
        alert("Time-Out");
      }
    }
    // } else if (!isActive && seconds === 10) {
    //   clearInterval(interval);
    // }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="app">
      <div className="time">{seconds}s</div>
      <div className="row">
        <button
          className={`button button-primary button-primary-${
            isActive ? "active" : "inactive"
          }`}
          onClick={toggle}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
