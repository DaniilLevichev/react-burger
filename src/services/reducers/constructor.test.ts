import { constructorReducer, TConstructorState } from './constructor';
import { PUT_BUN, PUT_INGREDIENT, DELETE_INGREDIENT, UPDATE_COMPONENT_ORDER } from '../actions/constructor';
import { TIngredientType } from '../../types/types';

describe('constructorReducer', () => {
  let initialState: TConstructorState;

  beforeEach(() => {
    initialState = {
      selectedBun: null,
      priceBun: 0,
      selectedIngredients: [],
      price: 0,
    };
  });

  it('should handle PUT_BUN', () => {

    const bun: TIngredientType = {
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

    const action = {
      type: PUT_BUN,
      data: bun
    };

    const result = constructorReducer(initialState, action);

    expect(result.selectedBun).toEqual(action.data);
    expect(result.priceBun).toEqual(action.data.price * 2);
    expect(result.price).toEqual(action.data.price * 2);
  });

  it('should handle PUT_INGREDIENT', () => {
    const ingredient: TIngredientType = {
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
   };

    const action = {
      type: PUT_INGREDIENT,
      data: ingredient,
    };

    const newState = constructorReducer(initialState, action);

    expect(newState.selectedIngredients).toEqual([ingredient]);
    expect(newState.price).toEqual(action.data.price);
  });

  it('should handle DELETE_INGREDIENT', () => {
    const ingredient: TIngredientType = {
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
   };
    const modifiedState = {
      ...initialState,
      selectedIngredients: [ingredient],
      price: 3000,
    };

    const action = {
      type: DELETE_INGREDIENT,
      data: ingredient,
    };

    const newState = constructorReducer(modifiedState, action);

    expect(newState.selectedIngredients).toEqual([]);
    expect(newState.price).toEqual(0);
  });

  it('should handle UPDATE_COMPONENT_ORDER', () => {
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

    const action = {
      type: UPDATE_COMPONENT_ORDER,
      data: ingredients,
    };

    const newState = constructorReducer(initialState, action);

    expect(newState.selectedIngredients).toEqual(ingredients);
  });
});
