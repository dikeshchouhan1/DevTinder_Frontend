import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user);
  const userId = user?._id;

  // 🔹 Store socket reference
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    // ✅ Create socket only once
    const socket = createSocketConnection();
    socketRef.current = socket;

    // Join chat room
    socket.emit("Join Chat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    // Listen for incoming messages
    socket.on("receiveMessage", ({ firstName, text }) => {
      
      setMessages((message) => [...message, { firstName, text }]);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      
    };
  }, [userId, targetUserId]);

  // ✅ Send message using same socket
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    if (!socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    // Add message to UI instantly

    setNewMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto my-8 flex flex-col h-[80vh] bg-[#121212] border border-gray-700 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 text-lg font-semibold text-gray-200 flex justify-between items-center bg-[#1e1e1e] rounded-t-2xl">
        <span>💬 Chat with {targetUserId || "User"}</span>
        <span className="text-sm text-green-400">● Online</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#181818] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.firstName === user.firstName ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[75%] break-words shadow ${
                msg.firstName === user.firstName
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-700 text-white rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 bg-[#1e1e1e] flex items-center gap-3 rounded-b-2xl">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-[#2b2b2b] text-white placeholder-gray-400 border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
