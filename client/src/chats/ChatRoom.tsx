// src/components/ChatRoom.tsx
import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

interface Message {
  _id: string;
  user: string;
  message: string;
  timestamp?: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // Connect socket and fetch messages
  useEffect(() => {
    socketRef.current = io(API_URL);
    const socket = socketRef.current;

    socket.on("connect", () => {
      setSocketConnected(true);
    });

    socket.on("disconnect", () => {
      setSocketConnected(false);
    });

    // Fetch existing messages
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_URL}/messages`);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Listen for new messages
    socket.on("message", (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!user.trim() || !message.trim() || !socketRef.current) return;

    const newMessage = { user, message };
    socketRef.current.emit("sendMessage", newMessage);
    setMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>💬 Realtime Chat Room</h2>
        <span className={`status ${socketConnected ? "online" : "offline"}`}>
          {socketConnected ? "Online" : "Offline"}
        </span>
      </div>

      <div className="chat-box">
        {loading ? (
          <p className="loading">Loading messages...</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`chat-message ${
                msg.user === user ? "my-message" : "other-message"
              }`}
            >
              <strong>{msg.user}</strong>
              <p>{msg.message}</p>
              {msg.timestamp && (
                <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="chat-inputs">
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
