import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

const jwt = {
  getToken(user_id: string, user_name?: string): string {
  return jsonwebtoken.sign({ user_id, user_name }, 'SECRET_KEY', {
      expiresIn: '1d'
    });
  },
  getPayload(token: string): JwtPayload {
    return jsonwebtoken.verify(token, 'SECRET_KEY') as JwtPayload;
  }
}

export default jwt;
