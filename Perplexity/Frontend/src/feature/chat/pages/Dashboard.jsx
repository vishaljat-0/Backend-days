import { useState, useRef, useEffect, memo, useCallback } from "react";
import { useChat } from "../hook/chat.hook";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

// ─── AI Avatar Icon ───────────────────────────────────────────────────────────
function AIIcon() {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a78bfa"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5
           M9.75 3.104c-.251.023-.501.05-.75.082
           m.75-.082a24.301 24.301 0 014.5 0
           m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3
           M14.25 3.104c.251.023.501.05.75.082
           M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15
             a9.065 9.065 0 00-6.23-.693L5 14.5
           m14.8.8l1.402 1.402c1 1 .03 2.798-1.345 2.798
           H4.275c-1.375 0-2.346-1.799-1.345-2.798L5 14.5"
      />
    </svg>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────
const MessageBubble = memo(function MessageBubble({ msg, isStreamingThis }) {
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

// ─── Typing Indicator (shown before first token arrives) ──────────────────────
function TypingIndicator() {
  return (
    <div className="anim-fade-slide flex gap-3 items-start">
      <div className="relative shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-linear-to-br from-slate-800 to-slate-900 border border-violet-800/30">
        <AIIcon />
        <span className="pulse-ring" />
      </div>
      <div className="px-4 py-3.5 rounded-[4px_18px_18px_18px] bg-slate-900/70 border border-white/5 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 dot-0" />
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 dot-1" />
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 dot-2" />
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="anim-fade-in flex flex-col items-center justify-center h-full gap-4 py-20">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center bg-violet-950/50 border border-violet-800/30"
        style={{ boxShadow: "0 0 40px rgba(124,58,237,0.1)" }}
      >
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7c3aed"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
      <p className="text-slate-500 text-sm">Ask anything to get started</p>
      <p className="text-slate-700 text-[11px]">Powered by Aura-4 Ultra</p>
    </div>
  );
}

// ─── Sidebar Chat Item ────────────────────────────────────────────────────────
function SidebarChatItem({ chat, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg text-[12.5px] transition-all duration-150 border mb-0.5 truncate
        ${
          isActive
            ? "bg-violet-950/50 text-violet-300 border-violet-800/40"
            : "text-slate-500 border-transparent hover:bg-white/3 hover:text-slate-300"
        }`}
    >
      {chat.title}
    </button>
  );
}

// ─── Suggestion Pill ──────────────────────────────────────────────────────────
function SuggestionPill({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 text-[11px] px-3 py-1.5 rounded-full border border-violet-900/30 text-slate-500 bg-violet-950/10 hover:bg-violet-950/40 hover:text-violet-300 hover:border-violet-700/50 transition-all duration-150 whitespace-nowrap"
    >
      {label}
    </button>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  // ── Hooks ──
  const {
    socket,
    getchats,
    handleOpenChat,
    handleNewChat,
    handleLogout,
    handleStreamMessage,
  } = useChat();
  const chats = useSelector((s) => s.chat.chats);
  const currentChatId = useSelector((s) => s.chat.currentChatId);
  const currentChat = useSelector((s) => s.chat.chats[s.chat.currentChatId]);
  const isStreaming = useSelector((s) => s.chat.isStreaming);
  const username = useSelector((s) => s.auth.user.username);

  // ── Local state ──
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ── Refs ──
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const isSubmittingRef = useRef(false); // prevents double-submit

  // ── Load chats on mount ──
  useEffect(() => {
    getchats();
  }, []);

  // ── Socket connect log (cleanup prevents duplicate listeners) ──
  useEffect(() => {
    if (!socket) return;
    const onConnect = () => console.log("Socket connected:", socket.id);
    socket.on("connect", onConnect);
    return () => socket.off("connect", onConnect);
  }, [socket]);

  // ── Auto-scroll: instant during stream, smooth on chat switch ──
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: isStreaming ? "instant" : "smooth",
    });
  }, [chats, currentChatId, isStreaming]);

  // ── Auto-resize textarea as user types ──
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  }, [input]);

  // ── Submit with double-fire guard ──
  const handleSubmit = useCallback(async () => {
    if (!input.trim() || isStreaming || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    const payload = { message: input, chatId: currentChatId };
    setInput("");
    try {
      await handleStreamMessage(payload);
    } finally {
      isSubmittingRef.current = false;
    }
  }, [input, currentChatId, isStreaming, handleStreamMessage]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  // ── Derived values ──
  const messages = currentChatId ? (chats[currentChatId]?.message ?? []) : [];
  const lastMsg = messages[messages.length - 1];
  const showDots =
    isStreaming &&
    (!lastMsg || lastMsg.role !== "assistant" || !lastMsg.content);

  const SUGGESTIONS = [
    "Explain backpropagation",
    "Code a neural net",
    "Compare GPT vs BERT",
    "What is LoRA?",
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#080a12]">
      {/* ── Decorative ambient blobs ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-150 h-150 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -right-32 w-125 h-125 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(79,70,229,0.09) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-175 h-100 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ══════════ SIDEBAR ══════════ */}
      <aside
        className={`relative z-10 flex flex-col border-r border-white/5 bg-[rgba(10,11,18,0.97)] backdrop-blur-2xl transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-4.5 border-b border-white/5 shrink-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
              boxShadow: "0 2px 12px rgba(124,58,237,0.4)",
            }}
          >
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="text-slate-100 font-semibold text-[14px] tracking-tight whitespace-nowrap">
            Perplexity AI
          </span>
          <div
            className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shrink-0"
            style={{ boxShadow: "0 0 8px rgba(52,211,153,0.6)" }}
          />
        </div>

        {/* New Chat */}
        <div className="px-3 pt-3 pb-2 shrink-0">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-slate-400 border border-dashed border-violet-900/40 hover:border-violet-600/60 hover:text-violet-300 hover:bg-violet-950/20 transition-all duration-200 whitespace-nowrap"
          >
            <svg
              width={14}
              height={14}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New conversation
          </button>
        </div>

        {/* Chat history */}
        <div
          className="flex-1 overflow-y-auto px-3 py-1"
          style={{ scrollbarWidth: "none" }}
        >
          {Object.values(chats).map((chat) => (
            <SidebarChatItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === currentChatId}
              onClick={() => handleOpenChat(chat.id, chats)}
            />
          ))}
        </div>

        {/* User profile */}
        <div className="px-3 pb-4 pt-2 border-t border-white/5 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/3 transition-colors cursor-pointer">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                boxShadow: "0 2px 8px rgba(124,58,237,0.35)",
              }}
            >
              {username?.charAt(0)?.toUpperCase()}
            </div>
            <span className="text-[12.5px] text-slate-400 flex-1 truncate">
              {username}
            </span>
            <button
              onClick={handleLogout}
              className="text-slate-600 hover:text-slate-400 transition-colors shrink-0"
            >
              <svg
                width={15}
                height={15}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="relative z-10 flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="flex items-center gap-3 px-5 py-3 border-b border-white/5 bg-[rgba(8,10,18,0.85)] backdrop-blur-2xl shrink-0">
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-white/4 transition-all"
          >
            <svg
              width={18}
              height={18}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <span className="text-slate-200 text-[13.5px] font-medium truncate">
              {currentChat?.title || "New Conversation"}
            </span>
            <div
              className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300
              ${isStreaming ? "bg-violet-500" : currentChat ? "bg-emerald-400" : "bg-slate-600"}`}
              style={{
                boxShadow: isStreaming
                  ? "0 0 10px #7c3aed"
                  : currentChat
                    ? "0 0 8px rgba(52,211,153,0.6)"
                    : "none",
              }}
            />
          </div>

          <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-violet-500 border border-violet-900/30 bg-violet-950/20">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
            Aura-4 Ultra
          </div>
        </header>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="max-w-180 mx-auto flex flex-col gap-5">
            {messages.length === 0 && !isStreaming ? (
              <EmptyState />
            ) : (
              messages.map((msg, index) => (
                <MessageBubble
                  key={msg._id || index}
                  msg={{
                    role: msg.role,
                    text: msg.content,
                    time: new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  }}
                  isStreamingThis={
                    isStreaming &&
                    index === messages.length - 1 &&
                    msg.role === "assistant"
                  }
                />
              ))
            )}

            {showDots && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Gradient divider */}
        <div className="h-px shrink-0 bg-linear-to-r from-transparent via-violet-900/30 to-transparent" />

        {/* Input area */}
        <div className="px-5 pb-5 pt-3 bg-[rgba(8,10,18,0.97)] backdrop-blur-2xl shrink-0">
          <div className="max-w-180 mx-auto">
            {/* Suggestion pills */}
            <div
              className="flex gap-2 mb-3 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "none" }}
            >
              {SUGGESTIONS.map((s) => (
                <SuggestionPill key={s} label={s} onClick={() => setInput(s)} />
              ))}
            </div>

            {/* Input box */}
            <div
              className={`flex items-end gap-3 rounded-2xl border px-4 py-3 bg-slate-900/80 backdrop-blur-md transition-all duration-200
              ${input.trim() ? "border-violet-700/50 shadow-[0_0_20px_rgba(124,58,237,0.12)]" : "border-white/[0.07]"}`}
            >
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything…"
                disabled={isStreaming}
                className="flex-1 bg-transparent text-[13.5px] text-slate-200 placeholder-slate-600 resize-none outline-none leading-relaxed py-0.5 disabled:opacity-50 transition-opacity duration-200 border-none"
                style={{
                  maxHeight: 140,
                  minHeight: 24,
                  scrollbarWidth: "none",
                }}
              />

              <button
                onClick={handleSubmit}
                disabled={!input.trim() || isStreaming}
                className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border-none transition-all duration-200
                  ${input.trim() && !isStreaming ? "anim-glow-pulse cursor-pointer scale-100" : "cursor-not-allowed opacity-30 scale-90"}`}
                style={{
                  background:
                    input.trim() && !isStreaming
                      ? "linear-gradient(135deg,#7c3aed,#4f46e5)"
                      : "rgba(255,255,255,0.04)",
                }}
              >
                <svg
                  width={14}
                  height={14}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={input.trim() && !isStreaming ? "#fff" : "#475569"}
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

            <p className="text-center text-[10px] text-slate-700 mt-2.5">
              Perplexity AI can make mistakes · Made by Vishal with ❤
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
