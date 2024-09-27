import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import HomePage from './components/Homepage';
import HotelsPage from './components/HotelsPage';
import ActivitiesPage from './components/ActivitiesPage';
import LawsPage from './components/LawsPage';
import DestinationsPage from './components/DestinationsPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar';
import CalenderPage from './components/CalenderPage';
import FlightsPage from './components/FlightsPage';
import Places from './components/PlacesPage';
import Footer from './components/Footer';
import ActivityDetails from './components/ActivityDetails';
import HotelDetails from './components/HotelDetails';
import FavoritesPage from './components/FavoritesPage'
import ContactUsPage from './components/ContactUsPage'
import SafetyTipsPage from './components/SafetyTipsPage'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username')
    // console.log(username)
  
    if (token) {
      fetch('http://localhost:8081/api/auth/validate-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Token validation failed');
        }
        // Try to parse response as JSON
        return response.text(); // Change this to text to handle both cases
      })
      .then(data => {
        // Check if data is JSON or plain text
        try {
          const jsonData = JSON.parse(data); // Try parsing as JSON
          setIsAuthenticated(true);
          setUsername(jsonData.username);
        } catch (e) {
          // Handle the case where the response is just a plain string
          if (data === "Token is valid") {
            setIsAuthenticated(true);
          } else {
            throw new Error('Unexpected response from server');
          }
        }
      })
      .catch(error => {
        console.error('Token validation error:', error.message);
        localStorage.removeItem('token'); // Clear token on error
        setIsAuthenticated(false);
        setUsername('');
      });
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} username={username} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/laws" element={<LawsPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/calendar" element={
          isAuthenticated ? <CalenderPage /> : <Navigate to="/login" replace />
        } />
        <Route path="/login" element={
          <LoginPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />
        } />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/flight" element={<FlightsPage />} />
        <Route path="/places" element={<Places />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/safety" element={<SafetyTipsPage />} />
        <Route path="/activities/:ActivitysId/activities" element={<ActivityDetails />} />
        <Route path="/hotels/:hotelsId/hotels" element={<HotelDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
