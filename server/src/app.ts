import express from "express";
import { Server } from 'socket.io';
import { createServer } from 'http';
import jwt from "./utils/jwt";
import cors from 'cors';
import fs from 'fs';

// service
import workspaceService from "./workspace/workspace.service";
import channelService from "./channel/channel.service";
import chatService from "./chat/chat.service";

// error class
import MethodNotAllowed from "./error/methodNotAllowed";

// middleware
import ErrorMiddleware from "./middleware/error";

// router
import authRouter from './auth/auth.controller';
import workspaceRouter from './workspace/workspace.controller';
import channelRouter from './channel/channel.controller';

const app = express();
// const options = {
//   key: fs.readFileSync(`${__dirname}/../config/ca.key`),
//   cert: fs.readFileSync(`${__dirname}/../config/ca.crt`)
// };
const server = createServer(/*options, */app);
const PORT = 9000;
const HOST = 'localhost';
server.listen(PORT, HOST, () => {
  console.log(`Server run : http://${HOST}:${PORT}`);
});

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
}))

const io = new Server(server, {
  path: '/socket.io',
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000']
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
    const channelList = await channelService.getAllInvitedChannles(workspace_id, payload.user_id);
    // 채널 목록 보내기
    socket.emit('channels', channelList);
    let channel_id = '';
    // 채널 접속
    socket.on('join', async (_channel_id) => {
      // 기존에 접속했던 채널이 있다면 나가기
      if (channel_id) {
        socket.leave(channel_id);
      }
      channel_id = _channel_id;
      socket.join(channel_id);
      try {
        const chats = await chatService.getAllByChannelId({ channel_id });
        socket.emit('initChats', chats);
      } catch (error) {
        return;
      }
    });
    // 채널에 접속한 사람에게 메시지 전달
    socket.on('chat', async (_chat) => {
      if (!channel_id) return;
      // 채팅 데이터 DB에 저장
      const chatId = await chatService.create({
        channel_id,
        content: _chat,
        user_id: payload.user_id,
      });
      const chatInfo = await chatService.getByChatId(chatId);
      // 채널에 참여한 사람들에게 메시지 전달
      namespace.to(channel_id).emit('chat', chatInfo);
    });
    // 채팅 내역 요청
    socket.on('chats', async (offset: number, limit: number) => {
      if (!channel_id) return;
      try {
        const chats = await chatService.getAllByChannelId({
          channel_id,
          offset,
          limit,
        });
        socket.emit('chats', chats);
      } catch (error) {
        return;
      }
    });
    // 연결 해제시 채널 나가기
    socket.on('disconnect', () => {
      if (!channel_id) return;
      socket.leave(channel_id);
    });
  } catch (error: any) {
    return;
  }
});

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} | ${new Date().toLocaleString()}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello Tlack!');
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