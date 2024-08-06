'use client';
import React, { useState } from 'react';
import axios from 'axios';

const ChatAI: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { text: input, isUser: true }]);

    try {
      const response = await axios.post('/api/claude', { message: input });

      // Add Claude's response to chat
      setMessages((prev) => [
        ...prev,
        { text: response.data.message, isUser: false },
      ]);
    } catch (error) {
      console.error('Error fetching response from Claude:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, there was an error. Please try again.', isUser: false },
      ]);
    }

    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? 'user' : 'claude'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="chat-input"
        />
        <button type="submit" className="chat-submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatAI;
