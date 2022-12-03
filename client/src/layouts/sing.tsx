import { ReactNode } from "react"
import { FcTreeStructure } from 'react-icons/fc';

// CSS
import './sign.css';

/**
 * 로그인, 회원가입 화면 레이아웃
 * @param props 
 * @returns ReactNode
 */
export default function SingLayout(props: { children: ReactNode, title: string }) {
  const { children, title } = props;
  return (
    <div className='sign_layout'>
      <h2>
        <FcTreeStructure /> <span>Tlack</span>
      </h2>
      <h1>{ title }</h1>
      <div className="sign_view">
        { children }
      </div>
    </div>
  );
}