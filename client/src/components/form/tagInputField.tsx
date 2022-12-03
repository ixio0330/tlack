import { ChangeEventHandler, KeyboardEvent } from 'react';
import { IoIosClose } from 'react-icons/io';
import './tagInputField.css';

interface TagInputFieldProps {
  id?: string;
  value?: string;
  name?: string;
  list?: string[];
  onChange?: ChangeEventHandler;
  onEnter: Function;
  onClickDelete: (index: number) => void;
}

export default function TagInputField({id, name, value, onChange, list, onEnter, onClickDelete}: TagInputFieldProps) {
  const onKeyupEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onEnter();
    }
  };

  return (
    <div className='input_field'>
      <input 
        type='text' 
        id={id} 
        name={name ?? id} 
        value={value} 
        onKeyUp={onKeyupEnter}
        onChange={onChange}  
      />
      {
        list?.length ?
          <ul className='tag_list'>
            {
              list?.map((item, index) => 
              (
                <li className='tag_item' key={item + index}>
                  {item}
                  <IoIosClose onClick={() => onClickDelete(index)} />
                </li>
              ))
            }
          </ul> : 
          null
      }
    </div>
  )
}