"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Wifi, Battery, Signal } from "lucide-react";

export default function ProfessorRecommender() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/routes/",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Mock status bar */}
        <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center text-xs">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={12} />
          </div>
        </div>

        {/* Chat header */}
        <div className="bg-blue-500 text-white p-4">
          <h1 className="text-xl font-bold">Professor Recommender AI</h1>
        </div>

        {/* Chat messages */}
        <ScrollArea className="h-[500px] p-4 space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "assistant"
                    ? "bg-gray-200 text-gray-800 rounded-bl-none"
                    : "bg-blue-500 text-white rounded-br-none"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Input area */}
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-gray-50 flex items-center space-x-2"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about professors..."
            className="flex-grow"
          />
          <Button type="submit" size="icon" className="rounded-full">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
