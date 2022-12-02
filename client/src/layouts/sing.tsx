import { ReactNode } from "react"
import { FcTreeStructure } from 'react-icons/fc';

// CSS
import './sign.css';

export default function SingLayout(props: { children: ReactNode, title: string }) {
  const { children, title } = props;
  return (
    <div className='sign_layout'>
      <h2>
        <FcTreeStructure /> <span>Tlack</span>
      </h2>
      <h1>{ title }</h1>
      { children }
    </div>
  );
}