import { Dispatch } from 'redux';
import { PUT_BUN, PUT_INGREDIENT, DELETE_INGREDIENT, UPDATE_COMPONENT_ORDER } from '../services/actions/constructor';
import { CHECK_DETAIL, DELETE_DETAIL } from '../services/actions/ingredient-detail';
import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from '../services/actions/ingredients';
import { CREATE_ORDER } from '../services/actions/order';
import { CHECK_USER, REGISTRY_USER, LOGOUT_USER, LOGIN_USER, FIX_PASSWORD, RESET_PASSWORD, EDIT_USER } from '../services/actions/identification';
import { TIngredientType } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../services/store';
import { rootReducer } from '../services/reducers';
import { useDispatch as dispatchHook, TypedUseSelectorHook, useSelector as selectorHook } from 'react-redux';

export type TConstructorReducer = {
    selectedBun: TIngredientType | {},
    priceBun: number | null,
    selectedIngredients: TIngredientType[],
    price: number | null
}

export type TUserData = {
    email: string,
    name: string;
}

interface IPutBun {
    readonly type: typeof PUT_BUN;
    data: TIngredientType;
}
interface IPutIngredient {
    readonly type: typeof PUT_INGREDIENT;
    data: TIngredientType;
}
interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT;
    data: TIngredientType;
}
interface IUpdateComponentOrder {
    readonly type: typeof UPDATE_COMPONENT_ORDER;
    data: ReadonlyArray<TIngredientType>;
}
interface ICheckDetail {
    readonly type: typeof CHECK_DETAIL;
    data: TIngredientType;
}
interface IDeleteDetail {
    readonly type: typeof DELETE_DETAIL;
    data: TIngredientType;
}
interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}
interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    data: TIngredientType[];
}
interface ICreateOrder {
    readonly type: typeof CREATE_ORDER;
    data: string[];
}
interface ICheckUser {
    readonly type: typeof CHECK_USER;
    data: TUserData;
}
interface IRegistryUser {
    readonly type: typeof REGISTRY_USER;
    data: TUserData;
}
interface ILogoutUser {
    readonly type: typeof LOGOUT_USER;
}
interface ILoginUser {
    readonly type: typeof LOGIN_USER;
    data: TUserData;
}
interface IFixPassword {
    readonly type: typeof FIX_PASSWORD;
}
interface IResetPassword {
    readonly type: typeof RESET_PASSWORD;
}
interface IEditUser {
    readonly type: typeof EDIT_USER;
    data: TUserData;
}

export type RootState = ReturnType<typeof store.getState>; 

export type TApplicationActions = IPutBun|IPutIngredient|IDeleteIngredient|IUpdateComponentOrder|ICheckDetail|IDeleteDetail|IGetIngredientsRequest|IGetIngredientsFailed|IGetIngredientsSuccess|ICreateOrder|ICheckUser|IRegistryUser|ILogoutUser|ILoginUser|IFixPassword|IResetPassword|IEditUser;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

//export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppDispatch = Dispatch<TApplicationActions>; 

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook; 
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 
//export type AppDispatch = Dispatch<TApplicationActions>; 