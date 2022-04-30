import React from "react";
import Canvas from "../components/Canvas/Canvas";

const Play = () => {
  return (
    <div>
      <canvas id="canvas" width="400" height="400" color="white"></canvas>
      <h1>Hello Snake Game</h1>
      <script src="game.js"></script>
    </div>
  );
};

export default Play;
