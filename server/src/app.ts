import express, { Request, Response, NextFunction } from "express";
import { Server } from 'socket.io';
import { createServer } from 'http';
import CustomError from "./error";
import MethodNotAllowed from "./error/methodNotAllowed";

const app = express();
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  path: '/socket.io',
  cors: {
    origin: ['http://localhost:3000'],
  },
});

const PORT = 9000;
const HOST = '127.0.0.1';
server.listen(PORT, HOST, () => {
  console.log(`Server run : http://${HOST}:${PORT}`);
});

app.all('*', (res, req) => {
  throw new MethodNotAllowed();
});

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  res
    .status(error.status || 500)
    .send({ 
      name: error.name || 'Internal Server Error',
      message: error.message || '서버 내부에서 오류가 발생했습니다.'
    });
});