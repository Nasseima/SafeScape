import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import pictureOne from '../assets/CarouselImages/destination.jpg';
import pictureTwo from '../assets/CarouselImages/Activities.jpg'
import pictureThree from '../assets/CarouselImages/hotel.jpg';
import pictureFour from '../assets/CarouselImages/laws.jpg';
import './Carousel.css';  // Assuming you're using external CSS for additional styling

const slides = [
  { image: pictureOne, text: 'Visit Popular Destinations', link: '/destinations' },
  { image: pictureTwo, text: 'Discover Exciting Activities', link: '/activities' },
  { image: pictureThree, text: 'Explore the best Hotels', link: '/hotels' },
  { image: pictureFour, text: 'Learn About Local Laws', link: '/laws' }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 3000); // Auto-rotate every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full relative">
            <img className="w-full h-60 object-cover" src={slide.image} alt={`Slide ${index + 1}`} />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <Link to={slide.link} className="text-center text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600">
                <h2 className="text-lg font-bold">{slide.text}</h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
      >
        &#10094;
      </button>
      <button
        onClick={() => setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
      >
        &#10095;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
