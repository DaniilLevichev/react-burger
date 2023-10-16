import { CREATE_ORDER } from '../actions/order';

const initialState = {
    request: {}
}

export const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case(CREATE_ORDER):{
            return {...state, request: action.data}
        }
        default: {
            return state
        }
    }
}