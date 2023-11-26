import { CREATE_ORDER } from './order';
import { GET_INGREDIENTS_SUCCESS } from './ingredients';
import BASE_URL from '../../units/base-url';
import checkReponse from '../../units/check-response';
import { TIngredientType } from '../../types/types';
import { AppDispatch, AppThunk } from '../../types/redux-types';

export const crtOrder: AppThunk = (dataBun: TIngredientType, dataIngredient: ReadonlyArray<TIngredientType>) => {
    return (dispatch: AppDispatch) => {
        const newArray = dataIngredient.map((ingredient) => ingredient._id);
        newArray.push(dataBun._id);
        const ingredients = {ingredients:newArray}
        fetch(BASE_URL+'/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingredients),
        })
            .then(checkReponse)
            .then(data => {
                dispatch({type:CREATE_ORDER, data:data})
            })
            .catch(error => {
                console.error(error);
            });
    }
};

export const getData: AppThunk = () => {
    return (dispatch: AppDispatch) => {
        fetch(BASE_URL+'/ingredients')
        .then(checkReponse)
        .then(data => dispatch({type: GET_INGREDIENTS_SUCCESS, data: data.data}))
        .catch(console.error);
    }
}