import { useState, useEffect } from 'react';
import axios from 'axios';

const Trihourly = (data, err, isLoaded) => {
  return (
    <div className='trihourly-container'>
      <div className='trihourly-item'>
        <div className='trihourly-top'>
          <p className='secondary-text'>15:00</p>
          <img src={`https://openweathermap.org/img/wn/10d.png`} alt='temp' />
          <p className='trihourly-temperature'>-30&deg;C</p>
        </div>
        <div className='trihourly-bottom'>
          <p className='secondary-text-smaller'>3.5 m/s</p>
          <p className='secondary-text-smaller'>99 %</p>
          <p className='secondary-text-smaller'>0 mm</p>
        </div>
      </div>
    </div>
  );
};

const Card = ({ data, err, isLoaded }) => {
  const parsePrecipitationFrom = (data) => {
    // console.log(data);

    // return to this to make sure it works!!!
    if (data.snow && '3h' in data.snow) {
      return data.snow['3h'];
    }
    if (data.rain && '3h' in data.rain) {
      return data.rain['3h'];
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

  if (data) {
    const cityName = data.name;
    const weatherDescription = capitalize(data.weather[0].description);
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const temperature = Math.round(data.main.temp);
    const precipitation3h = parsePrecipitationFrom(data);

    // Datetime from OpenWeatherMap comes as seconds, multiply to milliseconds
    // to get correct datetime with Date
    const timestamp = new Date(data.dt * 1000);
    const month = timestamp.toLocaleString('default', { month: 'short' });
    const day = timestamp.toLocaleString('default', { day: 'numeric' });
    const time = new Date(Date.now()).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;

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

const WeatherReport = ({ currentWeatherURL, trihourlyWeatherURL }) => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [trihourlyWeatherData, setTrihourlyWeatherData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const currentWeatherResponse = await axios.get(currentWeatherURL);
        const trihourlyWeatherResponse = await axios.get(trihourlyWeatherURL);
        setCurrentWeatherData(currentWeatherResponse.data);
        setTrihourlyWeatherData(trihourlyWeatherResponse.data);
      } catch (err) {
        setCurrentWeatherData(null);
        setError(err.message);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchWeather();
  }, [currentWeatherURL, trihourlyWeatherURL]);

  return (
    <div className='report-container'>
      <Card data={currentWeatherData} err={error} isLoaded={isLoaded} />
      <Trihourly data={trihourlyWeatherData} />
    </div>
  );
};

export default WeatherReport;
