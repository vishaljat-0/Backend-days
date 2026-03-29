import { memo } from "react";

 export const MessageBubble = memo(function MessageBubble({ msg, isStreamingThis }) {
  const isUser = msg.role === "user";
  const showCursor = !isUser && isStreamingThis;
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(msg.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [msg.text]);

  return (
    <div
      className={`anim-fade-slide flex gap-3 items-start ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`relative shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold
        ${
          isUser
            ? "bg-linear-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-700/40"
            : "bg-linear-to-br from-slate-800 to-slate-900 border border-violet-800/30"
        }`}
      >
        {isUser ? <span className="text-white">U</span> : <AIIcon />}
        {!isUser && isStreamingThis && <span className="pulse-ring" />}
      </div>

      {/* Bubble + timestamp */}
      <div
        className={`flex flex-col gap-1 max-w-[74%] ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`px-4 py-3 text-[13.5px] leading-relaxed wrap-break-word backdrop-blur-md
    ${
      isUser
        ? "rounded-[18px_4px_18px_18px] bg-violet-900/50 text-violet-100 border border-violet-700/30"
        : "rounded-[4px_18px_18px_18px] bg-slate-900/70 text-slate-300 border border-white/5"
    }`}
        >
          {isUser ? (
            <span>{msg.text}</span>
          ) : (
            <span className={showCursor ? "cursor-blink" : ""}>
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </span>
          )}
        </div>

        {/* Timestamp + copy button */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-[10px] text-slate-600">{msg.time}</span>
          {!isUser && !isStreamingThis && (
            <button
              onClick={handleCopy}
              className="text-slate-600 hover:text-violet-400 transition-colors duration-200"
            >
              {copied ? (
                <svg
                  width={12}
                  height={12}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  width={12}
                  height={12}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});