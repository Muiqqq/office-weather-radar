import { useState, useEffect, useContext } from 'react';
import { ErrorContext } from '../App';
import axios from 'axios';
import Forecast from './forecast';
import WeatherCard from './weatherCard';

const BASE_URL = `/api`;
const LANG = 'en';
const UNITS = 'metric';

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

  const weatherParams = new URLSearchParams({
    lat,
    lon,
    lang: LANG,
    units: UNITS,
  });

  const forecastParams = new URLSearchParams({
    lat,
    lon,
    lang: LANG,
    units: UNITS,
    cnt: 5,
  });

  const currentWeatherURL = `${BASE_URL}?endpoint=weather&${weatherParams}`;
  const forecastURL = `${BASE_URL}?endpoint=forecast&${forecastParams}`;

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
