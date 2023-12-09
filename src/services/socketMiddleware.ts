import type { Middleware, MiddlewareAPI } from 'redux';

import { AppDispatch, RootState, TApplicationActions } from '../types/redux-types';
import { useDispatch } from '../types/redux-types';
import { FEED_CONNECTION_START, IWSActions } from './actions/feed-web-socket';

export const socketMiddleware = (Actions: any): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: any) => {
        const { dispatch } = store;
        const { type, payload } = action;

        const { wsStart,
            wsClose,
            onOpen,
            onClose,
            onMessage,
            onError,
        } = Actions;
        
        if (type === wsStart ) {
            socket = new WebSocket(payload)
            
            socket.onopen = event => {
                dispatch({ type: onOpen});
            }

            socket.onmessage = event => {
                const { data } = event;
                const parsedData = JSON.parse(data)
                dispatch({ type: onMessage, payload: parsedData });
            };

            socket.onclose = event => {
                dispatch({ type: onClose});
                socket?.close();
            }

            socket.onerror = event => {
                dispatch({ type: onError})
            }

            
        }
        
        if (wsClose && type === wsClose) {
            socket?.close();
        }

        next(action);

    };
    }) as Middleware;
}; 