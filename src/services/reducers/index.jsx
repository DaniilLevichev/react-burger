import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { detailReducer } from './ingredient-details';
import { orderReducer } from './order';
import { registryReducer } from './registry';
import { userReducer } from './identification';
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorReducer: constructorReducer,
    detail: detailReducer,
    order: orderReducer,
    registry: registryReducer,
    user: userReducer
})