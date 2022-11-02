import { Request, Response, NextFunction } from "express";
import BadRequest from "../error/badRequest";
import ExpiredToken from "../error/expiredToken";
import jwt from "../utils/jwt";

const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new BadRequest('토큰이 존재하지 않습니다.');
  }

  try { 
    const payload = jwt.getPayload(req.headers.authorization);
    req.body.user_id = payload.user_id;
    next();
  } catch (error) {
    throw new ExpiredToken();
  }
};

export default tokenMiddleware;