import http from ".";
import { Response } from './response.dto';
import { history } from "../App";

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

  async signin(info: SinginDto) {
    try {
      const response = await this.apiSingin(info);
      if (response.type === 'success') {
        localStorage.setItem('TOKEN', response.token);
        history.replace('/');
        return;
      }
    } catch (error) {
      // TODO [Store] error update
      console.log(error);
    }
  }

  async singup(info: SingupDto) {
    try {
      await this.apiSingup(info);
      history.replace('/signin');
    } catch (error) {
      console.log(error);
    }
  }

  async token() {
    return await http.post('/auth/token');
  }
}

const authService = new AuthService();

export default authService;