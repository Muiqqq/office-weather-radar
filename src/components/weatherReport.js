import { useState, useEffect } from 'react';
import axios from 'axios';

// todo: Move things to their own files!!!

const parsePrecipitationFrom = (data) => {
  // return to this to make sure it works!!!
  if (data.snow && '3h' in data.snow) {
    return data.snow['3h'];
  }
  if (data.rain && '3h' in data.rain) {
    return data.rain['3h'];
  }
  return 0;
};

const ForecastItem = ({ data }) => {
  const timestamp = new Date(data.dt * 1000);
  const time = timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  const temperature = Math.round(data.main.temp);
  const windSpeed = data.wind.speed;
  const humidity = data.main.humidity;
  const precipitation3h = Math.round(parsePrecipitationFrom(data));
  return (
    <div className='forecast-item'>
      <div className='forecast-top'>
        <p className='time'>{time}</p>
        <img src={iconSrc} alt='temp' />
        <p className='forecast-temperature'>{temperature}&deg;C</p>
      </div>
      <div className='forecast-bottom'>
        <p className='wind-speed'>{windSpeed} m/s</p>
        <p className='humidity'>{humidity} %</p>
        <p className='precipitation'>{precipitation3h} mm</p>
      </div>
    </div>
  );
};

const Forecast = ({ data, err, isLoaded }) => {
  if (data) {
    const forecasts = data.list.map((elem) => {
      return <ForecastItem data={elem} key={elem.dt} />;
    });
    return <div className='forecast-container'>{forecasts}</div>;
  }
  return null;
};

const Card = ({ data, err, isLoaded }) => {
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
    const precipitation3h = Math.round(parsePrecipitationFrom(data));

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
          <div className='card-item current-main'>
            <p className='city'>{cityName}</p>
            <p className='weather-description'>{weatherDescription}</p>
          </div>
          <div className='card-item current-temperature'>
            <img
              className='card-weather-icon'
              src={iconSrc}
              alt={`Icon for current weather: ${weatherDescription}`}
            ></img>
            <p className='temperature'>{temperature} &deg;C</p>
          </div>
        </div>
        <div className='card-row'>
          <div className='card-item current-datetime'>
            <p className='date'>{`${month} ${addOrdinalSuffixTo(day)}`}</p>
            <p className='time'>{time}</p>
          </div>
          <div className='card-item current-extras'>
            <p className='wind-speed'>Wind: {windSpeed} m/s</p>
            <p className='humidity'>Humidity: {humidity} %</p>
            <p className='precipitation'>
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
      <Card data={currentWeatherData} err={error} isLoaded={isLoaded} />
      <Forecast data={forecastData} err={error} isLoaded={isLoaded} />
    </div>
  );
};

export default WeatherReport;
