import { useEffect, useRef, useContext } from "react";
import { detect, init } from "../utils/utils";
import { ExpressionContext } from "../contexts/Expression.context";

export default function FaceExpression() {

  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);
  const lastExpressionRef = useRef(null);

  const { expression, setExpression } = useContext(ExpressionContext);

  useEffect(() => {

    init({ landmarkerRef, videoRef, streamRef });

    const interval = setInterval(async () => {

      const newExpression = await detect({
        landmarkerRef,
        videoRef
      });

      // update only if expression changed
      if (newExpression && newExpression !== lastExpressionRef.current) {

        lastExpressionRef.current = newExpression;

        setExpression(newExpression);

      }

    }, 2000);

    return () => {

      clearInterval(interval);

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }

    };

  }, []);


  const getEmoji = () => {

    if (expression === "happy") return "😊 Happy";
    if (expression === "sad") return "😢 Sad";
    if (expression === "surprised") return "😲 Surprised";
    if (expression === "neutral") return "😐 Neutral";

    return expression;

  };


  return (
    <div style={{ textAlign: "center", padding: "20px" }}>

      <video
        ref={videoRef}
        style={{
          width: "420px",
          borderRadius: "12px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
        }}
        playsInline
        autoPlay
      />

      <h2 style={{ marginTop: "20px" }}>
        Expression: {getEmoji()}
      </h2>

      <button
        onClick={async () => {

          const newExpression = await detect({
            landmarkerRef,
            videoRef
          });

          if (newExpression) {
            setExpression(newExpression);
          }

        }}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          background: "#4CAF50",
          color: "white",
          cursor: "pointer"
        }}
      >
        Detect expression
      </button>

    </div>
  );
}