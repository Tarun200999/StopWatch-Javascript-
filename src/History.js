import React from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
function History(props) {
  const h = useHistory();
  const handleClick = () => {
    h.push("/");
  };
  return (
    <>
      <div className="history">
        <ul className="list-group">
          {props.data.map((e) => (
            <li className="list-group-item">{e}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleClick} className="btn btn-primary go_back">
        Go Back
      </button>
    </>
  );
}

export default History;
