import { createAction } from "@reduxjs/toolkit";
import { TWSResponseOrders } from "../../types/types";

export const ORDER_CONNECTION_START:    'ORDER_CONNECTION_START'    = 'ORDER_CONNECTION_START';
export const ORDER_CONNECTION_CLOSE:    'ORDER_CONNECTION_CLOSE'    = 'ORDER_CONNECTION_CLOSE';
export const ORDER_CONNECTION_SUCCESS:   'ORDER_CONNECTION_SUCCESS'   = 'ORDER_CONNECTION_SUCCESS'; 
export const ORDER_CONNECTION_ERROR:     'ORDER_CONNECTION_ERROR'     = 'ORDER_CONNECTION_ERROR';
export const ORDER_CONNECTION_CLOSED:    'ORDER_CONNECTION_CLOSED'    = 'ORDER_CONNECTION_CLOSED';
export const ORDER_GET_MESSAGE:          'ORDER_GET_MESSAGE'          = 'ORDER_GET_MESSAGE';
export const ORDER_SEND_MESSAGE:         'ORDER_SEND_MESSAGE'         = 'ORDER_SEND_MESSAGE';

type TWSResponse = {
    success: boolean,
    orders: unknown,
    total: number,
    totalToday: number
}

interface IWsOrderConnsectionStart {
    type: typeof ORDER_CONNECTION_START
    payload: string
}

interface IWsOrderConnsectionSuccess {
    type: typeof ORDER_CONNECTION_SUCCESS
}

interface IWsOrderConnsectionError {
    type: typeof ORDER_CONNECTION_ERROR,
    payload: any
}

interface IWsOrderConnsectionClosed {
    type: typeof ORDER_CONNECTION_CLOSED
}

interface IWsOrderConnsectionClose {
    type: typeof ORDER_CONNECTION_CLOSE
}

interface IWsOrderConnsectionMessage {
    type: typeof ORDER_GET_MESSAGE,
    payload: TWSResponseOrders
}


export type IWSOrderActions = IWsOrderConnsectionStart | IWsOrderConnsectionSuccess | IWsOrderConnsectionError | IWsOrderConnsectionClosed | IWsOrderConnsectionClose | IWsOrderConnsectionMessage;
