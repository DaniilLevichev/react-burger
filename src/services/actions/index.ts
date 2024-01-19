import { CREATE_ORDER } from './order';
import { GET_INGREDIENTS_SUCCESS } from './ingredients';
import BASE_URL from '../../units/base-url';
import checkReponse from '../../units/check-response';
import { TIngredientType } from '../../types/types';
import { AppDispatch, AppThunk } from '../../types/redux-types';

type TOrder = {
    number: number
}

type TCrtOrder = {
    name: string,
    order: TOrder,
    success: boolean
}

export const crtOrder = (dataBun: TIngredientType, dataIngredient: TIngredientType[], accessToken: any): AppThunk<Promise<unknown>> => {
    return (dispatch) => {
        const newArray = dataIngredient.map((ingredient) => ingredient._id);
        newArray.push(dataBun._id);
        const ingredients = {ingredients:newArray}
        return (
            fetch(`${BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': accessToken
                },
                body: JSON.stringify(ingredients),
            })
                .then(checkReponse<TCrtOrder>)
                .then(data => {
                    dispatch({type:CREATE_ORDER, data:data})
                })
                .catch(error => {
                    console.error(error);
                })
        )
    }
};

type TGetData = {
    success: boolean,
    data: TIngredientType[]
}

export const getData = (): AppThunk<Promise<unknown>> => {
    return (dispatch) => {
        return(
            fetch(BASE_URL+'/ingredients')
            .then(checkReponse<TGetData>)
            .then(data => {
                console.log(data);
                dispatch({type: GET_INGREDIENTS_SUCCESS, data: data.data})
            })
            .catch(console.error)
        )
    }
}