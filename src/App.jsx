import React from "react";
import ReactDOM from "react-dom";
import CanvasEditor from "./editor/CanvasEditor.jsx";

const songInfo = {
  generatedBy: "WebEditor",
  charter: "Ryouse1",
  artist: "Sample",
  speed: 2.6,
  stage: "phillyStreets",
  player1: "bf",
  player2: "opponent"
};

function App(){
  return (
    <div>
      <h1>Psych Engine Notes Editor</h1>
      <CanvasEditor song={songInfo} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
