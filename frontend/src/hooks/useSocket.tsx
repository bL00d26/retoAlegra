import { useContext } from 'react';
import { SocketContext } from '../context/socketContext';

// eslint-disable-next-line import/prefer-default-export
export function useSocket() {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw Error('error in context');
  }

  return context;
}
