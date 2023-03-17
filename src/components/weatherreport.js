import { useState, useEffect } from 'react';
import axios from 'axios';

const Trihourly = () => {
  return (
    <div className='trihourly'>
      <div className='trihourly-item'>15:00</div>
      <div className='trihourly-item'>15:00</div>
      <div className='trihourly-item'>15:00</div>
      <div className='trihourly-item'>15:00</div>
      <div className='trihourly-item'>15:00</div>
    </div>
  );
};

const Card = ({ fetchResult, err, isLoaded }) => {
  // Should probably parse the fetchResult into variables here at the top?
  // also remember to do datetime manipulation YAY
  // also remember to handle precipitation!

  const addOrdinalSuffixTo = (number) => {
    const i = number;
    const j = i % 10,
      k = i % 100;

    if (j === 1 && k !== 11) {
      return number + 'st';
    }
    if (j === 2 && k !== 12) {
      return number + 'nd';
    }
    if (j === 3 && k !== 13) {
      return number + 'rd';
    }
    return number + 'th';
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (fetchResult) {
    console.log(fetchResult);
    return (
      <div className='card'>
        <div className='card-row'>
          <div className='card-item align-center'>
            <p className='city'>{fetchResult.name}</p>
            <p className='secondary-text weather-description'>
              {capitalize(fetchResult.weather[0].description)}
            </p>
          </div>
          <div className='card-item flex primary-temperature'>
            <img
              className='card-weather-icon'
              src={`https://openweathermap.org/img/wn/${fetchResult.weather[0].icon}@2x.png`}
              alt={`Icon for current weather: ${capitalize(
                fetchResult.weather[0].description
              )}`}
            ></img>
            <p className='align-center'>
              {Math.round(fetchResult.main.temp)} &deg;C
            </p>
          </div>
        </div>
        <div className='card-row'>
          <div className='card-item align-end'>
            <p className='date'>May 2nd</p>
            <p className='secondary-text'>12:00</p>
          </div>
          <div className='card-item'>
            <p className='secondary-text'>Wind: {fetchResult.wind.speed} m/s</p>
            <p className='secondary-text'>
              Humidity: {fetchResult.main.humidity} %
            </p>
            <p className='secondary-text'>Precipitation (3h): 0 mm</p>
          </div>
        </div>
      </div>
    );
  }
  if (err) {
    return (
      <div className='card'>
        <div className='error'>Something unexpected occurred :/</div>
      </div>
    );
  }
  if (isLoaded) {
    return (
      <div className='card'>
        <div className='skeleton-placeholder'>LOADING...</div>
      </div>
    );
  }
  return null;
};

const WeatherReport = ({ fetchUrl }) => {
  const [fetchResult, setFetchResult] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(fetchUrl);
        // console.log(response.data);
        setFetchResult(response.data);
      } catch (err) {
        setFetchResult(null);
        setError(err.message);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchWeather();
  }, [fetchUrl]);

  return (
    <div className='report-container'>
      <Card fetchResult={fetchResult} err={error} isLoaded={isLoaded} />
    </div>
  );
};

export default WeatherReport;
