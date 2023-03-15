import React from 'react';

const App = () => {
  return (
    <>
      <div className='header-container'>
        <p>Säätutka</p>
      </div>
      <div className='container'>
        <div className='selector-container'>
          <select name='office' id='office'>
            <option value='all'>Kaikki kaupungit</option>
            <option value='tampere'>Tampere</option>
            <option value='jyvaskyla'>Jyväskylä</option>
            <option value='kuopio'>Kuopio</option>
            <option value='espoo'>Espoo</option>
          </select>
        </div>
        <div className='report-container'>
          <div className='card'>
            <div className=''>
              <p>Espoo</p>
              <p>Scattered clouds</p>
            </div>
          </div>
          <div className='trihourly'>
            <div className='trihourly-item'>15:00</div>
            <div className='trihourly-item'>15:00</div>
            <div className='trihourly-item'>15:00</div>
            <div className='trihourly-item'>15:00</div>
            <div className='trihourly-item'>15:00</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
