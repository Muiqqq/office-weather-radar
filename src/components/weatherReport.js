import { useState, useEffect, useContext } from 'react';
import { ErrorContext } from '../App';
import axios from 'axios';
import Forecast from './forecast';
import WeatherCard from './weatherCard';

// Should not have secrets anywhere near a React app as they are visible in
// the build! Proper way might be to make our own backend API which would store
// the secrets and handle the actual fetching from OpenWeatherMap, and use
// it as a proxy.
const APIKEY = `${process.env.REACT_APP_API_KEY}`;

// Api call options
const options = {
  lang: 'en',
  units: 'metric',
  count: 5,
};

/**
 * A Weather Report component for one location.
 *
 * Consists of a card (displays current weather) and a list of 3h forecasts.
 * @param lat - Latitude coordinate
 * @param lon - Longitude coordinate
 * @returns A Weather Report React component.
 */
const WeatherReport = ({ lat, lon }) => {
  const setErrorMessage = useContext(ErrorContext);
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=${options.units}&lang=${options.lang}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=${options.units}&lang=${options.lang}&cnt=${options.count}`;

  // Side effect for fetching data for both current weather and forecasts
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const currentWeatherResponse = await axios.get(currentWeatherURL);
        const forecastWeatherResponse = await axios.get(forecastURL);
        setCurrentWeatherData(currentWeatherResponse.data);
        setForecastData(forecastWeatherResponse.data);
      } catch (err) {
        setErrorMessage(err.message);
        setCurrentWeatherData(null);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchWeather();
  }, [currentWeatherURL, forecastURL, setErrorMessage]);

  return (
    <div className='report-container'>
      <WeatherCard data={currentWeatherData} isLoaded={isLoaded} />
      <Forecast data={forecastData} />
    </div>
  );
};

export default WeatherReport;
