import React, { useState, useRef, useEffect } from "react";
import { initializesocket } from "../service/chat.socket";
import { useChat } from "../hook/chat.hook";
import { useSelector } from "react-redux";
import { setCurrentChatId } from "../chat.slice";





// ── Helpers ───────────────────────────────────────────────────────────────────
function formatText(text) {
  let parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return (
        <strong key={i} className="text-slate-100 font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    if (part.startsWith("`") && part.endsWith("`"))
      return (
        <code
          key={i}
          className="bg-slate-700/60 text-violet-300 px-1.5 py-0.5 rounded text-[0.82em] font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    if (part === "\n") return <br key={i} />;
    return part;
  });
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="relative mt-3 rounded-xl overflow-hidden border border-slate-700/60">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700/40">
        <span className="text-xs text-slate-400 font-mono">python</span>
        <button
          onClick={copy}
          className="text-xs text-slate-400 hover:text-violet-300 transition-colors flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto bg-slate-900/70 leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  const parts = msg.text.split(/(```[\s\S]*?```)/g);

  return (
    <div
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} group`}
    >
      {/* Avatar */}
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${isUser ? "bg-linear-to-br from-violet-500 to-indigo-600 text-white" : "bg-linear-to-br from-slate-700 to-slate-800 border border-slate-600/60"}`}
      >
        {isUser ? (
          "U"
        ) : (
          <svg
            className="w-4 h-4 text-violet-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.798-1.345 2.798H4.275c-1.375 0-2.346-1.799-1.345-2.798L5 14.5"
            />
          </svg>
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[75%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}
      >
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
            isUser
              ? "bg-linear-to-br from-violet-600/80 to-indigo-700/80 text-slate-100 rounded-tr-sm border border-violet-500/30 backdrop-blur-sm"
              : "bg-slate-800/70 text-slate-300 rounded-tl-sm border border-slate-700/50 backdrop-blur-sm"
          }`}
        >
          {parts.map((part, i) => {
            if (part.startsWith("```") && part.endsWith("```")) {
              const code = part
                .replace(/^```\w*\n?/, "")
                .replace(/```$/, "")
                .trim();
              return <CodeBlock key={i} code={code} />;
            }
            const lines = part.split("\n");
            return (
              <span key={i}>
                {lines.map((line, j) => {
                  if (line.startsWith("• ")) {
                    return (
                      <span key={j} className="flex gap-2 mt-1">
                        <span className="text-violet-400 shrink-0 mt-0.5">
                          •
                        </span>
                        <span>{formatText(line.slice(2))}</span>
                      </span>
                    );
                  }
                  return (
                    <span key={j}>
                      {j > 0 && <br />}
                      {formatText(line)}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </div>
        <span className="text-[10px] text-slate-600 px-1">{msg.time}</span>
      </div>
    </div>
  );
}

// ── Main Dashboard Component ──────────────────────────────────────────────────
function Dashboard() {
  // ── Your original socket logic — untouched ──

  const { socket, handleSendmessage, getchats, handleOpenChat, handleNewChat,handleLogout  } =
    useChat();
  const chats = useSelector((state) => state.chat.chats);

  const currentChatId = useSelector((state) => state.chat.currentChatId);
   const currentChat = useSelector((state) => 
  state.chat.chats[state.chat.currentChatId]
   
  );
  const username = useSelector((state) => state.auth.user.username);
  console.log(username);
  
  console.log(currentChat);

  useEffect(() => {
    getchats();
  }, []);
  console.log("Chats:", chats);
  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [socket]);
  // ── Dashboard UI state ──
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const bottomRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { message: input, chatId: currentChatId };
    await handleSendmessage(payload);
    setInput("");
  };

  useEffect(() => {
    console.log("Chats:", chats);
    console.log("currentChatId:", currentChatId);
  }, [chats, currentChatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, currentChatId]);

  return (
    <div
      className="flex h-screen w-full overflow-hidden font-sans"
      style={{
        background: "#0d0f17",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* ── Ambient background blobs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute -top-40 -left-40 w-150 h-150 rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -right-32 w-125 h-125 rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #4f46e5 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-175 h-100 rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          }}
        />
        {/* Wavy SVG at top */}
        <svg
          className="absolute top-0 left-0 w-full opacity-[0.06]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#7c3aed"
            d="M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,133.3C840,128,960,160,1080,165.3C1200,171,1320,149,1380,138.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
        <svg
          className="absolute top-8 left-0 w-full opacity-[0.04]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#4f46e5"
            d="M0,96L80,112C160,128,320,160,480,154.7C640,149,800,107,960,96C1120,85,1280,107,1360,117.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </div>

      {/* ── SIDEBAR ── */}
      <aside
        className={`relative z-10 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-800/60 ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}
        style={{
          background: "rgba(13,15,23,0.95)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Logo — "Perplexity AI" */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-800/60">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}
          >
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="text-slate-100 font-semibold text-[15px] tracking-tight">
            Perplexity AI
          </span>
          <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
        </div>

        {/* New Chat */}
        <div className="px-3 pt-4 pb-2">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-300 border border-dashed border-slate-700/70 hover:border-violet-500/50 hover:text-violet-300 hover:bg-violet-500/5 transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New conversation
            <span className="ml-auto w-2 h-2 rounded-full bg-violet-400 shadow-sm shadow-violet-400/50" />
          </button>
        </div>

        {/* Chat history */}
        <div
          className="flex-1 overflow-y-auto px-3 py-2 space-y-4"
          style={{ scrollbarWidth: "none" }}
        >
          {Object.values(chats).map((chat) => (
            <button
              key={chat.id}
              onClick={() => handleOpenChat(chat.id, chats)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
            >
              <span className="truncate block">{chat.title}</span>
            </button>
          ))}
        </div>

{/* username  */}
        <div className="px-3 pb-4 pt-2 border-t border-slate-800/60">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow"
              style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}
            >
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200 truncate font-medium">
               {username}
              </p>
            </div>
          <svg
         onClick={handleLogout}

  className="w-4 h-4 text-slate-500"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
  />
</svg>
          </div>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="relative z-10 flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <header
          className="flex items-center gap-3 px-5 py-4 border-b border-slate-800/50"
          style={{
            background: "rgba(13,15,23,0.8)",
            backdropFilter: "blur(20px)",
          }}
        >
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
<div className="flex items-center gap-2">
  <span className="text-slate-200 text-sm font-medium truncate">
    {currentChat?.title || "New Conversation"}
  </span>
  <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
    currentChat 
      ? "bg-emerald-400 shadow shadow-emerald-400/60"   
      : "bg-violet-400 shadow shadow-violet-400/50"    
  }`} />
</div>


          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-slate-400 border border-slate-700/50 bg-slate-800/40">
              <svg
                className="w-3 h-3 text-violet-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" opacity="0.2" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              Aura-4 Ultra
            </div>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          <div className="max-w-3xl mx-auto w-full space-y-6">
            {currentChatId && chats[currentChatId]?.message?.length > 0 ? (
              chats[currentChatId].message.map((msg, index) => (
                <MessageBubble
                  key={index}
                  msg={{
                    role: msg.role,
                    text: msg.content,
                    time: new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  }}
                />
              ))
            ) : (
              <div className="text-center text-slate-500 text-sm">
                Start a conversation...
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Wavy divider */}
        <div className="relative h-4 shrink-0 pointer-events-none -mb-1">
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 1440 16"
            preserveAspectRatio="none"
          >
            <path
              fill="#7c3aed"
              d="M0,8 C240,16 480,0 720,8 C960,16 1200,0 1440,8 L1440,16 L0,16 Z"
            />
          </svg>
        </div>

        {/* Input area */}
        <div
          className="px-4 pb-5 pt-3 shrink-0"
          style={{
            background: "rgba(13,15,23,0.95)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="max-w-3xl mx-auto">
            {/* Quick suggestions */}
            <div
              className="flex gap-2 mb-3 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "none" }}
            >
              {[
                "Explain backpropagation",
                "Code a neural net",
                "Compare GPT vs BERT",
                "What is LoRA?",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-slate-700/60 text-slate-400 hover:border-violet-500/50 hover:text-violet-300 hover:bg-violet-500/5 transition-all duration-200 whitespace-nowrap"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input box */}
            <div
              className="relative flex items-end gap-2 rounded-2xl border border-slate-700/60 bg-slate-800/50 px-4 py-3 shadow-xl shadow-black/30"
              style={{ backdropFilter: "blur(12px)" }}
            >
              {/* attach */}
              <button className="shrink-0 mb-0.5 w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors">
            
            <svg
  className="w-4 h-4"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M5 3l1.5 4.5L11 9l-4.5 1.5L5 15l-1.5-4.5L-1 9l4.5-1.5L5 3z"
  />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M19 11l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"
  />
</svg>
              </button>

              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Ask anything…"
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 resize-none outline-none leading-relaxed py-0.5"
                style={{ maxHeight: "140px", minHeight: "24px" }}
              />

              {/* send */}
              <button
                onClick={(e) => handleSubmit(e)}
                className={`shrink-0 mb-0.5 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg ${
                  input.trim()
                    ? "bg-linear-to-br from-violet-600 to-indigo-600 text-white shadow-violet-700/40 hover:from-violet-500 hover:to-indigo-500 scale-100"
                    : "bg-slate-700/60 text-slate-500 scale-95"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

            <p className="text-center text-[10px] text-slate-700 mt-2.5">
              Perplexity AI can make mistakes. Made by Vishal with love ❤
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
