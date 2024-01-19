import { TApplicationActions } from "../../types/redux-types";
import { TIngredientType } from "../../types/types";
import { CHECK_DETAIL } from "../actions/ingredient-detail";

export type TDetailReducer = {
    checkedIngredient: TIngredientType | null
}

const initialState: TDetailReducer = {
    checkedIngredient: null
}

export const detailReducer = (state = initialState, action: TApplicationActions): TDetailReducer => {
    switch(action.type) {
        case(CHECK_DETAIL): {
            return {...state, checkedIngredient: action.data}
        }
        default:{
            return state
        }
    }
};