import { MouseEventHandler } from 'react';
import './button.css';
import { StatusType } from '../../common/status';

interface ButtonProps {
  value: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  type?: StatusType;
}

/**
 * Button 컴포넌트
 */
export default function Button({ value, onClick, disabled, type = 'default' }: ButtonProps) {
  return (
    <button 
      id="button" 
      disabled={disabled} 
      onClick={onClick}
      className={type}
    >
      {value}
    </button>
  )
}