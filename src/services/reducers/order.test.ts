import { orderReducer, TOrderReducer } from './order';
import { CREATE_ORDER } from '../actions/order';
import { TApplicationActions } from '../../types/redux-types';

describe('orderReducer', () => {
  let initialState: TOrderReducer;

  beforeEach(() => {
    initialState = {
      request: null
    };
  });

  it('should handle CREATE_ORDER', () => {
    const data = {
      test: 'test'
    };
    const action: TApplicationActions = { type: CREATE_ORDER, data: data };
    const result = orderReducer(initialState, action);
    expect(result.request).toEqual(action.data);
  });
});