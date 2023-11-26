import { TApplicationActions, TConstructorReducer } from "../../types/redux-types";
import { PUT_BUN, PUT_INGREDIENT, DELETE_INGREDIENT, UPDATE_COMPONENT_ORDER } from "../actions/constructor";

const initialState = {
    selectedBun: {},
    priceBun: null,
    selectedIngredients: [],
    price: null
}

export const constructorReducer = (state = initialState, action) => {
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