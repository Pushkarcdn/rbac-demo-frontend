/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import config from "@/config/index";

const MessageItem = ({ message }: { message: any }) => {
  const isSystem = message.sender === "System";

  const formatTime = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid time";
    }
  };

  return (
    <div className={`mb-4 ${message.isMe ? "flex justify-end" : ""}`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          message.isMe
            ? "bg-primary text-white rounded-tr-none"
            : isSystem
            ? "bg-gray-200 text-gray-700 italic"
            : "bg-white border border-gray-200 rounded-tl-none"
        }`}
      >
        {!isSystem && (
          <div
            className={`font-semibold text-sm ${
              message.isMe ? "text-gray-100" : "text-gray-600"
            }`}
          >
            {message.isMe ? "You" : `User ${message.sender.substring(0, 6)}`}
          </div>
        )}
        <div>{message.content}</div>
        <div
          className={`text-xs mt-1 text-right ${
            message.isMe ? "text-gray-100" : "text-gray-500"
          }`}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

const Messaging = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Process incoming message data
  const processMessageData = (data: any): any | null => {
    if (typeof data === "object" && data !== null) {
      let content = "";
      let sender = "Unknown";
      let timestamp = new Date().toISOString();

      content = data?.content?.content || "";
      sender = data?.content?.sender || data?.sender || "Unknown";
      timestamp = data?.content?.timestamp || data?.timestamp || timestamp;

      return { sender, content, timestamp, isMe: false };
    }

    return null;
  };

  useEffect(() => {
    // Connect to WebSocket server
    const socket = io(config.BE_URL || "", {
      path: "/socket.io",
      withCredentials: true,
    });

    socketRef.current = socket;

    // Set up event listeners
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from WebSocket server");
    });

    // Handle incoming messages
    socket.on("message", (data) => {
      try {
        const processedMessage = processMessageData(data);

        if (
          processedMessage &&
          processedMessage.sender !== socketRef.current?.id
        ) {
          setMessages((prev) => [...prev, processedMessage]);
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() && socketRef.current) {
      const timestamp = new Date().toISOString();
      const sender = socketRef.current?.id || "me";

      // Add message to local state and send to server
      const newMessage = {
        sender,
        content: message,
        timestamp,
        isMe: true,
      };

      setMessages((prev) => [...prev, newMessage]);
      socketRef.current.emit("message", {
        content: message,
        timestamp,
        sender,
      });

      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Live Chat</h1>
        <div className="flex items-center">
          <span
            className={`h-3 w-3 rounded-full mr-2 ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          <span>{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-grow bg-gray-50 rounded-lg p-4 overflow-y-auto mb-4 border border-gray-200">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => (
            <MessageItem key={index} message={msg} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input form */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border border-gray-300 rounded-md px-4 py-2"
          disabled={!isConnected}
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!isConnected || !message.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Messaging;
