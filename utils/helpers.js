export const isNull = (arg) => {
  return arg === null;
};

export const isUndefined = (arg) => {
  return arg === undefined;
};

export const isArray = (arg) => {
  return Array.isArray(arg);
};

export const isObject = (arg) => {
  return !isNull(arg) && !isUndefined(arg) && arg.constructor.name === 'Object';
};

export const isEmpty = (arg) => {
  if (!arg || isNull(arg) || isUndefined(arg)) return true;

  if (isArray(arg) && arg.length < 1) return true;

  if (
    isObject(arg) &&
    Object.keys(arg).length === 0 &&
    Object.getPrototypeOf(arg) === Object.prototype
  )
    return true;

  return false;
};

export const getWeatherIconUrl = (code, size = 2) => {
  return `http://openweathermap.org/img/wn/${code}@${size}x.png`;
};

export const getUVIndex = (uv = 0) => {
  if (uv > 4) return 'Low Risk';
  if (uv > 5) return 'Medium Risk';
  if (uv > 9) return 'High Risk';
  return 'No Risk';
};

export const getTemperatureSymbol = (unit = 'Celsius') => {
  switch (unit) {
    case 'Fahrenheit':
      return '\u00B0F';
    case 'Kelvin':
      return 'K';
    default:
      return '\u00B0C';
  }
};
