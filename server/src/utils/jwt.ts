import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

const jwt = {
  getToken(user_id: string): string {
  return jsonwebtoken.sign({ user_id }, 'SECRET_KEY', {
      expiresIn: '1d'
    });
  },
  getPayload(token: string): JwtPayload {
    return jsonwebtoken.verify(token, 'SECRET_KEY') as JwtPayload;
  }
}

export default jwt;
