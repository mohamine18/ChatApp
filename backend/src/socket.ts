import { Server } from 'socket.io';
import http from 'node:http';

interface ServerToClientEvents {
  receiveMessage: () => void;
}

interface ClientToServerEvents {
  joinRoom: (sender: string, recipient: string) => void;
  leaveRoom: (sender: string, recipient: string) => void;
  message: (data: any) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

class SocketServer {
  private httpServer;
  private io;
  constructor() {
    this.httpServer = http.createServer();
    this.io = new Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >(this.httpServer, {
      cors: {
        origin: [
          'http://localhost:5173',
          'http://192.168.1.110:5173',
          'http://192.168.32.1:5173',
        ],
      },
    });
  }

  listenServer() {
    const socketPort = process.env.SOCKET_PORT || 3001;
    this.httpServer.listen(socketPort, () => {
      console.log(`Socket server running on port ${socketPort}`);
    });
  }

  connected() {
    this.io.on('connection', (socket) => {
      console.log('a user is connected');

      // Join room
      socket.on('joinRoom', (sender: string, recipient: string) => {
        const roomId = this.getRoomId(sender, recipient);
        socket.join(roomId);
        console.log(`Joined with ${roomId}`);
      });

      // Leave a room
      socket.on('leaveRoom', (sender: string, recipient: string) => {
        const roomId = this.getRoomId(sender, recipient);
        socket.leave(roomId);
        console.log(`left with ${roomId}`);
      });

      // receive and forward the message
      socket.on('message', (data) => {
        const receivedMessage = JSON.parse(data);
        const roomId = this.getRoomId(
          receivedMessage.sender,
          receivedMessage.recipient
        );
        socket.to(roomId).emit('receiveMessage');
      });
    });
  }

  getRoomId(user1Id: string, user2Id: string) {
    const sortedIds = [user1Id, user2Id].sort();
    return `${sortedIds[0]}_${sortedIds[1]}`;
  }
}

export default SocketServer;
