const parsePrecipitationFrom = (data) => {
  if (data.snow && '3h' in data.snow) {
    return data.snow['3h'];
  }
  if (data.rain && '3h' in data.rain) {
    return data.rain['3h'];
  }
  return 0;
};

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

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
