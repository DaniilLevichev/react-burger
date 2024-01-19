import { TWSResponse, TWSResponseOrder, TWSResponseOrders } from "../../types/types";
import { ORDER_CONNECTION_CLOSED, ORDER_CONNECTION_ERROR, ORDER_CONNECTION_START, ORDER_CONNECTION_SUCCESS, ORDER_GET_MESSAGE } from "../actions/order-web-socket";
import { IWSOrderActions } from "../actions/order-web-socket";

export type TWSState = {
    wsConnected: boolean;
    messages: TWSResponseOrders | null;
    connect: boolean;
  
    error?: Event;
}
  
const initialState: TWSState = {
    connect: false,
    wsConnected: false,
    messages: null
};
  
  export const wsOrderReducer = (state = initialState, action: IWSOrderActions): TWSState => {
    switch (action.type) {
        case ORDER_CONNECTION_START:
            return {
              ...state,
              connect: true
            };

      case ORDER_CONNECTION_SUCCESS:
        return {
          ...state,
          error: undefined,
          wsConnected: true
        };

      case ORDER_CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload,
          wsConnected: false,
          messages: null
        };

      case ORDER_CONNECTION_CLOSED:
        return {
          ...state,
          error: undefined,
          wsConnected: false
        };
      
      case ORDER_GET_MESSAGE:
        return {
          ...state,
          error: undefined,
          messages: action.payload
        };
      default:
        return state;
    }
  }; 