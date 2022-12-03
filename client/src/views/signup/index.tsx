import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Component
import SingLayout from '../../layouts/sing';
import InputField from "../../components/form/inputField";
import Button from '../../components/button/button';

// hook
import useInput from "../../hooks/useInput";

// api
import authService from "../../api/auth.service";

// Validation rules
import signRules from '../../rules/sign';

/**
 * 회원가입 View 컴포넌트
 * @returns ReactNode
 */
export default function SignupView() {
  const { value: id , onChange: onChangeId, setValue: setId } = useInput('');
  const { value: pw, onChange: onChnagePw, setValue: setPw } = useInput('');
  const { value: nickname, onChange: onChangeNickname, setValue: setNickname } = useInput('');

  /**
   * 회원가입 클릭 이벤트
   */
  const onClickSignup = async () => {
    await authService.singup(
      {
        id: id as string,
        password: pw as string,
        nickname: nickname as string
      }
    );
  };

  /**
   * 이메일, 닉네임, 비밀번호 유효성 검사
   * @return {boolean} 검사 결과
   */
  const isValid = (): boolean => {
    if (
      !id || 
      !pw || 
      signRules.email(id) || 
      signRules.password(pw) ||
      signRules.name(nickname as string)
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    // component distroy시 state 초기화
    return () => {
      setId('');
      setPw('');
      setNickname('');
    }
  }, []);

  return (
    <SingLayout title='먼저 이메일부터 입력해 보세요'>
      <InputField 
        label='이메일' 
        value={id} 
        rules={[ signRules.email ]}
        placeholder='email@example.com' 
        onChange={onChangeId}    
      />
      <InputField 
        label='이름' 
        value={nickname} 
        rules={[ signRules.name ]} 
        onChange={onChangeNickname} 
      />
      <InputField 
        label='비밀번호' 
        value={pw} 
        type='password' 
        rules={[ signRules.password ]}
        onChange={onChnagePw} 
      />
      <Button 
        value='회원가입'
        disabled={!isValid()} 
        onClick={onClickSignup} 
      />
      <div className='go_sign'>
        <p>이미 Tlack을 사용하고 있나요?</p>
        <Link to='/signin'>기존 워크스페이스에 로그인</Link>
      </div>
    </SingLayout>
  )
}