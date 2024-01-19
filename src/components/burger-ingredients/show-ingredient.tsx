import React from 'react';
import mainStyles from './burger-ingredients.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useDispatch, useSelector} from '../../types/redux-types';
import { CHECK_DETAIL } from '../../services/actions/ingredient-detail';
import { TShowIngredient, TIngredientType } from '../../types/types';

export const ShowIngredient = (props: TShowIngredient) =>{

    const dataIngredient    = useSelector( state => state.constructorReducer.selectedIngredients);
    const dataBun           = useSelector( state => state.constructorReducer.selectedBun);
    
    const dispatch = useDispatch();
    
    const countIngredient = (ingredients: TIngredientType[], bun: TIngredientType, id: string, type: string) =>{
        let cnt = 0;
        type !== 'bun' ?
        ingredients.map((ingredient)=>(
            ingredient._id === id && cnt++
        )) : id === bun._id ?
            cnt = 1 :
            cnt = 0
        return cnt;
    }

    const [, dragRef] = useDrag({
        type: 'dragIngredient',
        item: props.ingredient
    })

    if (props.ingredient.type === props.type) {
        return (
            <div ref={dragRef} className={mainStyles.showPadding} onClick={() => {props.openModal(props.ingredient._id); props.setIngredient(props.ingredient); dispatch({type: CHECK_DETAIL, data:props.ingredient})}}>       
                {!!dataIngredient && !!dataBun && countIngredient(dataIngredient, dataBun, props.ingredient._id, props.ingredient.type) > 0 && <Counter count={!!dataIngredient && !!dataBun && countIngredient(dataIngredient, dataBun, props.ingredient._id, props.ingredient.type)} size="small" />}
                <img src={props.ingredient.image}/>
                <div className={mainStyles.price}>
                    <p className={`${mainStyles.priceText} text text_type_digits-default`}>{props.ingredient.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={`${mainStyles.ingredientPad} text text_type_main-default`}>{props.ingredient?.name}</p>
                
            </div>
        )
    }
    return null;
}