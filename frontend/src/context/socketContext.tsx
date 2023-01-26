import { createContext } from 'react';
import io, { Socket } from 'socket.io-client';
import { MS_ORDER_URL } from '../store/constants';

interface SocketContextValue {
  socket: Socket;
}
export const socket = io(MS_ORDER_URL, { transports: ['websocket'] });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const SocketContext = createContext<SocketContextValue>();
