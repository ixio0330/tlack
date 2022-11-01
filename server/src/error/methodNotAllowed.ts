import CustomError from ".";

export default class MethodNotAllowed implements CustomError {
  status = 405;
  message = '';
  name = '';
  constructor(message = '사용할 수 없는 메소드입니다.') {
    this.message = message;
    this.name = 'Method Not Allowed';
  }
}