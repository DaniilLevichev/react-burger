import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { detailReducer } from './ingredient-details';
import { orderReducer } from './order';
import { userReducer } from './identification';
import { wsFeedReducer } from './feed-web-socket';
import { wsOrderReducer } from './order-web-socket';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorReducer: constructorReducer,
    detail: detailReducer,
    order: orderReducer,
    user: userReducer,
    ws: wsFeedReducer,
    wsOrder: wsOrderReducer
})