import WeatherReport from './weatherReport';

/**
 * A wrapping component, creates a list of WeatherReports based on given
 * location data.
 *
 * @param {Object[]} locations - List of locations with coordinates
 * @returns A list of <WeatherReport> components
 */
const WeatherReportList = ({ locations }) => {
  const weatherReports = locations.map((location) => {
    let lat = location.lat;
    let lon = location.lon;

    return <WeatherReport lat={lat} lon={lon} key={location.value} />;
  });

  return <>{weatherReports}</>;
};

export default WeatherReportList;
