'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import mymenuaifemserv from '@/components/sublayer/images/mymenuaifemserv.png';
import mainpglogo from '@/components/sublayer/images/mainpglogo.png';

const WelcomeScreen = () => {
  const [email, setEmail] = useState('');

  const handleWaitlist = () => {
    // TODO: Implement waitlist functionality
    console.log('Email submitted:', email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 w-screen overflow-y-auto">
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        MyMenuAI
      </h1>
      <div className="flex flex-col items-center mb-8">
        <Image
          src={mainpglogo}
          width={200}
          height={100}
          alt="Picture of the author"
        />
        <div className="text-lg text-center mb-4">
          <p className="text-blue-300 font-bold">
            So many options what to eat?
          </p>
          <br />
          <p className="text-blue-700 font-bold">
            A Million Restaurant Menus, Customized to Your Taste & Health
          </p>
          <p>
            Instantly analyzes restaurant menus to recommend dishes matching
            your taste, cultural background,
            <br /> and nutritional goals, while providing detailed nutritional
            insights. Gracy offers <br /> real-time support, ensuring confident
            culinary exploration and informed dining choices.
          </p>
        </div>
      </div>

      <div className="flex space-x-2 mb-8">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-64"
        />
        <Button onClick={handleWaitlist}>Join Waitlist</Button>
      </div>

      <div className="mt-8 text-center">
        <h1 className="text-3xl font-bold mb-8 ">Meet Gracy!</h1>
        <Image
          src={mymenuaifemserv}
          width={200}
          height={100}
          alt="Meet Gracy"
        />
        <h2 className="text-3xl font-bold mb-8">She can provide...</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            Personalized Recommendations
          </h2>
          <p className="text-lg">
            Instantly analyze any restaurant menu and discover dishes that match
            your taste preferences, cultural background, and nutritional goals.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            Nutritional Insights
          </h2>
          <p className="text-lg">
            Get detailed nutritional information for each dish, helping you make
            informed choices that align with your health objectives.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            Culinary Exploration
          </h2>
          <p className="text-lg">
            Step out of your comfort zone and try new dishes with confidence,
            knowing Gracy understands your likes and dietary needs.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            Chatbot Assistance
          </h2>
          <p className="text-lg">
            Receive real-time support and answers to your dining questions
            through Gracy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
