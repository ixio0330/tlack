import http from ".";
import { Response } from './response.dto';
import { history } from "../App";
import { getError } from "../utils/getError";
import store from '../store';
import { showSnackbar } from '../store/app';

export type SinginDto = {
  id: string;
  password: string;
}

export type SingupDto = {
  id: string;
  nickname: string;
  password: string;
}

class AuthService {
  private async apiSingin(info: SinginDto): Promise<Response> {
    return await http.post('/auth/signin', { ...info });
  }

  private async apiSingup(info: SingupDto): Promise<Response> {
    return await http.post('/auth/signup', { ...info });
  }

  /**
   * 로그인
   * @param info 
   */
  async signin(info: SinginDto) {
    try {
      const response = await this.apiSingin(info);
      if (response.type !== 'success') return;
      // toekn localStorage에 저장
      localStorage.setItem('ACCESS_TOKEN', response.token.access);
      localStorage.setItem('REFRESH_TOKEN', response.token.refresh);
      // main 화면으로 이동
      history.replace('/');
    } catch (error) {
      // error 발생 시 sanckbar로 알림
      const { message, type } = getError(error);
      store.dispatch(showSnackbar({ message, type }));
    }
  }

  /**
   * 회원가입
   * @param info 
   */
  async singup(info: SingupDto) {
    try {
      await this.apiSingup(info);
      // 로그인 화면으로 이동
      history.replace('/signin');
    } catch (error) {
      // error 발생 시 sanckbar로 알림
      const { message, type } = getError(error);
      store.dispatch(showSnackbar({ message, type }));
    }
  }

  /**
   * access token 검증
   */
  async token() {
    return await http.post('/auth/access');
  }
}

const authService = new AuthService();

export default authService;