import CustomError from ".";

export default class ExpiredToken implements CustomError {
  status = 419;
  message = '';
  name = '';
  constructor(message = '유효하지 않은 토큰입니다.') {
    this.message = message;
    this.name = 'Expired Token';
  }
}