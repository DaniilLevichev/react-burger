import { CREATE_ORDER } from '../actions/order';

const initialState = {
    orderInfo: {}
}

export const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case(CREATE_ORDER):{
            return {...state, orderInfo: action.data}
        }
        default: {
            return state
        }
    }
}