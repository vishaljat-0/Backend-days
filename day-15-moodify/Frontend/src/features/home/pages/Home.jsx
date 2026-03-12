import React from "react";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/Player";
import { ExpressionProvider } from "../../expression/contexts/Expression.context";

function Home() {
  return (
    <ExpressionProvider>
      <div>
        <FaceExpression />
        <Player />
      </div>
    </ExpressionProvider>
  );
}

export default Home;
