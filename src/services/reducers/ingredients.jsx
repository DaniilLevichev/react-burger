import {GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from '../actions/ingredients'

const initialState = {
    ingredients: [],
    isLoading: false
}

export const ingredientsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {...state, isLoading: true}
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, isLoading: false, ingredients: action.data}
        }
        case GET_INGREDIENTS_FAILED: {
            return {...state, ingredients: [], isLoading: false}
        }
        default: {
            return state
        }
    }
}