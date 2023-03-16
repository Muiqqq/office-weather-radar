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
      <div className=''>
        <p>Espoo</p>
        <p>Scattered clouds</p>
      </div>
    </div>
  );
};

const WeatherReport = ({}) => {
  return (
    <div className='report-container'>
      <Card />
      <Trihourly />
    </div>
  );
};

export default WeatherReport;
