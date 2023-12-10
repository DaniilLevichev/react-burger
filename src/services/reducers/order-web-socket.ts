import { ORDER_CONNECTION_CLOSED, ORDER_CONNECTION_ERROR, ORDER_CONNECTION_START, ORDER_CONNECTION_SUCCESS, ORDER_GET_MESSAGE } from "../actions/order-web-socket";
import { IWSOrderActions } from "../actions/order-web-socket";

type TWSState = {
    wsConnected: boolean;
    messages: any;
    connect: boolean;
  
    error?: Event;
}
  
const initialState = {
    connect: false,
    wsConnected: false,
    messages: []
};
  
  export const wsOrderReducer = (state = initialState, action: IWSOrderActions) => {
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
          messages: []
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
          messages: [...state.messages, action.payload]
        };
      default:
        return state;
    }
  }; 