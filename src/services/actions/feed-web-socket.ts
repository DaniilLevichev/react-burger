import { createAction } from "@reduxjs/toolkit";
import { TWSResponseOrders } from "../../types/types";

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

interface IWsFeedConnsectionStart {
    type: typeof FEED_CONNECTION_START
    payload: string
}

interface IWsFeedConnsectionSuccess {
    type: typeof FEED_CONNECTION_SUCCESS
}

interface IWsFeedConnsectionError {
    type: typeof FEED_CONNECTION_ERROR,
    payload: any
}

interface IWsFeedConnsectionClosed {
    type: typeof FEED_CONNECTION_CLOSED
}

interface IWsFeedConnsectionClose {
    type: typeof FEED_CONNECTION_CLOSE
}

interface IWsFeedConnsectionMessage {
    type: typeof FEED_GET_MESSAGE,
    payload: TWSResponseOrders
}

export type IWSFeedActions = IWsFeedConnsectionStart | IWsFeedConnsectionSuccess | IWsFeedConnsectionError | IWsFeedConnsectionClosed | IWsFeedConnsectionClose | IWsFeedConnsectionMessage;
