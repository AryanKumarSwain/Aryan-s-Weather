import React, { useState, useRef } from 'react';
import axios from 'axios';
import videobg from './assets/WWSvideobg.mp4';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState('');
    const [isMuted, setIsMuted] = useState(true); 

    const videoRef = useRef(null);

    const apiKey = '06ae439148e266cdb068e6c242d6a127';

    const getWeather = async () => {
        if (!city) {
            setError('Please enter a city');
            return;
        }

        setError('');

        try {
            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

            const [currentWeatherResponse, forecastResponse] = await Promise.all([
                axios.get(currentWeatherUrl),
                axios.get(forecastUrl),
            ]);

            setWeatherData(currentWeatherResponse.data);
            setForecastData(forecastResponse.data.list);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching weather data OR Spelling mistake. Please try again.');
        }
    };

    const displayWeather = () => {
        if (!weatherData) return null;

        const temperature = Math.round(weatherData.main.temp - 273.15);
        const description = weatherData.weather[0].description;
        const iconCode = weatherData.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        return (
            <div className="text-white text-center">
                <h2 className="text-2xl font-bold">{weatherData.name}</h2>
                <img className="w-38 h-38 mx-auto" src={iconUrl} alt={description} />
                <div className="text-6xl font-bold">
                    <p>{temperature}°C</p>
                </div>
                <p className="text-xl capitalize">{description}</p>
            </div>
        );
    };

    const displayHourlyForecast = () => {
        if (!forecastData) return null;

        const next24Hours = forecastData.slice(0, 8);

        return (
            <div className=" overflow-x-auto flex space-">
                {next24Hours.map((item, index) => {
                    const dateTime = new Date(item.dt * 1000);
                    const hour = dateTime.getHours();
                    const temperature = Math.round(item.main.temp - 273.15);
                    const iconCode = item.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

                    return (
                        <div key={index} className="flex flex-col items-center w-20 text-white">
                            <span>{hour}:00</span>
                            <img className="w-4 h-4 my-1" src={iconUrl} alt="Hourly Weather Icon" />
                            <span>{temperature}°C</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="relative overflow-hidden">
            <Navbar toggleMute={toggleMute} isMuted={isMuted} />
            <div className="fixed inset-0 z-[-1]">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src={videobg} type="video/mp4" />
                </video>
            </div>

            <div className="relative flex items-center justify-center min-h-screen">
    <div className="relative bg-white bg-opacity-30 m-2 max-w-sm p-5 rounded-xl shadow-lg text-center backdrop-blur-md border border-white border-opacity-20">
        <h2 className="text-white text-3xl mb-4">Weathering with SWAIN</h2>
        <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    getWeather();
                }
            }}
            className="w-full p-2 rounded-lg border border-white text-center bg-transparent placeholder-white text-white mb-4"
        />

        <button
            onClick={getWeather}
            className="bg-purple-400 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full"
        >
            Search
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {displayWeather()}
        {displayHourlyForecast()}
    </div>
</div>

            <Footer />
        </div>
    );
}

export default App;
