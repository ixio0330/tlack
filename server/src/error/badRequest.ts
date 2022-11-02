export default class BadRequest extends Error {
  status = 400;
  message = '';
  name = '';
  constructor(message = '잘못된 요청입니다.') {
    super(message);
    this.name = 'Bad Gateway';
  }
}
