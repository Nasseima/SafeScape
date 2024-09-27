import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { Plane, Calendar, MapPin, Info, ArrowRight, Globe, DollarSign, Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs";

import delta from '../assets/Airplanes/Delta.jpg';
import jetBlue from '../assets/Airplanes/JetBlue.jpg';
import americanAirlines from '../assets/Airplanes/AmericanAirlines.jpg';
import SouthwestAirlines from '../assets/Airplanes/SouthwestAirlines.jpg';

const FlightPage = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const query = `from=${encodeURIComponent(origin)}&to=${encodeURIComponent(destination)}&departureDate=${encodeURIComponent(departureDate)}&returnDate=${encodeURIComponent(returnDate)}`;
    window.open(`https://www.google.com/flights?hl=en#flt=${query}`, '_blank');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-5xl font-bold mb-8 text-center text-blue-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Your Next Adventure
        </motion.h1>

        {/* Flight Search Form */}
        <motion.div {...fadeInUp}>
          <Card className="mb-8 overflow-hidden">
            <CardContent className="p-6 bg-white bg-opacity-80 backdrop-blur-md">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">Search for Flights</h2>
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-blue-600" />
                  <Input
                    type="text"
                    placeholder="From"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    required
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="text-blue-600" />
                  <Input
                    type="text"
                    placeholder="To"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-blue-600" />
                  <Input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-blue-600" />
                  <Input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plane className="mr-2 h-4 w-4" /> Search Flights
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Flight Information Tabs */}
        <motion.div {...fadeInUp} className="mb-8">
          <Tabs defaultValue="routes" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 bg-blue-100 rounded-lg p-1">
              <TabsTrigger value="routes">Popular Routes</TabsTrigger>
              <TabsTrigger value="resources">Travel Resources</TabsTrigger>
              <TabsTrigger value="tips">Travel Tips</TabsTrigger>
            </TabsList>
            <TabsContent value="routes">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">Popular Routes</h3>
                  <ul className="space-y-2">
                    {['New York (JFK) to Los Angeles (LAX)', 'Chicago (ORD) to Miami (MIA)', 'San Francisco (SFO) to Seattle (SEA)', 'Boston (BOS) to San Diego (SAN)', 'Las Vegas (LAS) to Denver (DEN)'].map((route, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Plane className="text-blue-600 h-4 w-4" />
                        <span>{route}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="resources">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">Top Travel Resources</h3>
                  <ul className="space-y-2">
                    {[
                      { name: 'Skyscanner', url: 'https://www.skyscanner.com' },
                      { name: 'Kayak', url: 'https://www.kayak.com' },
                      { name: 'Google Flights', url: 'https://www.google.com/flights' },
                      { name: 'Expedia', url: 'https://www.expedia.com' },
                      { name: 'Travelocity', url: 'https://www.travelocity.com' }
                    ].map((resource, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Globe className="text-blue-600 h-4 w-4" />
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {resource.name}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tips">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">Travel Tips</h3>
                  <ul className="space-y-2">
                    {[
                      { title: 'Packing Tips for a Smooth Journey', icon: Plane },
                      { title: 'How to Beat Jet Lag', icon: Calendar },
                      { title: 'Travel on a Budget', icon: DollarSign },
                      { title: 'Travel Safety Tips', icon: Shield },
                      { title: 'Understanding Local Cultures', icon: Globe }
                    ].map((tip, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <tip.icon className="text-blue-600 h-4 w-4" />
                        <a href={`/tips/${tip.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 hover:underline">
                          {tip.title}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Featured Airlines */}
        <motion.div {...fadeInUp}>
          <Card className="mb-8 overflow-hidden">
            <CardContent className="p-6 bg-white bg-opacity-80 backdrop-blur-md">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">Featured Airlines</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[delta, jetBlue, americanAirlines, SouthwestAirlines].map((airline, index) => (
                  <motion.img 
                    key={index}
                    src={airline} 
                    alt={`Airline ${index + 1}`} 
                    className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQs */}
        <motion.div {...fadeInUp}>
          <Card>
            <CardContent className="p-6 bg-white bg-opacity-80 backdrop-blur-md">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">Frequently Asked Questions (FAQs)</h2>
              <div className="space-y-4">
                {[
                  {
                    question: "What is the best time to book flights?",
                    answer: "Generally, booking 2-3 months in advance provides the best prices. However, this can vary based on the destination and season."
                  },
                  {
                    question: "Can I change or cancel my flight?",
                    answer: "Most airlines allow changes or cancellations, but fees and policies vary. Check with the airline or travel agency for details."
                  },
                  {
                    question: "How can I find the best flight deals?",
                    answer: "Use flight search engines, compare prices across different platforms, and look for special promotions or discounts."
                  }
                ].map((faq, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <h4 className="font-semibold text-blue-700 flex items-center">
                      <Info className="mr-2 h-4 w-4" />
                      {faq.question}
                    </h4>
                    <p className="mt-1 text-gray-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FlightPage;