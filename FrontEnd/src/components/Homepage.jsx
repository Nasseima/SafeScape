import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Card, CardContent } from '../ui/Card'
import { Plane, MapPin, Sun, Search, ArrowRight } from 'lucide-react'
import WeatherWidget from './WeatherWidget'
import './Home.css'

// Carousel Images
import paris from '../assets/places/ParisLouvreMuse.jpg'
import tokyo from '../assets/places/tokyo.jpg'
import newyork from '../assets/places/NewYork.jpg'

import rainbow from '../assets/HomeImg/rainbow.jpg'
import mountains from '../assets/HomeImg/mountains.jpg'
import plane from '../assets/HomeImg/plane.jpg'

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0)

  const images = [plane, rainbow, mountains]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F0F3F5] text-[#2F2F2F]">
      {/* Hero Section with Asymmetrical Layout */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-4 p-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className={`bg-cover bg-center ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
              style={{ backgroundImage: `url(${src})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImage ? 1 : 0.3 }}
              transition={{ duration: 1 }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#05668D]/80 to-transparent flex items-center justify-start p-12">
          <div className="max-w-2xl">
            <motion.h1
              className="text-6xl font-bold text-white mb-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Embark on Extraordinary Journeys
            </motion.h1>
            <motion.p
              className="text-xl text-white mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover hidden gems, create unforgettable memories, and explore the world's wonders
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button className="bg-[#F26419] hover:bg-[#F26419]/90 text-white text-lg px-8 py-6 rounded-full">
                Start Your Adventure <Plane className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Weather Widget and Search Section */}
      <section className="py-12 bg-gradient-to-b from-[#05668D] to-[#02C39A]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-8 text-white">Check the Weather</h2>
              <Card className="bg-white/10 text-white backdrop-blur-md overflow-hidden h-full">
                <WeatherWidget />
              </Card>
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-8 text-white">Find Your Escape</h2>
              <Card className="bg-white/10 text-white backdrop-blur-md overflow-hidden h-full">
                <CardContent className="p-6">
                  <p className="mb-4">Uncover your perfect destination with our intelligent travel search</p>
                  <div className="flex gap-4">
                    <Input placeholder="Where do you want to go?" className="flex-grow bg-white text-[#2F2F2F]" />
                    <Button className="bg-[#F26419] hover:bg-[#F26419]/90">
                      <Search className="mr-2 h-4 w-4" /> Explore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Destination Showcase */}
      <section className="py-12 bg-[#9A8FD9]">
        <h2 className="text-4xl font-bold mb-8 text-white text-center">Trending Destinations</h2>
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8">
          {[
            { img: paris, title: 'PARIS', description: 'Unveil the timeless charm and romance of Paris!' },
            { img: tokyo, title: 'Tokyo', description: 'Immerse yourself in the vibrant pulse of Tokyo!' },
            { img: newyork, title: 'New York', description: 'Experience the unstoppable energy of New York!' },
          ].map((destination, index) => (
            <motion.div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="group relative h-80 rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={destination.img}
                  alt={destination.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/90 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{destination.title}</h3>
                    <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {destination.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Unique Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sun, title: 'Curated Experiences', color: '#F26419' },
              { icon: MapPin, title: 'Local Insights', color: '#02C39A' },
              { icon: Plane, title: 'Personalized Travel Recommendations', color: '#05668D' },
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <feature.icon className={`h-16 w-16 text-[${feature.color}]`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">Experience travel like never before with our unique offerings.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className="py-24 bg-[#05668D] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <blockquote className="text-3xl md:text-5xl font-bold text-center italic">
            "The world is a book, and those who do not travel read only one page."
          </blockquote>
          <p className="text-xl md:text-2xl text-center mt-6">- Saint Augustine</p>
        </div>
        <div className="absolute inset-0 opacity-10">
          <img
            // src="https://ik.imagekit.io/vercel-v0/travel/world-map.png"
            alt="World Map"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Newsletter Section with Unique Design */}
      <section className="py-12 bg-[#F0F3F5]">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-[#02C39A] to-[#05668D] text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold mb-2">Stay Inspired</h2>
                  <p className="text-lg">Get our latest travel tips and exclusive offers delivered to your inbox.</p>
                </div>
                <div className="flex w-full md:w-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white text-[#2F2F2F] rounded-r-none"
                  />
                  <Button className="bg-[#F26419] hover:bg-[#F26419]/90 rounded-l-none">
                    Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}