import { CHECK_DETAIL, DELETE_DETAIL } from "../actions/ingredient-detail";

const initialState ={
    checkedIngredient: {}
}

export const detailReducer = (state = initialState, action) => {
    switch(action.type) {
        case(CHECK_DETAIL): {
            return {...state, checkedIngredient: action.data}
        }
        case(DELETE_DETAIL): {
            return {...state, checkedIngredient: action.data}
        }
        default:{
            return state
        }
    }
};