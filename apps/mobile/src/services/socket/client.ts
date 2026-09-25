import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL ?? 'http://localhost:3000';

let socket: Socket | null = null;

export function getSocket(): Socket | null {
  return socket;
}

export function connectSocket(accessToken: string): Socket {
  if (socket?.connected) {
    return socket;
  }

  socket = io(`${SOCKET_URL}/chat`, {
    auth: { accessToken },
    transports: ['websocket'],
    autoConnect: true,
  });

  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
