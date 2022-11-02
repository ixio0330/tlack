import { Request, Response, NextFunction } from "express";
type ErrorHandleMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => any;

const ErrorMiddleware: ErrorHandleMiddleware = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ 
      name: err.name || 'Internal Server Error',
      message: err.message || '서버 내부에서 오류가 발생했습니다.'
    });
}

export default ErrorMiddleware;