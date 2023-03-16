import React, { useState } from 'react';
import Selector from './components/selector';
import WeatherReport from './components/weatherreport';

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
        <WeatherReport />
      </div>
    </>
  );
};
export default App;
