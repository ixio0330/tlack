import { MouseEventHandler } from 'react';
import './button.css';

interface ButtonProps {
  value: string;
  onClick?: MouseEventHandler;
  disabled?: boolean
}

/**
 * Button 컴포넌트
 */
export default function Button({ value, onClick, disabled }: ButtonProps) {
  return <button id="button" disabled={disabled} onClick={onClick}>{value}</button>
}