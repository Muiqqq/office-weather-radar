/**
 * Looks for data.snow.3h or data.rain.3h keys in an object and returns one of
 * the values if found.
 * Very specific to the object returned from OpenWeatherMap apis.
 *
 * @param data - Data object to parse
 * @returns Value of data.snow.3h or data.rain.3h. Returns 0 if those keys don't exist
 */
const parsePrecipitationFrom = (data) => {
  if (data.snow && '3h' in data.snow) {
    return data.snow['3h'];
  }
  if (data.rain && '3h' in data.rain) {
    return data.rain['3h'];
  }
  return 0;
};

/**
 * Capitalizes the first character of a string
 *
 * @param string - String to capitalize
 * @returns String with first letter capitalized
 */
const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Adds a suffix to a number to denote ordinality
 *
 * @param number - Number to add suffix to
 * @returns A stringified number with a suffix e.g. "2nd"
 */
const addOrdinalSuffixTo = (number) => {
  const i = number;
  const j = i % 10,
    k = i % 100;

  if (j === 1 && k !== 11) {
    return number + 'st';
  }
  if (j === 2 && k !== 12) {
    return number + 'nd';
  }
  if (j === 3 && k !== 13) {
    return number + 'rd';
  }
  return number + 'th';
};

export { parsePrecipitationFrom, addOrdinalSuffixTo, capitalize };
