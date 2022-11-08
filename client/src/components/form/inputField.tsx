import { v1 } from 'uuid';
import { HTMLInputTypeAttribute, ChangeEventHandler, useState, useEffect } from 'react';

interface InputFieldProps {
  id?: string;
  label?: string;
  value?: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler;
  rules?: { (v: string): string; }[];
}

export default function InputField(
  {
    id = v1(),
    label,
    type = 'text',
    value,
    name,
    onChange,
    rules
  }: InputFieldProps) {
  const [valid, setValid] = useState('');

  useEffect(() => {
    if (!rules) return;
    if (0 < rules.length) {
      rules.forEach((rule) => {
        if (rule(value as string)) {
          setValid(rule(value as string));
          return;
        }
        setValid('');
      });
    }
  }, [value, rules]);
  
  return (
    <div className='input_field'>
      <label htmlFor={id}>{ label }</label>
      <input type={type} id={id} name={name ?? id} value={value} onChange={onChange} />
      <p>{ valid }</p>
    </div>
  );
}