import { useState } from 'react';
import Selector from './components/selector';
import WeatherReportList from './components/weatherReportList';
import locations from './locations';

const App = () => {
  const [selected, setSelected] = useState(locations[0].value);

  const handleSelection = () => {
    if (selected === locations[0].value) {
      return locations.slice(1);
    } else {
      return locations.filter((elem) => elem.value === selected);
    }
  };

  const onSelect = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className='container'>
      <div className='header-container'>
        <p>Weather Radar</p>
      </div>
      <Selector
        selected={selected}
        className='selector-container'
        id='officelocation'
        name='office'
        options={locations}
        onChange={onSelect}
      />
      <div className='content-container'>
        <WeatherReportList listOfFetchables={handleSelection()} />
      </div>
    </div>
  );
};
export default App;
