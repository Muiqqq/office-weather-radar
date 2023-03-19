import { useState, useEffect } from 'react';
import axios from 'axios';
import Forecast from './forecast';
import WeatherCard from './weatherCard';

const WeatherReport = ({ currentWeatherURL, forecastURL }) => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const currentWeatherResponse = await axios.get(currentWeatherURL);
        const forecastWeatherResponse = await axios.get(forecastURL);
        setCurrentWeatherData(currentWeatherResponse.data);
        setForecastData(forecastWeatherResponse.data);
      } catch (err) {
        setCurrentWeatherData(null);
        setError(err.message);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchWeather();
  }, [currentWeatherURL, forecastURL]);

  return (
    <div className='report-container'>
      <WeatherCard data={currentWeatherData} err={error} isLoaded={isLoaded} />
      <Forecast data={forecastData} err={error} isLoaded={isLoaded} />
    </div>
  );
};

export default WeatherReport;
