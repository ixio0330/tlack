import { ErrorRequestHandler } from "express";
const ErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ 
      name: err.name || 'Internal Server Error',
      message: err.message || '서버 내부에서 오류가 발생했습니다.'
    });
}

export default ErrorMiddleware;