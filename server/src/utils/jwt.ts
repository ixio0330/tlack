import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

export type Payload = {
  [key: string]: string;
};

type TokenType = 'access' | 'refresh';

const jwt = {
  getToken(info: Payload, type: TokenType = 'access'): string {
  return jsonwebtoken.sign({ ...info }, 'SECRET_KEY', {
      expiresIn: type === 'access' ? '1d' : '7d'
    });
  },
  getPayload(token: string): JwtPayload {
    return jsonwebtoken.verify(token, 'SECRET_KEY') as JwtPayload;
  }
}

export default jwt;
