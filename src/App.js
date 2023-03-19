import { useState, createContext } from 'react';
import Selector from './components/selector';
import WeatherReportList from './components/weatherReportList';
import locations from './locations';

export const ErrorContext = createContext(() => {});

const App = () => {
  const [selected, setSelected] = useState(locations[0].value);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSelection = () => {
    if (selected === locations[0].value) {
      return locations.slice(1);
    } else {
      return locations.filter((elem) => elem.value === selected);
    }
  };

  const onSelect = (event) => {
    setSelected(event.target.value);
    setErrorMessage(null);
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
      <ErrorContext.Provider value={setErrorMessage}>
        <div className='content-container'>
          {errorMessage ? (
            <div className='error-container'>
              An error occurred: {errorMessage}
            </div>
          ) : (
            <WeatherReportList listOfFetchables={handleSelection()} />
          )}
        </div>
      </ErrorContext.Provider>
    </div>
  );
};
export default App;
