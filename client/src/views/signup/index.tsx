import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Component
import InputField from "../../components/form/inputField"
// hook
import useInput from "../../hooks/useInput"
// api
import authService from "../../api/auth.service";

export default function SignupView() {
  const { value: id , onChange: onChangeId, setValue: setId } = useInput('');
  const { value: pw, onChange: onChnagePw, setValue: setPw } = useInput('');
  const { value: nickname, onChange: onChangeNickname, setValue: setNickname } = useInput('');
  async function onClickSignup() {
    if (!id || !pw || !nickname) {
      return;
    }
    await authService.singup(
      {
        id: id as string,
        password: pw as string,
        nickname: nickname as string
      }
    );
  }
  useEffect(() => {
    return () => {
      setId('');
      setPw('');
      setNickname('');
    }
  }, []);
  return (
    <div className="signup_view">
      <InputField label='아이디' value={id} onChange={onChangeId} />
      <InputField label='닉네임' value={nickname} onChange={onChangeNickname} />
      <InputField label='비밀번호' value={pw} onChange={onChnagePw} type='password' />
      <Link to='/signin'>로그인</Link>
      <button onClick={onClickSignup}>회원가입</button>
    </div>
  )
}