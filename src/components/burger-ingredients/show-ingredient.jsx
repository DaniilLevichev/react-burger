import React from 'react';
import mainStyles from './burger-ingredients.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector } from 'react-redux';

export const ShowIngredient = (props) =>{
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [ingrState,   setIngredient]    = React.useState({});
    const dataIngredient = useSelector(state => state.constructorReducer.selectedIngredients);
    const dataBun = useSelector(state => state.constructorReducer.selectedBun);
    
    const countIngredient = (ingredients, bun, id, type) =>{
        let cnt = 0;
        type !== 'bun' ?
        ingredients.map((ingredient)=>(
            ingredient._id === id && cnt++
        )) : id === bun._id ?
            cnt = 1 :
            cnt = 0
        return cnt;
    }

    const setIsModalClose = () => {
        setIsModalOpen(false);
    }

    const [, dragRef] = useDrag({
        type: 'dragIngredient',
        item: props.ingredient
    })
    if (props.ingredient.type === props.type) {
        return (
            <div ref={dragRef} className={mainStyles.showPadding} onClick={() => {setIsModalOpen(true); setIngredient(props.ingredient)}}>       
                {countIngredient(dataIngredient, dataBun, props.ingredient._id, props.ingredient.type) > 0 && <Counter count={countIngredient(dataIngredient, dataBun, props.ingredient._id, props.ingredient.type)} size="small" />}
                <img src={props.ingredient.image}/>
                <div className={mainStyles.price}>
                    <p className={`${mainStyles.priceText} text text_type_digits-default`}>{props.ingredient.price}</p>
                    <CurrencyIcon/>
                </div>
                <p className={`${mainStyles.ingredientPad} text text_type_main-default`}>{props.ingredient.name}</p>
                {isModalOpen && 
                <Modal header='Детали ингридиента' onClick={setIsModalClose}>
                    <IngredientDetails ingredient={ingrState}/>
                </Modal>}
            </div>
        )
    }
    return null;
}