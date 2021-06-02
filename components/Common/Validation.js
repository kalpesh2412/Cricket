export const checkInitialSpace = (string) => {
  if (string.length == 1 && string == " ") return true;
  return false;
};

export const isStringValid = (string) => {
  const pattern = /^[^_][a-zA-Z0-9_ ]{1,40}$/;
  if (pattern.test(string)) return true;
  return false;
};

export const isPasswordValid = (string) => {
  if (string.match(/^[\n A-Za-z0-9_.:!/#+-@$%]*$/i)) {
    return true;
  }
  return false;
};

export const isMobileNumberValid = (number) => {
  const pattern = /^[6-9]\d{9}$/i;
  if (pattern.test(number)) {
    return true;
  }
  return false;
};
