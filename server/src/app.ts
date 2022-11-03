import express from "express";
import { Server } from 'socket.io';
import { createServer } from 'http';
import MethodNotAllowed from "./error/methodNotAllowed";
import ErrorMiddleware from "./middleware/error";
import authRouter from './auth/auth.controller';
import workspaceRouter from './workspace/workspace.controller';
import channelRouter from './channel/channel.controller';

const app = express();
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  path: '/socket.io',
  cors: {
    origin: ['http://localhost:3000']
  }
});

const namespace = io.of(/\w+/);
namespace.on('connection', (socket) => {
  // ! token 정보로 user_id를 읽어서, 해당 워크스페이스에 포함된 사람인지 체크 필요 (외부인이 워크스페이스에 참여하면 안됨)
  const newNamespace = socket.nsp; 
  // * workspace에 접속하면, 해당 workspace에 포함된 사용자와 채널들을 보내준다.
  // newNamespace.emit('channels');
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
app.use('/channel', channelRouter);

// 사용하지 않는 method 처리
app.all('*', (res, req, next) => {
  next(new MethodNotAllowed());
});

// 에러 처리 미들웨어
app.use(ErrorMiddleware);

export default server;