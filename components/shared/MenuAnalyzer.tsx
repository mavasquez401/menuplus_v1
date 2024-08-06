'use client';

import React, { useState } from 'react';
import axios from 'axios';
import MenuScanner from './MenuScanner';
import ChatAI from './ChatAI';

const MenuAnalyzer: React.FC = () => {
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);

  const handleMenuScanned = async (menuText: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: `Analyze this menu and provide it in a structured plain text format: ${menuText}`,
      });
      setMessages((prev) => [
        ...prev,
        {
          text: "Menu scanned successfully. Here's the structured menu:",
          isUser: false,
        },
        { text: response.data.message, isUser: false },
      ]);
    } catch (error) {
      console.error('Error analyzing menu:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, there was an error analyzing the menu. Please try again.',
          isUser: false,
        },
      ]);
    }
  };

  const handleSectionExtracted = async (section: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: `Extract and provide only the ${section} section from the previously analyzed menu.`,
      });
      setMessages((prev) => [
        ...prev,
        { text: `Extracted ${section} section:`, isUser: false },
        { text: response.data.message, isUser: false },
      ]);
    } catch (error) {
      console.error('Error extracting section:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, there was an error extracting the section. Please try again.',
          isUser: false,
        },
      ]);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <MenuScanner
        onMenuScanned={handleMenuScanned}
        onSectionExtracted={handleSectionExtracted}
      />
      <ChatAI messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default MenuAnalyzer;
