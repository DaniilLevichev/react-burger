import { TApplicationActions, TConstructorReducer } from "../../types/redux-types";
import { TIngredientType } from "../../types/types";
import { PUT_BUN, PUT_INGREDIENT, DELETE_INGREDIENT, UPDATE_COMPONENT_ORDER } from "../actions/constructor";

export type TConstructorState = {
    selectedBun:            TIngredientType|{},
    priceBun:               number,
    selectedIngredients:    ReadonlyArray<TIngredientType>,
    price:                  number 
}

const initialState: TConstructorState = {
    selectedBun: {},
    priceBun: 0,
    selectedIngredients: [],
    price: 0
}

export const constructorReducer = (state = initialState, action: TApplicationActions): TConstructorState => {
    switch(action.type) {
        case PUT_BUN: {
            return {...state, price: state.price - state.priceBun + action.data.price*2, priceBun: action.data.price*2, selectedBun: action.data}
        }
        case PUT_INGREDIENT: {
            return {...state, price: state.price + action.data.price, selectedIngredients: [...state.selectedIngredients, action.data]}
        }
        case DELETE_INGREDIENT: {
            const newIngredients = state.selectedIngredients.filter((ingredient)=> ingredient.id !== action.data.id);
            return {...state, price: state.price - action.data.price, selectedIngredients: newIngredients}
        }
        case UPDATE_COMPONENT_ORDER: {
            return {...state, selectedIngredients: action.data
              }
        }
        default: {
            return state
        }
    }
}