import { createContext, useState } from "react";

const ExpressionContext = createContext();

const ExpressionProvider = ({ children }) => {
  const [expression, setExpression] = useState("Detecting...");

  return (
    <ExpressionContext.Provider value={{ expression, setExpression }}>
      {children}
    </ExpressionContext.Provider>
  );
};

export { ExpressionContext, ExpressionProvider };