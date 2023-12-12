import { TApplicationActions } from '../../types/redux-types';
import { CREATE_ORDER } from '../actions/order';

type TNumber = {
    number: number
}

type TRequest = {
    name: string,
    order: TNumber,
    success?: string 
}

export type TOrderReducer = {
    request: TRequest | null
}

const initialState: TOrderReducer = {
    request: null
}

export const orderReducer = (state = initialState, action: TApplicationActions): TOrderReducer => {
    switch(action.type){
        case(CREATE_ORDER):{
            return {...state, request: action.data}
        }
        default: {
            return state
        }
    }
}