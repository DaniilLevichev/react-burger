import { CHECK_USER } from "../actions/identification";

const initialState = {
    userData: {}
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHECK_USER: {
            return {...state, userData: action.data}
        }
        default: {
            return state
        }
    }
}