import React, { Fragment, useRef, useEffect  } from 'react';
import PropTypes from 'prop-types';
import {Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import mainStyles from './burger-ingredients.module.css'

const ShowBun = (ingredient) => {
    if (ingredient.type === 'bun') {
        return (
            <div className={mainStyles.showPadding}>
                <img src={ingredient.image}/>
                <div className={mainStyles.price}>
                    <p className={`${mainStyles.priceText} text text_type_digits-default`}>{ingredient.price}</p>
                    <CurrencyIcon/>
                </div>
                <p className={`${mainStyles.ingredientPad} text text_type_main-default`}>{ingredient.name}</p>
            </div>
        )
    }
    return null;
}

const ShowSauce = (ingredient) => {
    if (ingredient.type === 'sauce') {
        return (
            <div className={mainStyles.showPadding}>
                <img src={ingredient.image}/>
                <div className={mainStyles.price}>
                    <p className={`${mainStyles.priceText} text text_type_digits-default`}>{ingredient.price}</p>
                    <CurrencyIcon/>
                </div>
                <p className={`${mainStyles.ingredientPad} text text_type_main-default`}>{ingredient.name}</p>
            </div>
        )
    }
    return null;
}

const ShowFilling = (ingredient) => {
    if (ingredient.type === 'main') {
        return (
            <div className={mainStyles.showPadding}>
                <img src={ingredient.image}/>
                <div className={mainStyles.price}>
                    <p className={`${mainStyles.priceText} text text_type_digits-default`}>{ingredient.price}</p>
                    <CurrencyIcon/>
                </div>
                <p className={`${mainStyles.ingredientPad} text text_type_main-default`}>{ingredient.name}</p>
            </div>
        )
    }
    return null;
}

const BurgerIngredints = (props) => {
    const [current, setCurrent] = React.useState('one')
    const setTab = (tab) => {
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <div className={mainStyles.mainDiv}>
            <h1 className={`${mainStyles.headers} text text_type_main-large`}>Соберите бургер </h1>  
            <div className={mainStyles.tabs} onClick={setTab(current)}>
                <Tab  value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                Начинки
                </Tab>
            </div>
            <div className={`${mainStyles.ingredientsDiv} custom-scroll`}>
                <h2 id='Булки' className={`${mainStyles.headers} text text_type_main-medium`}>Булки</h2>
                <div className={mainStyles.ingredients}> 
                    {props.ingredients.map((ingredient)=>(
                        <React.Fragment key={ingredient._id}>
                            {ShowBun(ingredient)}
                        </React.Fragment>  
                    ))}
                </div>
                <h2 id ='Соусы' className={`${mainStyles.headers} text text_type_main-medium`}>Соусы</h2>
                <div className={mainStyles.ingredients}> 
                    {props.ingredients.map((ingredient)=>(
                        <React.Fragment key={ingredient._id}>
                            {ShowSauce(ingredient)}
                        </React.Fragment>  
                    ))}
                </div>      
                <h2 id='Начинки' className={`${mainStyles.headers} text text_type_main-medium`}>Начинки</h2>
                <div className={mainStyles.ingredients}> 
                    {props.ingredients.map((ingredient)=>(
                        <React.Fragment key={ingredient._id}>
                            {ShowFilling(ingredient)}
                        </React.Fragment>  
                    ))}
                </div>
            </div>     
        </div>
    )
}

BurgerIngredints.proipTypes= {
    ingredients: PropTypes.arrayOf(PropTypes.object)
}

  export default BurgerIngredints;