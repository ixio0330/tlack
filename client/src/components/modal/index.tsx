import { ReactElement } from 'react';
import './modal.css';

interface ModalProps {
  show: boolean;
  title?: ReactElement;
  content?: ReactElement;
  actions?: ReactElement;
}

export default function Modal({ show, title, content, actions }: ModalProps) {
  if (!show) return null;
  return (
    <article className='modal_wrap'>
      <div className='modal'>
        <div className='modal_title'>
          {title}
        </div>
        <div className='modal_content'>
          {content}
        </div>
        <div className='modal_actions'>
          {actions}
        </div>
      </div>
    </article>
  )
}