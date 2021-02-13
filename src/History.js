import React from "react";
import "./App.css";
function History(props) {
  return (
    <div className="history">
      {props.data.map((e) => (
        <div className="history_item">
          <h1> > {e}</h1>
        </div>
      ))}
    </div>
  );
}

export default History;
