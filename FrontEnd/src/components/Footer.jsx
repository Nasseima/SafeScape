import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const Footer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(clockTimer);
    };
  }, []);

  return (
    <footer className="bg-[#2F2F2F] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">SafeScape</h3>
            <p className="mb-4">Embark on extraordinary journeys and create unforgettable memories with SafeScape.</p>
            <div className="flex items-center space-x-4">
              <div className="bg-[#05668D] p-3 rounded-full">
                {time.getHours() >= 6 && time.getHours() < 18 ? (
                  <Sun className="h-6 w-6" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </div>
              <div className="text-2xl font-bold">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          {['Destinations'].map((section, index) => (
            <div key={index}>
              <h4 className="text-xl font-semibold mb-4">{section}</h4>
              <ul className="space-y-2">
                {['Link 1', 'Link 2', 'Link 3'].map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="hover:text-[#02C39A] transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 SafeScape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;