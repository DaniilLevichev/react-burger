import type { Middleware, MiddlewareAPI } from 'redux';

import { AppDispatch, RootState, TApplicationActions } from '../types/redux-types';
import { useDispatch } from '../types/redux-types';

export const socketMiddleware = (actions: any): Middleware => {
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
        } = actions;
        
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
            }

            socket.onerror = event => {
                dispatch({ type: onError})
            }
        }
        
        if ( type === wsClose) {
            socket?.close();
        }

        next(action);

    };
    }) as Middleware;
}; 