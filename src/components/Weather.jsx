import './Weather.css';
import clear from '../assets/clear.png'; // Default image if no icon is available
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';
import clear_icon from '../assets/clear.png';  // Imported weather icons
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import search_icon from '../assets/search.png'
import { useEffect, useRef, useState } from 'react';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false); // Initialize as null instead of false

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      // Get the appropriate weather icon
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp - 273.15),  // Convert temperature from Kelvin to Celsius
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.log("Error fetching the weather data:", error);
    }
  };

  useEffect(() => {
    search("New York");
  }, []);

  // Loading state if weatherData is not available yet
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} onClick={()=> search(inputRef.current.value)} alt="" />
      </div>
      {/* Displaying the icon and weather data */}
      <img src={weatherData.icon} alt="Weather Icon" className='weather-icon'/>
      <p className='temperature'>{weatherData.temperature}°C</p>
      <p className='location'>{weatherData.location}</p>

      <div className='weather-data'>
        <div className="col">
          <img src={humidity} alt="Humidity Icon" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="Wind Icon" />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
