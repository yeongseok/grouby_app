export const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim().toLowerCase());
};

export const minLen = (length: number) => (value: string): boolean => {
  return value.trim().length >= length;
};

export const required = (value: string): boolean => {
  return value.trim().length > 0;
};

export const combineValidators = <T extends string>(
  ...validators: Array<(value: string) => T | null>
) => {
  return (value: string): T | null => {
    for (const validator of validators) {
      const result = validator(value);
      if (result) {
        return result;
      }
    }
    return null;
  };
};
