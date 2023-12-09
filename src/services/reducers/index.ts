import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { detailReducer } from './ingredient-details';
import { orderReducer } from './order';
import { userReducer } from './identification';
import { wsReducer } from './feed-web-socket';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorReducer: constructorReducer,
    detail: detailReducer,
    order: orderReducer,
    user: userReducer,
    ws: wsReducer
})