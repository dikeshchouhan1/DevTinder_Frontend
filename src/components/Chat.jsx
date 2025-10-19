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

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("Join Chat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("receiveMessage", ({ firstName, text }) => {
      setMessages((message) => [...messages, { firstName, text }]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setMessages((message) => [...messages, { firstName: user.firstName, text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col max-w-md w-full mx-auto my-30 h-[70vh] bg-gray-900 border border-gray-700 rounded-2xl shadow-lg overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-white font-semibold text-md sm:text-lg">
        <span>💬 Chat with {targetUserId || "User"}</span>
        <span className="text-green-400 text-sm">● Online</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-800 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.firstName === user.firstName ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-2xl max-w-[70%] break-words shadow ${
                msg.firstName === user.firstName
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
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-full text-sm transition transform hover:scale-105"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
