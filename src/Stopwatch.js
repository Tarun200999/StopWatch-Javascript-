import React from "react";
import { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./App.css";
function Stopwatch(props) {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [started, setStart] = useState(false);
  const [stopped, setStop] = useState(false);
  const [prevtime, setPreTime] = useState(0);
  const h = useHistory();
  const countRef = useRef(null);

  const handleHistory = () => {
    h.push("/history");
  };
  const handleStart = () => {
    //function to handle start button
    setStop(false);
    if (!started) {
      setStart(true);
      var S = new Date();
      if (paused) {
        S = S - prevtime;
      }
      countRef.current = setInterval(() => {
        setTime(new Date() - S);
      });
    }
  };
  const handleStop = () => {
    if (!stopped) {
      setStop(true);
      const val = formatTime();
      props.setData(val);
      setStart(false);
      setPreTime(time);
      setPaused(true);
      clearInterval(countRef.current);
    }
  };
  const handleReset = () => {
    clearInterval(countRef.current);
    setPaused(false);
    setPreTime(0);
    setTime(0);
    setStart(false);
    setStop(false);
  };
  const formatTime = () => {
    const minisec = `00${time}`.slice(-3);
    const second = Math.floor(time / 1000);
    const getSeconds = `0${second % 60}`.slice(-2);
    const minutes = `${Math.floor(second / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(second / 3600)}`.slice(-2);

    return `${getHours} h : ${getMinutes} m : ${getSeconds} s : ${minisec} ms`;
  };
  return (
    <div className="App">
      <div className="stopwatch">
        <div className="watch">{formatTime()}</div>
        <div className="buttons">
          <button className="btn btn-success" onClick={handleStart}>
            Start
          </button>
          <button className="btn btn-danger" onClick={handleStop}>
            Stop
          </button>
          <button className="btn btn-primary" onClick={handleReset}>
            Reset
          </button>
          <button className="btn btn-info" onClick={handleHistory}>
            View History
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
