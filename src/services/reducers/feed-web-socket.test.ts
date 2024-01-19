import { wsFeedReducer, TWSState } from './feed-web-socket';
import { FEED_CONNECTION_CLOSED, FEED_CONNECTION_ERROR, FEED_CONNECTION_START, FEED_CONNECTION_SUCCESS, FEED_GET_MESSAGE } from '../actions/feed-web-socket';
import { IWSFeedActions } from '../actions/feed-web-socket';

describe('wsFeedReducer', () => {
  let initialState: TWSState;

  beforeEach(() => {
    initialState = {
      connect: false,
      wsConnected: false,
      messages: null,
    };
  });

  it('should handle FEED_CONNECTION_START', () => {
    const action = { 
        type: FEED_CONNECTION_START,
        payload: 'test'
    };
    const result = wsFeedReducer(initialState, action);
    expect(result.connect).toEqual(true);
  });

  it('should handle FEED_CONNECTION_SUCCESS', () => {
    const action = { 
        type: FEED_CONNECTION_SUCCESS,
        payload: 'test'
    };
    const result = wsFeedReducer(initialState, action);
    expect(result.connect).toEqual(false);
    expect(result.wsConnected).toEqual(true);
    expect(result.error).toEqual(undefined);
  });

  it('should handle FEED_CONNECTION_ERROR', () => {
    const action = { 
        type: FEED_CONNECTION_ERROR,
        payload: 'error'
    };
    const result = wsFeedReducer(initialState, action);
    expect(result.messages).toEqual(null);
    expect(result.wsConnected).toEqual(false);
    expect(result.error).toEqual('error');
  });

  it('should handle FEED_CONNECTION_CLOSED', () => {
    const action = { 
        type: FEED_CONNECTION_CLOSED,
        payload: 'test'
    };
    const result = wsFeedReducer(initialState, action);
    expect(result.wsConnected).toEqual(false);
    expect(result.error).toEqual(undefined);
  });

  it('should handle FEED_GET_MESSAGE', () => {
    const action = { 
        type: FEED_GET_MESSAGE,
        payload: {
            orders: [{
                createdAt: 'test',
                ingredients: ['test', 'test'],
                name: 'test',
                number: 123,
                status: 'test',
                updatedAt: 'test',
                _id: 'test',
            },
            {
                createdAt: 'test',
                ingredients: ['test', 'test'],
                name: 'test',
                number: 123,
                status: 'test',
                updatedAt: 'test',
                _id: 'test',
            }],
            success: true,
            total: 333,
            totalToday: 111
        }
    };
    const result = wsFeedReducer(initialState, action);
    expect(result.messages).toEqual(action.payload);
    expect(result.error).toEqual(undefined);
  });
});