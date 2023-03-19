import WeatherReport from './weatherReport';

const WeatherReportList = ({ listOfFetchables }) => {
  const weatherReports = listOfFetchables.map((fetchableLocation) => {
    let lat = fetchableLocation.lat;
    let lon = fetchableLocation.lon;

    return <WeatherReport lat={lat} lon={lon} key={fetchableLocation.value} />;
  });

  return <>{weatherReports}</>;
};

export default WeatherReportList;
