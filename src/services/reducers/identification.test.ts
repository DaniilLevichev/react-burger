import { userReducer, TUserReducer } from './identification';
import { CHECK_USER, REGISTRY_USER, LOGOUT_USER, LOGIN_USER, FIX_PASSWORD, RESET_PASSWORD, EDIT_USER } from '../actions/identification';
import { TIngredientType } from '../../types/types';
import { TUserData } from '../../types/redux-types';

describe('constructorReducer', () => {
  let initialState: TUserReducer;

  beforeEach(() => {
    initialState = {
        userData: null,
        isForgotPassword: false
    };
  });

  it('should handle CHECK_USER', () => {

    const data: TUserData = {
        email: 'test',
        name: 'test'
    };

    const action = {
      type: CHECK_USER,
      data: data
    };

    const result = userReducer(initialState, action);

    expect(result.userData).toEqual(action.data);
    expect(result.isForgotPassword).toEqual(false);
  });

  it('should handle EDIT_USER', () => {

    const data: TUserData = {
        email: 'test',
        name: 'test'
    };

    const action = {
      type: EDIT_USER,
      data: data
    };

    const result = userReducer(initialState, action);

    expect(result.userData).toEqual(action.data);
    expect(result.isForgotPassword).toEqual(false);
  });

  it('should handle REGISTRY_USER', () => {

    const data: TUserData = {
        email: 'test',
        name: 'test'
    };

    const action = {
      type: REGISTRY_USER,
      data: data
    };

    const result = userReducer(initialState, action);

    expect(result.userData).toEqual(action.data);
    expect(result.isForgotPassword).toEqual(false);
  });

  it('should handle LOGIN_USER', () => {

    const data: TUserData = {
        email: 'test',
        name: 'test'
    };

    const action = {
      type: LOGIN_USER,
      data: data
    };

    const result = userReducer(initialState, action);

    expect(result.userData).toEqual(action.data);
    expect(result.isForgotPassword).toEqual(false);
  });

  it('should handle LOGOUT_USER', () => {

    const data: TUserData = {
        email: 'test',
        name: 'test'
    };

    const action = {
      type: LOGOUT_USER,
      data: data
    };

    const result = userReducer(initialState, action);

    expect(result.userData).toEqual(null);
    expect(result.isForgotPassword).toEqual(false);
  });

  it('should handle FIX_PASSWORD', () => {

    const data: TUserData = {
        email: 'test',
        name: 'test'
    };

    const action = {
      type: FIX_PASSWORD,
      data: data
    };

    const result = userReducer(initialState, action);

    expect(result.userData).toEqual(null);
    expect(result.isForgotPassword).toEqual(true);
  });

  it('should handle RESET_PASSWORD', () => {

    const data: TUserData = {
        email: 'test',
        name: 'test'
    };

    const action = {
      type: RESET_PASSWORD,
      data: data
    };

    const result = userReducer(initialState, action);

    expect(result.userData).toEqual(null);
    expect(result.isForgotPassword).toEqual(false);
  });
});
