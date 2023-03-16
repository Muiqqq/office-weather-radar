import React from 'react';

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

const Card = () => {
  return (
    <div className='card'>
      <div className='card-row'>
        <div className='card-item align-center'>
          <p className='city'>Espoo</p>
          <p className='secondary-text'>Scattered clouds</p>
        </div>
        <div className='card-item flex primary-temperature'>
          <img
            className='card-weather-icon'
            src='https://openweathermap.org/img/wn/10d@2x.png'
            alt='Icon for current weather'
          ></img>
          <p className='align-center'>13 C</p>
        </div>
      </div>
      <div className='card-row'>
        <div className='card-item align-end'>
          <p className='date'>May 2nd</p>
          <p className='secondary-text'>12:00</p>
        </div>
        <div className='card-item'>
          <p className='secondary-text'>Wind: 0.00 m/s</p>
          <p className='secondary-text'>Humidity: 99 %</p>
          <p className='secondary-text'>Precipitation (3h): 0 mm</p>
        </div>
      </div>
    </div>
  );
};

const WeatherReport = ({}) => {
  return (
    <div className='report-container'>
      <Card />
    </div>
  );
};

export default WeatherReport;
