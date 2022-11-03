import server from '../app';
import { Server, Namespace } from 'socket.io';

class Websocket {
  private io: Server | null = null;

  // 생성자
  constructor() {
    this.io = new Server(server, {
      path: '/socket.io',
      cors: {
        origin: ['http://localhost:3000']
      }
    });
  }

  private namespace: Namespace | null = null;
  
  join(workspace_id: string) {
    if (this.io === null) return;
    if (this.namespace) {
      this.namespace.disconnectSockets();
      this.namespace = null;
    }
    this.namespace = this.io.of(workspace_id);
    this.namespace.on('connection', (socket) => {
      console.log(workspace_id);
      let roomName = '';
      let user = '';
      
      socket.on('joinRoom', (joinInfo) => {
        roomName = joinInfo.roomName;
        user = joinInfo.user;
        socket.join(roomName);
      });
      
      // socket.on('chat', (_chat) => {
      //   console.log(roomName, user, _chat);
      //   this.namespace.to(roomName).emit('broadcast', {
      //     from: user,
      //     chat: _chat,
      //   });
      // });
    });
  }
}

const websocket = new Websocket();
export default websocket;