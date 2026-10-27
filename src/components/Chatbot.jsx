import { useEffect, useRef, useState } from "react";

const welcomeMessage = {
  role: "assistant",
  text:
    "Hello! I’m the store’s AI assistant. Ask about our range, opening hours or visiting us.",
};

const suggestions = [
  {
    label: "Opening hours",
    question: "What are your opening hours?",
  },
  {
    label: "Delivery",
    question: "Can you arrange delivery?",
  },
  {
    label: "Our range",
    question: "What do you sell?",
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([welcomeMessage]);
  const [isSending, setIsSending] = useState(false);

  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  const inputRef = useRef(null);
  const consentRef = useRef(null);
  const logRef = useRef(null);
  const requestInProgress = useRef(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const log = logRef.current;

    if (log) {
      log.scrollTop = log.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  function closeChat() {
    setIsOpen(false);
    toggleRef.current?.focus();
  }

  function clearChat() {
    if (requestInProgress.current) return;

    setMessages([welcomeMessage]);
    setQuestion("");
    setStatus("");
    inputRef.current?.focus();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const text = question.trim();

    if (!text || requestInProgress.current) return;

    if (!consent) {
      setStatus(
        "Please agree to send your messages to Google Gemini before chatting."
      );
      consentRef.current?.focus();
      return;
    }

    if (text.length > 2000) {
      setStatus("Please keep your question under 2,000 characters.");
      return;
    }

    // Do not send the introductory welcome message to Gemini.
    const history = messages.slice(1).map((message) => ({
      role: message.role === "customer" ? "user" : "model",
      text: message.text,
    }));

    // Keep up to six previous exchanges plus the current question.
    const conversation = [
      ...history.slice(-12),
      { role: "user", text },
    ];

    // Remove the oldest exchanges if the request is too large.
    while (
      conversation.length > 1 &&
      new TextEncoder().encode(
        JSON.stringify({ messages: conversation })
      ).length > 14000
    ) {
      conversation.splice(0, 2);
    }

    requestInProgress.current = true;
    setIsSending(true);
    setStatus("Thinking…");
    setQuestion("");

    setMessages((previous) => [
      ...previous,
      { role: "customer", text },
    ]);

    const controller = new AbortController();
    controllerRef.current = controller;

    let timedOut = false;

    const timeoutId = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 28000);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversation,
        }),
        signal: controller.signal,
      });

      const data = await response.json().catch(() => {
        throw new Error(
          "The server returned an unexpected response. Check that both terminals are running."
        );
      });

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "The assistant is unavailable. Please try again."
        );
      }

      if (typeof data?.reply !== "string" || !data.reply.trim()) {
        throw new Error("No answer was received. Please try again.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: data.reply.trim(),
        },
      ]);

      setStatus("");
    } catch (error) {
      // Leave only completed exchanges in the conversation history.
      setMessages((previous) => previous.slice(0, -1));
      setQuestion(text);

      if (timedOut) {
        setStatus("The request timed out. Please try again.");
      } else if (error.name === "AbortError") {
        setStatus("The request was cancelled.");
      } else if (error instanceof TypeError) {
        setStatus(
          "Could not connect. Check that the backend terminal is still running."
        );
      } else {
        setStatus(
          error.message || "Something went wrong. Please try again."
        );
      }
    } finally {
      clearTimeout(timeoutId);
      controllerRef.current = null;
      requestInProgress.current = false;
      setIsSending(false);
    }
  }

  return (
    <>
      <button
        id="chat-toggle"
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="store-chat"
        onClick={() => {
          if (isOpen) {
            closeChat();
          } else {
            setIsOpen(true);
          }
        }}
      >
        <span aria-hidden="true">✦</span>
        Ask us
        <span className="ai-badge">AI</span>
      </button>

      <section
        id="store-chat"
        aria-labelledby="chat-title"
        hidden={!isOpen}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            closeChat();
          }
        }}
      >
        <div className="chat-heading">
          <div>
            <h2 id="chat-title">Your essentials assistant</h2>
            <p>AI-powered help · The Essentials Store</p>
          </div>

          <button
            id="chat-close"
            ref={closeRef}
            type="button"
            aria-label="Close chat"
            onClick={closeChat}
          >
            ×
          </button>
        </div>

        <div className="chat-quick">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.label}
              type="button"
              disabled={isSending}
              onClick={() => {
                setQuestion(suggestion.question);
                setStatus("");
                inputRef.current?.focus();
              }}
            >
              {suggestion.label}
            </button>
          ))}
        </div>

        <div
          id="chat-log"
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Conversation"
        >
          {messages.map((message, index) => (
            <p
              key={index}
              className={`chat-message ${message.role}`}
              dir="auto"
            >
              {message.text}
            </p>
          ))}
        </div>

        <p className="chat-disclosure">
          AI answers can be mistaken. Confirm prices, availability and
          arrangements with our team. Please don’t send payment details
          or other sensitive information.
        </p>

        <label className="chat-consent">
          <input
            id="chat-consent"
            ref={consentRef}
            type="checkbox"
            checked={consent}
            disabled={isSending}
            onChange={(event) => {
              setConsent(event.target.checked);
              setStatus("");
            }}
          />

          <span>
            I agree to send my messages and recent conversation to
            Google Gemini to receive replies.
          </span>
        </label>

        <form id="chat-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="chat-input">
            Your question
          </label>

          <input
            id="chat-input"
            ref={inputRef}
            type="text"
            maxLength={2000}
            placeholder="How can we help?"
            autoComplete="off"
            value={question}
            disabled={isSending}
            onChange={(event) => setQuestion(event.target.value)}
            dir="auto"
            required
          />

          <button
            id="chat-send"
            type="submit"
            aria-label={isSending ? "Sending message" : "Send message"}
            disabled={isSending}
          >
            {isSending ? "…" : "↑"}
          </button>
        </form>

        <p id="chat-status" role="status" aria-live="polite">
          {status}
        </p>

        <div className="chat-footer">
          <a href="tel:+441133183217">Call the store</a>

          <a
            href="https://wa.me/447466353588"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp ↗
          </a>

          <button
            id="chat-clear"
            type="button"
            disabled={isSending}
            onClick={clearChat}
          >
            Clear chat
          </button>
        </div>
      </section>
    </>
  );
}