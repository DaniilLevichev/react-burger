import { CREATE_ORDER } from './order';
import { GET_INGREDIENTS_SUCCESS } from './ingredients';
import BASE_URL from '../../units/base-url';
import checkReponse from '../../units/check-response';

export const crtOrder = (dataBun, dataIngredient) => {
    return (dispatch) => {
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

export const getData = () => {
    return (dispatch) => {
        fetch(BASE_URL+'/ingredients')
        .then(checkReponse)
        .then(data => dispatch({type: GET_INGREDIENTS_SUCCESS, data: data.data}))
        .catch(console.error);
    }
}