import WeatherReport from './weatherReport';

const WeatherReportList = ({ listOfFetchables }) => {
  const weatherReports = listOfFetchables.map((fetchableLocation) => {
    // Should not have secrets anywhere near a React app as they are visible in
    // the build! Proper way might be to make our own backend API which would store
    // the secrets and handle the actual fetching from OpenWeatherMap, and use
    // it as a proxy.
    const APIKEY = `${process.env.REACT_APP_API_KEY}`;

    let lat = fetchableLocation.lat;
    let lon = fetchableLocation.lon;

    const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric&lang=fi`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&cnt=5&lang=fi&units=metric`;

    // todo: Give lat & lon down, not the urls
    return (
      <WeatherReport
        currentWeatherURL={currentURL}
        forecastURL={forecastURL}
        key={fetchableLocation.value}
      />
    );
  });

  return <>{weatherReports}</>;
};

export default WeatherReportList;
