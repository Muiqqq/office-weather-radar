import { useState, createContext } from 'react';
import locations from './locations';
import Selector from './components/selector';
import WeatherReportList from './components/weatherReportList';

export const ErrorContext = createContext(() => {});

const selectorOptions = [
  { value: 'all', description: 'All cities' },
  ...locations,
];

const App = () => {
  const [selected, setSelected] = useState(selectorOptions[0].value);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSelection = () => {
    if (selected === selectorOptions[0].value) {
      return locations;
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
        options={selectorOptions}
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
