import {
  capitalize,
  parsePrecipitationFrom,
  addOrdinalSuffixTo,
} from '../utils';

/**
 * Weather Card component displays info on current weather of a location.
 *
 * @param data - Data received from api call to OpenWeatherMap
 * @param isLoaded - Flag to determine if data has loaded
 * @returns A Weather Card React component, displays current weather
 */
const WeatherCard = ({ data, isLoaded }) => {
  if (data) {
    const cityName = data.name;
    const weatherDescription = capitalize(data.weather[0].description);
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const temperature = Math.round(data.main.temp);

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
    const precipitation3h = Math.round(parsePrecipitationFrom(data));

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
  if (!isLoaded) {
    return (
      <div className='card'>
        <div className='loading-container'>
          <div className='lds-ripple'>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
export default WeatherCard;
