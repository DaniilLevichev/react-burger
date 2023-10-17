import { CREATE_ORDER } from './order';
import BASE_URL from '../../units/base-url';

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const crtOrder = (dataBun, dataIngredient) => {
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

export default crtOrder;