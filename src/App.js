import { useState } from 'react';
import Selector from './components/selector';
import WeatherReportList from './components/weatherReportList';

const listOptions = [
  { value: 'all', description: 'Kaikki kaupungit' },
  {
    value: 'tampere',
    description: 'Tampere',
    lat: 61.4991,
    lon: 23.7871,
  },
  {
    value: 'jyvaskyla',
    description: 'Jyväskylä',
    lat: 62.2415,
    lon: 25.7209,
  },
  {
    value: 'kuopio',
    description: 'Kuopio',
    lat: 62.8924,
    lon: 27.677,
  },
  {
    value: 'espoo',
    description: 'Espoo',
    lat: 60.25,
    lon: 24.6667,
  },
];

const App = () => {
  const [selected, setSelected] = useState(listOptions[0].value);

  const handleSelection = () => {
    if (selected === listOptions[0].value) {
      return listOptions.slice(1);
    } else {
      return listOptions.filter((elem) => elem.value === selected);
    }
  };

  const onSelect = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className='container'>
      <div className='header-container'>
        <p>Säätutka</p>
      </div>
      <div className='content-container'>
        <Selector
          selected={selected}
          className='selector-container'
          id='officelocation'
          name='office'
          options={listOptions}
          onChange={onSelect}
        />
        <WeatherReportList listOfFetchables={handleSelection()} />
      </div>
    </div>
  );
};
export default App;
