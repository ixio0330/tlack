export default class ExpiredToken extends Error {
  status = 419;
  message = '';
  name = '';
  constructor(message = '유효하지 않은 토큰입니다.') {
    super(message);
    this.name = 'Expired Token';
  }
}