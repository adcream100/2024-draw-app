import { useState, useEffect } from 'react';

const useStorageSync = <T>(
  key: string,
  initialValue: T,
  parseFn: (value: string | null) => T,
  serializeFn: (value: T) => string = JSON.stringify,
) => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? parseFn(storedValue) : initialValue;
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setValue(parseFn(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, parseFn]);

  const setStorageValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, serializeFn(newValue));
  };

  return [value, setStorageValue] as const;
};

export default useStorageSync;
