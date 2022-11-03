import express from "express";
import { Server } from 'socket.io';
import { createServer } from 'http';
import jwt from "./utils/jwt";

// service
import workspaceService from "./workspace/workspace.service";
import channelService from "./channel/channel.service";

// error class
import MethodNotAllowed from "./error/methodNotAllowed";

// middleware
import ErrorMiddleware from "./middleware/error";

// router
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

namespace.on('connection', async (socket) => {
  try { 
    // 토큰 유효성 검사
    const payload = jwt.getPayload(socket.handshake.auth.token);
    const workspace = socket.nsp; 
    const workspace_id = workspace.name.split('/')[1];
    // 초대된 사람인지 체크
    await workspaceService.getInviteInfo(workspace_id, payload.user_id);
    // 채널 목록 가져오기
    const channelList = await channelService.getAllChannles(workspace_id);
    // 채널 목록 보내기
    socket.emit('channels', channelList);
  } catch (error) {
    return;
  }
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