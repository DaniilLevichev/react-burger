import { TApplicationActions } from '../../types/redux-types';
import { CREATE_ORDER } from '../actions/order';

type TNumber = {
    number: number
}

type TRequest = {
    name: string,
    order: TNumber
}

export type TOrderReducer = {
    request: TRequest | {}
}

const initialState: TOrderReducer = {
    request: {}
}

export const orderReducer = (state = initialState, action: TApplicationActions): TOrderReducer => {
    console.log(state);
    switch(action.type){
        case(CREATE_ORDER):{
            return {...state, request: action.data}
        }
        default: {
            return state
        }
    }
}