import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Stopwatch from "./Stopwatch";
import History from "./History";
import "./App.css";
function App() {
  const [history, setHistory] = useState([]);
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Stopwatch setData={(val) => setHistory((old) => [...old, val])} />
      </Route>
      <Route path="/history">
        <History data={history} />
      </Route>
    </BrowserRouter>
  );
}

export default App;
