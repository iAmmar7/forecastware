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

  if (isObject(arg) && Object.keys(arg).length === 0 && Object.getPrototypeOf(arg) === Object.prototype) return true;

  return false;
};
