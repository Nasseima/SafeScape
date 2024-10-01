import React, { useState, useEffect } from 'react';
import { Sun, Moon, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <footer className="bg-gradient-to-r from-[#2F2F2F] to-[#1A1A1A] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-3xl font-bold mb-4 text-[#02C39A]">SafeScape</h3>
            <p className="mb-4 text-gray-300">Embark on extraordinary journeys and create unforgettable memories with SafeScape.</p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-[#05668D] p-3 rounded-full">
                {time.getHours() >= 6 && time.getHours() < 18 ? (
                  <Sun className="h-6 w-6" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </div>
              <div className="text-2xl font-bold text-[#02C39A]">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Mail size={18} />
              <a href="mailto:safescape.travel@gmail.com" className="hover:text-[#02C39A] transition-colors duration-200">
                safescape.travel@gmail.com
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 text-[#02C39A]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/places" className="hover:text-[#02C39A] transition-colors duration-200 flex items-center">
                  <MapPin size={18} className="mr-2" />
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/safety" className="hover:text-[#02C39A] transition-colors duration-200 flex items-center">
                  <Shield size={18} className="mr-2" />
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#02C39A] transition-colors duration-200 flex items-center">
                  <Phone size={18} className="mr-2" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} SafeScape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;