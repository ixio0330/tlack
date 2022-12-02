import { MouseEventHandler } from 'react';
import './button.css';

interface ButtonProps {
  value: string;
  onClick?: MouseEventHandler;
  disabled?: boolean
}

export default function Button({ value, onClick, disabled }: ButtonProps) {
  return <button disabled={disabled} onClick={onClick}>{value}</button>
}