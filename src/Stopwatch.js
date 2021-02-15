import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./App.css";
function Stopwatch(props) {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [started, setStart] = useState(false);
  const [stopped, setStop] = useState(false);
  const [prevtime, setPreTime] = useState(0);
  const hour = useRef("00");
  const minute = useRef("00");
  const sec = useRef("00");
  const mini = useRef("000");
  const h = useHistory();
  const countRef = useRef(null);

  useEffect(() => {
    const minisec = `00${time}`.slice(-3);
    const second = Math.floor(time / 1000);
    const getSeconds = `0${second % 60}`.slice(-2);
    const minutes = `${Math.floor(second / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(second / 3600)}`.slice(-2);
    hour.current = getHours;
    minute.current = getMinutes;
    sec.current = getSeconds;
    mini.current = minisec;
  }, [time]);

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
      const val =
        hour.current +
        "h" +
        minute.current +
        "m" +
        sec.current +
        "s" +
        mini.current +
        "ms";
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
    hour.current = "00";
    minute.current = "00";
    sec.current = "00";
    mini.current = "000";
    setTime(0);
    setStart(false);
    setStop(false);
  };

  return (
    <div className="App">
      <div className="stopwatch">
        <div className="watch">
          <div className="hour">
            {hour.current}
            <span>Hour</span>
          </div>
          <h1>:</h1>
          <div className="minute">
            {minute.current}
            <span>Min</span>
          </div>
          <h1>:</h1>
          <div className="sec">
            {sec.current}
            <span>Sec</span>
          </div>
          <h1>:</h1>
          <div className="mini">
            {mini.current}
            <span>ms</span>
          </div>
        </div>
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
            History
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
