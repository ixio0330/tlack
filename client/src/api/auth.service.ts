import http from ".";
import { Response } from './response.dto';
import { history } from "../App";
import { getError } from "../utils/getError";

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
      if (response.type !== 'success') return;
      localStorage.setItem('ACCESS_TOKEN', response.token.access);
      localStorage.setItem('REFRESH_TOKEN', response.token.refresh);
      history.replace('/');
    } catch (error) {
      // TODO [Store] error update
      console.log(getError(error).message);
    }
  }

  async singup(info: SingupDto) {
    try {
      await this.apiSingup(info);
      history.replace('/signin');
    } catch (error) {
      // TODO [Store] error update
      console.log(getError(error).message);
    }
  }

  async token() {
    return await http.post('/auth/access');
  }
}

const authService = new AuthService();

export default authService;