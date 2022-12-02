import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './signin.css';

// Component
import SingLayout from '../../layouts/sing';
import InputField from "../../components/form/inputField"
import Button from '../../components/button/button';
// hook
import useInput from "../../hooks/useInput"
// api
import authService from "../../api/auth.service";

export default function SigninView() {
  const { value: id , onChange: onChangeId, setValue: setId } = useInput('');
  const { value: pw, onChange: onChnagePw, setValue: setPw } = useInput('');
  async function onClickSignin() {
    if (!id || !pw) {
      return;
    }
    await authService.signin({ id: id as string, password: pw as string });
  }
  useEffect(() => {
    return () => {
      setId('');
      setPw('');
    }
  }, []);
  return (
    <SingLayout title='이메일로 로그인해 보세요'>
      <InputField label='이메일' placeholder='email@example.com' value={id} onChange={onChangeId} />
      <InputField label='비밀번호' value={pw} onChange={onChnagePw} type='password' />
      <Button value='이메일로 로그인' onClick={onClickSignin} />
      <div className='go_signup'>
        <p>아직 계정이 없으신가요?</p>
        <Link to='/signup'>계정 생성하기</Link>
      </div>
    </SingLayout>
  )
}