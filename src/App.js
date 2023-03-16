import React, { useState } from 'react';
import Selector from './components/selector';

const listOptions = [
  { value: 'all', description: 'Kaikki kaupungit' },
  {
    value: 'tampere',
    description: 'Tampere',
  },
  {
    value: 'jyvaskyla',
    description: 'Jyväskylä',
  },
  {
    value: 'kuopio',
    description: 'Kuopio',
  },
  {
    value: 'espoo',
    description: 'Espoo',
  },
];

const App = () => {
  const [selected, setSelected] = useState(listOptions[0].value);
  console.log(selected);

  const onSelect = (event) => {
    setSelected(event.target.value);
  };

  return (
    <>
      <div className='header-container'>
        <p>Säätutka</p>
      </div>
      <div className='container'>
        <Selector
          selected={selected}
          className='selector-container'
          id='officelocation'
          name='office'
          options={listOptions}
          onChange={onSelect}
        />
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
