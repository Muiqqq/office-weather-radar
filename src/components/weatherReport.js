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
  const parsePrecipitationFrom = (fetchResult) => {
    // console.log(fetchResult);

    // return to this to make sure it works!!!
    if (fetchResult.snow && '3h' in fetchResult.snow) {
      return fetchResult.snow['3h'];
    }
    if (fetchResult.rain && '3h' in fetchResult.rain) {
      return fetchResult.rain['3h'];
    }
    return 0;
  };

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
    const cityName = fetchResult.name;
    const weatherDescription = capitalize(fetchResult.weather[0].description);
    const iconSrc = `https://openweathermap.org/img/wn/${fetchResult.weather[0].icon}@2x.png`;
    const temperature = Math.round(fetchResult.main.temp);
    const precipitation3h = parsePrecipitationFrom(fetchResult);

    // Datetime from OpenWeatherMap comes as seconds, multiply to milliseconds
    // to get correct datetime with Date
    const timestamp = new Date(fetchResult.dt * 1000);
    const month = timestamp.toLocaleString('default', { month: 'short' });
    const day = timestamp.toLocaleString('default', { day: 'numeric' });
    const time = new Date(Date.now()).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const windSpeed = fetchResult.wind.speed;
    const humidity = fetchResult.main.humidity;

    return (
      <div className='card'>
        <div className='card-row'>
          <div className='card-item align-center'>
            <p className='city'>{cityName}</p>
            <p className='weather-description secondary-text'>
              {weatherDescription}
            </p>
          </div>
          <div className='card-item flex primary-temperature'>
            <img
              className='card-weather-icon'
              src={iconSrc}
              alt={`Icon for current weather: ${weatherDescription}`}
            ></img>
            <p className='temperature align-center'>{temperature} &deg;C</p>
          </div>
        </div>
        <div className='card-row'>
          <div className='card-item align-end'>
            <p className='date'>{`${month} ${addOrdinalSuffixTo(day)}`}</p>
            <p className='time secondary-text'>{time}</p>
          </div>
          <div className='card-item'>
            <p className='wind-speed secondary-text'>Wind: {windSpeed} m/s</p>
            <p className='humidity secondary-text'>Humidity: {humidity} %</p>
            <p className='precipitation secondary-text'>
              Precipitation (3h): {precipitation3h} mm
            </p>
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
  if (!isLoaded) {
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
