import { Request, Response, NextFunction } from "express";

export default function withAsync(
  promise:
    (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    promise(req, res, next).catch(next);
  }
}