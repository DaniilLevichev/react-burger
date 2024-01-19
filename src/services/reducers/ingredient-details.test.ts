import { detailReducer, TDetailReducer } from './ingredient-details';
import { CHECK_DETAIL } from '../actions/ingredient-detail';
import { TApplicationActions } from '../../types/redux-types';
import { TIngredientType } from '../../types/types';

describe('detailReducer', () => {
  let initialState: TDetailReducer;

  beforeEach(() => {
    initialState = {
      checkedIngredient: null,
    };
  });

  it('should handle CHECK_DETAIL', () => {
    const ingredient: TIngredientType = {
        _id:"60666c42cc7b410027a1a9b1",
        name:"Краторная булка N-200i",
        type:"bun",
        proteins:80,
        fat:24,
        carbohydrates:53,
        calories:420,
        price:1255,
        image:"https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v:0
      };
    const action: TApplicationActions = { type: CHECK_DETAIL, data: ingredient };
    const result = detailReducer(initialState, action);
    expect(result.checkedIngredient).toEqual(ingredient);
  });
});