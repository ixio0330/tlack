import { useState, ChangeEvent } from 'react';

/**
 * Input hooks
 * @param initValue 초기 값
 * @returns {value, onChange, setValue} 
 */
export default function useInput<T>(initValue?: T) {
  const [value, setValue] = useState(initValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as T);
  }
  return {
    value,
    onChange,
    setValue
  }
}