export default class ExpiredToken extends Error {
  status = 419;
  message = '';
  name = '';
  type = 'error';
  constructor(message = '유효하지 않은 토큰입니다.') {
    super(message);
    this.message = message;
    this.name = 'Expired Token';
  }
}