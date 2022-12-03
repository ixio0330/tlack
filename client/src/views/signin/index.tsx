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

// Validation rules
import signRules from '../../rules/sign';

/**
 * 로그인 View 컴포넌트
 * @returns ReactNode
 */
export default function SigninView() {
  const { value: id , onChange: onChangeId, setValue: setId } = useInput('');
  const { value: pw, onChange: onChnagePw, setValue: setPw } = useInput('');

  /**
   * 로그인 클릭 이벤트
   */
  const onClickSignin = async () => {
    await authService.signin({ id: id as string, password: pw as string });
  };

  /**
   * 이메일, 비밀번호 유효성 검사
   * @return {boolean} 검사 결과
   */
  const isValid = (): boolean => {
    if (
      !id || 
      !pw || 
      signRules.email(id) || 
      signRules.password(pw)
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
    }
  }, []);
  
  return (
    <SingLayout title='이메일로 로그인해 보세요'>
      <InputField 
        label='이메일' 
        value={id} 
        rules={[ signRules.email ]}
        placeholder='email@example.com' 
        onChange={onChangeId}    
      />
      <InputField 
        label='비밀번호' 
        value={pw} 
        type='password' 
        rules={[ signRules.password ]}
        onChange={onChnagePw} 
      />
      <Button 
        value='이메일로 로그인' 
        disabled={!isValid()}
        onClick={onClickSignin} 
      />
      <div className='go_sign'>
        <p>아직 계정이 없으신가요?</p>
        <Link to='/signup'>계정 생성하기</Link>
      </div>
    </SingLayout>
  )
}