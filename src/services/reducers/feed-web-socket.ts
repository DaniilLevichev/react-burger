import { TWSResponseOrders } from "../../types/types";
import { FEED_CONNECTION_CLOSED, FEED_CONNECTION_ERROR, FEED_CONNECTION_START, FEED_CONNECTION_SUCCESS, FEED_GET_MESSAGE } from "../actions/feed-web-socket";
import { IWSFeedActions } from "../actions/feed-web-socket";

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
  
  export const wsFeedReducer = (state = initialState, action: IWSFeedActions): TWSState => {
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
          wsConnected: true,
          connect: false
        };

      case FEED_CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload,
          wsConnected: false,
          messages: null
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
          messages: action.payload
        };
      default:
        return state;
    }
  }; 