import React, { useState } from 'react';
import './WeatherWidget.css';
import clear from '../assets/images/clear.png';
import cloud from '../assets/images/cloud.png';
import mist from '../assets/images/mist.png';
import rain from '../assets/images/rain.png';
import snow from '../assets/images/snow.png';
import errorImg from '../assets/images/404.png';
import { FaSearch, FaWater, FaWind } from 'react-icons/fa';

const WeatherWidget = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091'; // Replace with your API key

    const fetchWeather = async () => {
        if (city === '') return;

        setLoading(true);
        setError(false);

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`);
            const data = await response.json();

            if (data.cod === '404') {
                setError(true);
                setWeatherData(null);
            } else {
                setWeatherData(data);
                setError(false);
            }
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    const getWeatherIcon = (main) => {
        switch (main) {
            case 'Clear':
                return <img src={clear} alt="Clear" className="w-12 h-12 mx-auto" />;
            case 'Rain':
                return <img src={rain} alt="Rain" className="w-12 h-12 mx-auto" />;
            case 'Snow':
                return <img src={snow} alt="Snow" className="w-12 h-12 mx-auto" />;
            case 'Clouds':
                return <img src={cloud} alt="Clouds" className="w-12 h-12 mx-auto" />;
            case 'Mist':
                return <img src={mist} alt="Mist" className="w-12 h-12 mx-auto" />;
            default:
                return <img src={cloud} alt="Unknown" className="w-12 h-12 mx-auto" />;
        }
    };

    return (
        <div className="flex flex-col items-center p-4 mb-5">
            <h1 className="text-lg font-bold text-blue-800 mb-2">
                Weather Checker
            </h1>
            <div className="w-64 h-64 p-4 bg-[#F26419] rounded-lg shadow-lg flex flex-col items-center text-white overflow-hidden">
                <form onSubmit={handleSearch} className="flex items-center space-x-1 mb-2 w-full">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value.toUpperCase())}
                        placeholder="City"
                        className="flex-grow p-1 border border-gray-300 rounded-lg text-gray-800 capitalize text-xs"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-1 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        <FaSearch className="text-lg" />
                    </button>
                </form>

                {loading && <p className="text-gray-300 text-xs">Loading...</p>}

                {error && (
                    <div className="text-red-300 text-center flex flex-col items-center">
                        <img src={errorImg} alt="Error" className="w-16 h-16 mb-2" />
                        <p className="text-xs">Oops! Location not found!</p>
                    </div>
                )}

                {weatherData && (
                    <div className="flex flex-col items-center w-full">
                        <div className="flex flex-col items-center mb-2">
                            {getWeatherIcon(weatherData.weather[0].main)}
                            <p className="text-3xl font-bold mt-1">
                                {Math.round(weatherData.main.temp)}<span className="text-sm">°F</span>
                            </p>
                            <p className="text-xs capitalize">{weatherData.weather[0].description}</p>
                        </div>

                        <div className="flex justify-between w-full mt-2 space-x-1">
                            <div className="flex flex-col items-center">
                                <FaWater className="text-blue-300 text-xl mb-1" />
                                <span className="text-lg font-bold">{weatherData.main.humidity}%</span>
                                <span className="text-xs">Humidity</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaWind className="text-gray-300 text-xl mb-1" />
                                <span className="text-lg font-bold">{Math.round(weatherData.wind.speed)} Km/h</span>
                                <span className="text-xs">Wind Speed</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherWidget;

    //APIKey = 98740f4ebc0d63bc0f8ba70090e5a091