import { FEED_CONNECTION_CLOSED, FEED_CONNECTION_ERROR, FEED_CONNECTION_START, FEED_CONNECTION_SUCCESS, FEED_GET_MESSAGE } from "../actions/feed-web-socket";
import { IWSActions } from "../actions/feed-web-socket";

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
  
  export const wsReducer = (state = initialState, action: IWSActions) => {
    switch (action.type) {
        case FEED_CONNECTION_START:
            return {
              ...state,
              connect: true
            };

      case FEED_CONNECTION_SUCCESS:
        return {
          ...state,
          error: undefined,
          wsConnected: true
        };

      case FEED_CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload,
          wsConnected: false,
          messages: []
        };

      case FEED_CONNECTION_CLOSED:
        return {
          ...state,
          error: undefined,
          wsConnected: false
        };
      
      case FEED_GET_MESSAGE:
        return {
          ...state,
          error: undefined,
          messages: [...state.messages, action.payload]
        };
      default:
        return state;
    }
  }; 