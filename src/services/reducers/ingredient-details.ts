import { TApplicationActions } from "../../types/redux-types";
import { TIngredientType } from "../../types/types";
import { CHECK_DETAIL, DELETE_DETAIL } from "../actions/ingredient-detail";

export type TDetailReducer = {
    checkedIngredient: {} | TIngredientType
}

const initialState: TDetailReducer ={
    checkedIngredient: {}
}

export const detailReducer = (state = initialState, action: TApplicationActions): TDetailReducer => {
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