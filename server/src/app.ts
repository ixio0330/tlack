import express from "express";
import { Server } from 'socket.io';
import { createServer } from 'http';
import MethodNotAllowed from "./error/methodNotAllowed";
import ErrorMiddleware from "./middleware/error";
import authRouter from './auth/auth.controller';
import workspaceRouter from './workspace/workspace.controller';

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

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} | ${new Date().toLocaleString()}`);
  next();
});

app.use('/auth', authRouter);
app.use('/workspace', workspaceRouter);

// 사용하지 않는 method 처리
app.all('*', (res, req, next) => {
  next(new MethodNotAllowed());
});

// 에러 처리 미들웨어
app.use(ErrorMiddleware);