import { ingredientsReducer, TIngredientReducer } from './ingredients';
import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from '../actions/ingredients';
import { TApplicationActions } from '../../types/redux-types';
import { TIngredientType } from '../../types/types';

describe('ingredientsReducer', () => {
  let initialState: TIngredientReducer;

  beforeEach(() => {
    initialState = {
      ingredients: [],
      isLoading: false,
    };
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    const action: TApplicationActions = { type: GET_INGREDIENTS_REQUEST };
    const result = ingredientsReducer(initialState, action);
    expect(result.isLoading).toEqual(true);
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    const ingredients: TIngredientType[] = [{
        _id:"60666c42cc7b410027a1a9b5",
        name:"Говяжий метеорит (отбивная)",
        type:"main",
        proteins:800,
        fat:800,
        carbohydrates:300,
        calories:2674,
        price:3000,
        image:"https://code.s3.yandex.net/react/code/meat-04.png",
        image_mobile:"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/meat-04-large.png",
        __v:0
      },
      {
        _id:"60666c42cc7b410027a1a9b5",
        name:"Говяжий метеорит (отбивная)",
        type:"main",
        proteins:800,
        fat:800,
        carbohydrates:300,
        calories:2674,
        price:3000,
        image:"https://code.s3.yandex.net/react/code/meat-04.png",
        image_mobile:"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/meat-04-large.png",
        __v:0
      }
    ];
    const action: TApplicationActions = { type: GET_INGREDIENTS_SUCCESS, data: ingredients };
    const result = ingredientsReducer(initialState, action);
    expect(result.isLoading).toEqual(false);
    expect(result.ingredients).toEqual(action.data);
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    const action: TApplicationActions = { type: GET_INGREDIENTS_FAILED };
    const result = ingredientsReducer(initialState, action);
    expect(result.isLoading).toEqual(false);
    expect(result.ingredients).toEqual([]);
  });
});