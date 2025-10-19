import React, { useState, useRef, useEffect } from "react";

const AIChatUI = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I'm your AI assistant. How can I help you today?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    const userMessage = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    setTimeout(() => {
      const aiResponse = {
        sender: "ai",
        text: `You said: \"${trimmed}\" — I'm here to help! 🤖`,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-2 sm:px-4 py-10 m-auto text-white">
      <div className="w-full max-w-md flex flex-col bg-gray-800 border border-gray-700 rounded-2xl shadow-xl overflow-hidden h-[70vh] sm:h-[75vh] md:h-[80vh]">
        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3">
          <div className="font-semibold text-base sm:text-lg">🤖 AI Chat</div>
          <div className="text-green-300 text-xs sm:text-sm">● Online</div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-900 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 rounded-2xl max-w-[85%] sm:max-w-[80%] text-sm sm:text-base break-words shadow-md ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-700 text-white rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-2 p-3 bg-gray-800 border-t border-gray-700">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full text-sm transition transform hover:scale-105"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatUI;