export default class BadRequest extends Error {
  status = 400;
  message = '';
  name = '';
  type = 'error';
  constructor(message = '잘못된 요청입니다.') {
    super(message);
    this.message = message;
    this.name = 'Bad Request';
  }
}
