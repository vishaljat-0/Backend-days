export default function Loader({ text = "Initializing" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-7">
      {/* Orbital rings */}
      <div className="relative flex items-center justify-center">
        {/* Ambient glow */}
        <div
          className="absolute w-25 h-25 rounded-full animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Ring container */}
        <div className="relative w-18 h-18">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-[1.5px] border-transparent animate-spin"
            style={{
              borderTopColor: "#7c3aed",
              borderRightColor: "rgba(124,58,237,0.2)",
              animationDuration: "1.2s",
              boxShadow: "0 0 16px rgba(124,58,237,0.35)",
            }}
          />
                    {/* Mid ring */}
                    <div
                      className="absolute inset-2.5 rounded-full border-[1.5px] border-transparent animate-spin"
                      style={{
                        borderTopColor: "rgba(124,58,237,0.6)",
                        borderRightColor: "rgba(124,58,237,0.1)",
                        animationDuration: "1.8s",
                        animationDirection: "reverse",
                        boxShadow: "0 0 12px rgba(124,58,237,0.25)",
                      }}
                    />
                  </div>
                </div>
          
                {/* Loading text */}
                <p className="text-sm font-medium text-gray-300">{text}</p>
              </div>
            );
          }