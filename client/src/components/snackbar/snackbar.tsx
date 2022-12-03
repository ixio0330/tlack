import { useState, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './snackbar.css';

export type SnackbarType = 'info' | 'success' | 'warn' | 'error' | 'none';

interface SncakbarProps {
  type?: SnackbarType;
  message?: string;
  show: boolean;
  timeout?: number;
  resetSnackbar: Function;
}

/**
 * Snackbar 컴포넌트
 */
export default function Snackbar(
  { 
    message, 
    type = 'none', 
    show = true, 
    timeout = 2000,
    resetSnackbar,
  }: SncakbarProps
) {
  // 초기 state
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (show) {
      setIsShow(show);
      setTimeoutSnackbar(timeout);
    }
  }, [show]);

  /**
   * timeout 후 snackbar 비활성화
   */
  const setTimeoutSnackbar = (timeout: number) => {
    setTimeout(() => {
      setIsShow(false);
      resetSnackbar();
    }, timeout);
  };

  if (!isShow) return null;
  return (
    <div id="snackbar" className={type}>
      <span>{message}</span>
      <button 
        id="snackbar_button"
        onClick={() => setIsShow(false)}
      >
        <AiOutlineCloseCircle color='#fff' />
      </button>
    </div>
  );
}
