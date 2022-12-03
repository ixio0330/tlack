import { io, Socket } from 'socket.io-client';
class SocketService {
  socket: null | Socket = null;

  connectSokcet(workspace_id: string) {
    this.socket = io
    (
      `http://127.0.0.1:9000/${workspace_id}`, 
      { 
        path: '/socket.io', 
        auth: 
          { 
            token: localStorage.getItem('ACCESS_TOKEN') 
          } 
      }
    );
  }
  disconnectSocket() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

const socketService = new SocketService();
export default socketService;