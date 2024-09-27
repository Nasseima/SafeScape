import React, { useEffect, useState } from 'react';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch('/api/places');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="places-container">
      <h1>Explore Destinations</h1>
      <div className="places-grid">
        {places.map(place => (
          <div key={place.id} className="place-card">
            <img src={place.url} alt={place.city} />
            <h2>{place.city}, {place.country}</h2>
            <p>{place.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesPage;
