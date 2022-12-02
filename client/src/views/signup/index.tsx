import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Component
import SingLayout from '../../layouts/sing';
import InputField from "../../components/form/inputField"
import Button from '../../components/button/button';

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
    <SingLayout title='먼저 이메일부터 입력해 보세요'>
      <InputField label='이메일' value={id} placeholder='email@example.com' onChange={onChangeId} />
      <InputField label='이름' value={nickname} onChange={onChangeNickname} />
      <InputField label='비밀번호' value={pw} onChange={onChnagePw} type='password' />
      <Button value='회원가입' onClick={onClickSignup} />
      <div className='go_sign'>
        <p>이미 Tlack을 사용하고 있나요?</p>
        <Link to='/signin'>기존 워크스페이스에 로그인</Link>
      </div>
    </SingLayout>
  )
}