import WeatherReport from './weatherReport';

const WeatherReportList = ({ locations }) => {
  const weatherReports = locations.map((location) => {
    let lat = location.lat;
    let lon = location.lon;

    return <WeatherReport lat={lat} lon={lon} key={location.value} />;
  });

  return <>{weatherReports}</>;
};

export default WeatherReportList;
