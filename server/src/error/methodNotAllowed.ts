export default class MethodNotAllowed extends Error {
  status = 405;
  message = '';
  name = '';
  constructor(message = '사용할 수 없는 메소드입니다.') {
    super(message);
    this.message = message;
    this.name = 'Method Not Allowed';
  }
}