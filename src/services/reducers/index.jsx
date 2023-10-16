import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { detailReducer } from './ingredient-details';
import { orderReducer } from './order';
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorReducer: constructorReducer,
    detail: detailReducer,
    order: orderReducer
})