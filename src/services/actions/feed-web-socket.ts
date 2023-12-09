import { createAction } from "@reduxjs/toolkit";

export const FEED_CONNECTION_START: 'FEED_CONNECTION_START' = 'FEED_CONNECTION_START';
export const FEED_CONNECTION_SUCCESS: 'FEED_CONNECTION_SUCCESS' = 'FEED_CONNECTION_SUCCESS'; 
export const FEED_CONNECTION_ERROR: 'FEED_CONNECTION_ERROR' = 'FEED_CONNECTION_ERROR';
export const FEED_CONNECTION_CLOSE: 'FEED_CONNECTION_CLOSE' = 'FEED_CONNECTION_CLOSE';
export const FEED_CONNECTION_CLOSED: 'FEED_CONNECTION_CLOSED' = 'FEED_CONNECTION_CLOSED';
export const FEED_GET_MESSAGE: 'FEED_GET_MESSAGE' = 'FEED_GET_MESSAGE';
export const FEED_SEND_MESSAGE: 'FEED_SEND_MESSAGE' = 'FEED_SEND_MESSAGE';
export const ORDER_CONNECTION_START: 'ORDER_CONNECTION_START' = 'ORDER_CONNECTION_START';
export const ORDER_CONNECTION_CLOSE: 'ORDER_CONNECTION_CLOSE' = 'ORDER_CONNECTION_CLOSE';

type TWSResponse = {
    success: boolean,
    orders: unknown,
    total: number,
    totalToday: number
}

interface IWsConnsectionStart {
    type: typeof FEED_CONNECTION_START
    payload: string
}

interface IWsConnsectionSuccess {
    type: typeof FEED_CONNECTION_SUCCESS
}

interface IWsConnsectionError {
    type: typeof FEED_CONNECTION_ERROR,
    payload: any
}

interface IWsConnsectionClosed {
    type: typeof FEED_CONNECTION_CLOSED
}

interface IWsConnsectionClose {
    type: typeof FEED_CONNECTION_CLOSE
}

interface IWsConnsectionMessage {
    type: typeof FEED_GET_MESSAGE,
    payload: TWSResponse
}

interface IWsOrderConnsectionStart {
    type: typeof ORDER_CONNECTION_START
    payload: string
}

interface IWsOrderConnsectionClose {
    type: typeof ORDER_CONNECTION_START
    payload: string
}

export type IWSActions = IWsConnsectionStart | IWsConnsectionSuccess | IWsConnsectionError | IWsConnsectionClosed | IWsConnsectionClose | IWsConnsectionMessage;
