"use client";
import { useState } from 'react';
import { Link } from 'next-view-transitions';


export default function FloatingNav() {
  const [activeTab, setActiveTab] = useState('text');

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[0.68] sm:scale-100">
      <div className="bg-black rounded-full h-[132px] flex items-center justify-center px-8 shadow-lg transition-transform duration-300 ease-in-out hover:scale-108">
        <Link href="/ai-text-generator" 
              className={`text-3xl ${activeTab === 'text' ? 'font-bold' : 'font-normal'} text-gray-200 hover:font-bold transition-all duration-300 mr-6`}
              onMouseEnter={() => setActiveTab('text')}>
          AI TEXT
        </Link>
        <Link href="/ai-response-generator" 
              className={`text-3xl ${activeTab === 'response' ? 'font-bold' : 'font-normal'} text-gray-200 hover:font-bold transition-all duration-300`}
              onMouseEnter={() => setActiveTab('response')}>
          AI RESPONSE
        </Link>
      </div>
    </div>
  );
}