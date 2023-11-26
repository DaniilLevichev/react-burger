import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor.js';
import { detailReducer } from './ingredient-details';
import { orderReducer } from './order';
import { userReducer } from './identification';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorReducer: constructorReducer,
    detail: detailReducer,
    order: orderReducer,
    user: userReducer
})