
import React from 'react';

const PlaceCarousel = ({ images }) => {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Image ${index + 1}`}
            className="w-full h-40 object-cover"
          />
        ))}
      </div>
      {/* Add navigation buttons or indicators if desired */}
    </div>
  );
};

export default PlaceCarousel;

