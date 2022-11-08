import { useState, ChangeEvent } from 'react';

export default function useInput<T>(initValue?: T) {
  const [value, setValue] = useState(initValue);
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value as T);
  }
  return {
    value,
    onChange,
    setValue
  }
}