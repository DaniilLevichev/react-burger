import { REGISTRY_USER } from "../actions/registry";

const initialState = {
    userData: {}
}

export const registryReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTRY_USER: {
            return {...state, userData: action.data}
        }
        default: {
            return state
        }
    }
}