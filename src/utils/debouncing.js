import { useEffect, useState } from 'react';

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
console.log("useEffect ke baad")
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    console.log(timeout);
    return () => {
      console.log(timeout)
      clearTimeout(timeout)};
  }, [value]);

  console.log(debouncedValue);
  return debouncedValue;
};
