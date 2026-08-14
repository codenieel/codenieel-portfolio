"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, User, Loader } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What projects has Daniel built?",
  "Is he available for freelance?",
  "What's his tech stack?",
];

function TypingDots() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "4px 2px",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.9,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "var(--accent)",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isUser ? "var(--accent)" : "var(--bg-card-hover)",
          border: "1px solid var(--border)",
        }}
      >
        {isUser ? (
          <User size={12} color="#fff" />
        ) : (
          <MessageCircle size={12} style={{ color: "var(--accent)" }} />
        )}
      </div>
      {/* Bubble */}
      <div
        style={{
          maxWidth: "78%",
          padding: "9px 13px",
          borderRadius: isUser ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
          background: isUser ? "var(--accent)" : "var(--bg-card-hover)",
          border: isUser ? "none" : "1px solid var(--border)",
          fontSize: "13px",
          lineHeight: 1.6,
          color: isUser ? "#fff" : "var(--text-muted)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {msg.content.split(/(__email__.*?__email__)/).map((part, i) => {
          if (part.startsWith("__email__")) {
            const email = part.replace(/__email__/g, "");
            return (
              <a
                key={i}
                href={`mailto:${email}`}
                style={{
                  color: "var(--accent)",
                  fontWeight: 600,
                  textDecoration: "none",
                  borderBottom: "1px solid var(--accent-subtle-border)",
                }}
              >
                {email}
              </a>
            );
          }
          return part;
        })}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // true during initial fetch (before first token)
  const [streaming, setStreaming] = useState(false); // true while tokens are arriving
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setEverOpened(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading || streaming) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setShowSuggestions(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (res.status === 429) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Too many messages — please wait a moment." },
        ]);
        return;
      }
      if (res.status === 503) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "The AI assistant isn't available right now. In the meantime, feel free to explore Daniel's projects above or reach out directly at __email__daldedaniellus@gmail.com__email__",
          },
        ]);
        return;
      }
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: (data as { error?: string }).error || "Something went wrong. Please try again." },
        ]);
        return;
      }

      // Stream tokens into the assistant message in real time
      const assistantIndex = next.length;
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setLoading(false);
      setStreaming(true);

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (value) {
          const chunk = dec.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[assistantIndex] = {
              role: "assistant",
              content: updated[assistantIndex].content + chunk,
            };
            return updated;
          });
        }
      }
      setStreaming(false);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error — please try again." },
      ]);
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Chat panel — only mounted after first open to avoid upfront render cost */}
      <AnimatePresence>
        {everOpened && open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "fixed",
              bottom: "84px",
              right: "24px",
              width: "min(380px, calc(100vw - 32px))",
              height: "500px",
              borderRadius: "16px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow:
                "0 24px 80px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 100,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 16px",
                borderBottom: "1px solid var(--border)",
                background: "var(--bg-card-hover)",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--accent-subtle)",
                  border: "1px solid var(--accent-subtle-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 12px -2px var(--accent-glow)",
                }}
              >
                <MessageCircle size={15} style={{ color: "var(--accent)" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text)",
                    lineHeight: 1,
                  }}
                >
                  Ask about Daniel
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-subtle)",
                    marginTop: "2px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      display: "inline-block",
                      boxShadow: "0 0 6px rgba(34,197,94,0.5)",
                    }}
                  />
                  Powered by Claude AI
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "7px",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--text-subtle)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={13} />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {/* Greeting */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <MessageBubble
                    msg={{
                      role: "assistant",
                      content:
                        "Hi! I'm Daniel's AI assistant. Ask me anything about his work, skills, or availability.",
                    }}
                  />
                </motion.div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageBubble msg={msg} />
                </motion.div>
              ))}

              {loading && (
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--bg-card-hover)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <MessageCircle size={12} style={{ color: "var(--accent)" }} />
                  </div>
                  <div
                    style={{
                      padding: "9px 13px",
                      borderRadius: "4px 14px 14px 14px",
                      background: "var(--bg-card-hover)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <TypingDots />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            <AnimatePresence>
              {showSuggestions && messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    padding: "0 16px 12px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    flexShrink: 0,
                  }}
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 500,
                        background: "var(--accent-subtle)",
                        border: "1px solid var(--accent-subtle-border)",
                        color: "var(--accent)",
                        cursor: "pointer",
                        transition: "opacity 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.75")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div
              style={{
                padding: "12px 16px",
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: "8px",
                alignItems: "center",
                flexShrink: 0,
                background: "var(--bg-card-hover)",
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
                disabled={loading || streaming}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontSize: "13px",
                  outline: "none",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor =
                    "var(--accent-subtle-border)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              />
              <motion.button
                onClick={() => send(input)}
                disabled={!input.trim() || loading || streaming}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  flexShrink: 0,
                  background:
                    input.trim() && !loading && !streaming
                      ? "var(--accent)"
                      : "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color:
                    input.trim() && !loading && !streaming ? "#fff" : "var(--text-subtle)",
                  cursor: input.trim() && !loading && !streaming ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {loading || streaming ? (
                  <Loader
                    size={13}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  <Send size={13} />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 100,
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "var(--accent)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 4px 24px -4px var(--accent-glow), 0 0 0 1px rgba(255,255,255,0.08) inset",
          color: "#fff",
        }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={20} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Ripple rings — pure CSS to avoid Framer reset flicker */}
        {!open && (
          <>
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid var(--accent)",
                pointerEvents: "none",
                animation:
                  "ripple 2.4s cubic-bezier(0.2, 0.6, 0.4, 1) infinite",
                willChange: "transform, opacity",
              }}
            />
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid var(--accent)",
                pointerEvents: "none",
                animation:
                  "ripple 2.4s cubic-bezier(0.2, 0.6, 0.4, 1) infinite",
                animationDelay: "0.8s",
                willChange: "transform, opacity",
              }}
            />
          </>
        )}
      </motion.button>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes ripple {
          0%   { transform: scale(1);    opacity: 0.5; }
          70%  { transform: scale(1.85); opacity: 0;   }
          100% { transform: scale(1.85); opacity: 0;   }
        }
      `}</style>
    </>
  );
}
