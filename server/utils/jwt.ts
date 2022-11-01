import jsonwebtoken from 'jsonwebtoken';

const jwt = {
  getToken(user_id: string) {
  return jsonwebtoken.sign({ user_id }, 'SECRET_KEY', {
      expiresIn: '1d'
    });
  },
  getPayload(token: string) {
    return jsonwebtoken.verify(token, 'SECRET_KEY');
  }
}

export default jwt;