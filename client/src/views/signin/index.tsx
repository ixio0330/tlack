import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Component
import InputField from "../../components/form/inputField"
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
    <div className="signin_view">
      <InputField label='아이디' value={id} onChange={onChangeId} />
      <InputField label='비밀번호' value={pw} onChange={onChnagePw} type='password' />
      <Link to='/signup'>회원가입</Link>
      <button onClick={onClickSignin}>로그인</button>
    </div>
  )
}