import { ChangeEventHandler, MouseEventHandler, KeyboardEvent } from 'react';
import { MdSend } from 'react-icons/md';

interface EditorProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler;
  onEnter: Function;
}

export default function Editor({ value, onChange, onClick, onEnter }: EditorProps) {
  const onKeyupEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onEnter();
    }
  };
  return (
    <div className='editor'>
      <input 
        type="text" 
        value={value} 
        onChange={onChange}
        onKeyUp={onKeyupEnter} 
      />
      <button onClick={onClick}><MdSend /></button>
    </div>
  )
}