import CustomError from ".";

export default class BadRequest implements CustomError {
  status = 400;
  message = '';
  name = '';
  constructor(message = '잘못된 요청입니다.') {
    this.message = message;
    this.name = 'Bad Gateway';
  }
}
