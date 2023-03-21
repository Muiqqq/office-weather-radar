import { parsePrecipitationFrom } from '../utils';

/**
 * Displays a 3h forecast.
 *
 * @param data - Data to display, given down from Forecast component
 * @returns A 3h forecast React component
 */
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

/**
 * A list of 3h forecasts to display the weather every 3h.
 *
 * @param data - Forecast data received from OpenWeatherMap api
 * @returns A list of ForecastItems to display a list of 3h forecasts
 */
const Forecast = ({ data }) => {
  if (data) {
    const forecasts = data.list.map((elem) => {
      return <ForecastItem data={elem} key={elem.dt} />;
    });
    return <div className='forecast-container'>{forecasts}</div>;
  }
  return null;
};

export default Forecast;
