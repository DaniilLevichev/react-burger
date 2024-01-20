import { wsOrderReducer, TWSState } from './order-web-socket';
import { ORDER_CONNECTION_CLOSED, ORDER_CONNECTION_ERROR, ORDER_CONNECTION_START, ORDER_CONNECTION_SUCCESS, ORDER_GET_MESSAGE } from '../actions/order-web-socket';
import { IWSOrderActions } from '../actions/order-web-socket';
import { TWSResponseOrders } from '../../types/types';

describe('wsOrderReducer', () => {
  let initialState: TWSState;

  beforeEach(() => {
    initialState = {
      connect: false,
      wsConnected: false,
      messages: null
    };
  });

  it('should handle ORDER_CONNECTION_START', () => {
    const action: IWSOrderActions = { type: ORDER_CONNECTION_START };
    const result = wsOrderReducer(initialState, action);
    expect(result.connect).toEqual(true);
  });

  it('should handle ORDER_CONNECTION_SUCCESS', () => {
    const action: IWSOrderActions = { type: ORDER_CONNECTION_SUCCESS };
    const result = wsOrderReducer(initialState, action);
    expect(result.wsConnected).toEqual(true);
    expect(result.error).toEqual(undefined);
  });

  it('should handle ORDER_CONNECTION_ERROR', () => {
    const mockError: Event = new Event('mock error');
    const action: IWSOrderActions = { type: ORDER_CONNECTION_ERROR, payload: mockError };
    const result = wsOrderReducer(initialState, action);
    expect(result.wsConnected).toEqual(false);
    expect(result.messages).toEqual(null);
    expect(result.error).toEqual(mockError);
  });

  it('should handle ORDER_CONNECTION_CLOSED', () => {
    const action: IWSOrderActions = { type: ORDER_CONNECTION_CLOSED };
    const result = wsOrderReducer(initialState, action);
    expect(result.wsConnected).toEqual(false);
    expect(result.error).toEqual(undefined);
  });

  it('should handle ORDER_GET_MESSAGE', () => {
    const action: IWSOrderActions = { 
        type: ORDER_GET_MESSAGE,
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
    const result = wsOrderReducer(initialState, action);
    expect(result.messages).toEqual(action.payload);
  });
});