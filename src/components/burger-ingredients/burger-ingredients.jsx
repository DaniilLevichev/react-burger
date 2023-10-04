import React from 'react';
import {BurgerPropTypes} from '../../prop-types/prop-types';
import {Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import mainStyles from './burger-ingredients.module.css'
import IngredientDetails from '../ingredient-details/ingredient-details';



const BurgerIngredients = (props) => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [ingrState, setIngredient] = React.useState({});
    
    const setIsModalClose = () => {
        setIsModalOpen(false);
    }

    const [current, setCurrent] = React.useState('one')
    const setTab = (tab) => {
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    const showIngredient = (ingredient, type) => {
        if (ingredient.type === type) {
            return (
                <div className={mainStyles.showPadding} onClick={() => {setIsModalOpen(true); setIngredient(ingredient)}}>
                    
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
                        <React.Fragment key={ingredient._id} >
                            {showIngredient(ingredient, 'bun')}
                        </React.Fragment>  
                    ))}
                </div>
                <h2 id ='Соусы' className={`${mainStyles.headers} text text_type_main-medium`}>Соусы</h2>
                <div className={mainStyles.ingredients}> 
                    {props.ingredients.map((ingredient)=>(
                        <React.Fragment key={ingredient._id}>
                            {showIngredient(ingredient, 'sauce')}
                        </React.Fragment>  
                    ))}
                </div>      
                <h2 id='Начинки' className={`${mainStyles.headers} text text_type_main-medium`}>Начинки</h2>
                <div className={mainStyles.ingredients}> 
                    {props.ingredients.map((ingredient)=>(
                        <React.Fragment key={ingredient._id}>
                            {showIngredient(ingredient, 'main')}
                        </React.Fragment>  
                    ))}
                </div>
            </div>
            {isModalOpen && 
            <Modal header='Детали ингридиента' onClick={setIsModalClose}>
                <IngredientDetails ingredient={ingrState}/>
            </Modal>}
        </div>
    )
}


BurgerIngredients.propTypes = BurgerPropTypes;

  export default BurgerIngredients;