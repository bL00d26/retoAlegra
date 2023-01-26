import { createContext } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../store/constants';

interface SocketContextValue {
  socket: Socket;
}
export const socket = io(SOCKET_URL);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const SocketContext = createContext<SocketContextValue>();
