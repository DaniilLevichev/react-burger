import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import {rootReducer} from './reducers/index'
import { createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from "./socketMiddleware";
import { FEED_CONNECTION_CLOSE, FEED_CONNECTION_CLOSED, FEED_CONNECTION_ERROR, FEED_CONNECTION_START, FEED_CONNECTION_SUCCESS, FEED_GET_MESSAGE, ORDER_CONNECTION_CLOSE, ORDER_CONNECTION_START } from "./actions/feed-web-socket";
import thunk from "redux-thunk";
import { ORDER_CONNECTION_CLOSED, ORDER_CONNECTION_ERROR, ORDER_CONNECTION_SUCCESS, ORDER_GET_MESSAGE } from "./actions/order-web-socket";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const feedWSActions ={
    wsStart:    FEED_CONNECTION_START,
    wsClose:    FEED_CONNECTION_CLOSE,
    onOpen:     FEED_CONNECTION_SUCCESS,
    onClose:    FEED_CONNECTION_CLOSED,
    onMessage:  FEED_GET_MESSAGE,
    onError:    FEED_CONNECTION_ERROR 
}

const orderWSActions ={
    wsStart:    ORDER_CONNECTION_START,
    wsClose:    ORDER_CONNECTION_CLOSE,
    onOpen:     ORDER_CONNECTION_SUCCESS,
    onClose:    ORDER_CONNECTION_CLOSED,
    onMessage:  ORDER_GET_MESSAGE,
    onError:    ORDER_CONNECTION_ERROR 
}

/*export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), socketMiddleware(feedWSActions)],
});*/

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, socketMiddleware(feedWSActions), socketMiddleware(orderWSActions))
    )
);