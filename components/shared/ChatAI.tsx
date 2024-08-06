'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatAIProps {
  messages: Array<{ text: string; isUser: boolean }>;
  setMessages: React.Dispatch<
    React.SetStateAction<Array<{ text: string; isUser: boolean }>>
  >;
}

const ChatAI: React.FC<ChatAIProps> = ({ messages, setMessages }) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { text: input, isUser: true }]);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: input,
      });

      // Add AI's response to chat
      setMessages((prev) => [
        ...prev,
        { text: response.data.message, isUser: false },
      ]);
    } catch (error) {
      console.error('Error fetching response from AI:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, there was an error. Please try again.', isUser: false },
      ]);
    }

    setInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ScrollArea className="h-[400px] border rounded-md p-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-md ${
              message.isUser ? 'bg-blue-100 text-right' : 'bg-gray-100'
            }`}
          >
            {message.text}
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default ChatAI;
