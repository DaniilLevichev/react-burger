import React from 'react';
import mainStyles from './burger-ingredients.module.css'
import { BurgerPropTypes } from '../../prop-types/prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { ShowIngredient } from './show-ingredient';
import { useInView } from 'react-intersection-observer';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { DELETE_DETAIL } from '../../services/actions/ingredient-detail';
import { v4 as uuidv4 } from 'uuid';

const BurgerIngredients = () => {

    const data = useSelector(state => state.ingredients);
    const [isModalOpen, setIsModalOpen]   = React.useState(false);
    const [ingrState,   setIngredient]    = React.useState({});

    const dispatch = useDispatch();

    const setIsModalClose = () => {
        setIsModalOpen(false);
        dispatch ({type: DELETE_DETAIL, data:null});
    }

    const [refBun,      inViewBun]   = useInView();
    const [refSauce,    inViewSauce] = useInView();
    const [refMain,     inViewMain]  = useInView();

    const [, dragRef] = useDrag({
        type: 'dragIngredient',
        item: data.ingredients[2]
    })

    const [current, setCurrent] = React.useState('one')
    const setTab = (tab) => {
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        inViewBun && inViewSauce && !inViewMain && setCurrent('Булки');
        !inViewBun && inViewSauce && inViewMain && setCurrent('Соусы');
        !inViewBun && !inViewSauce && inViewMain && setCurrent('Начинки');
    }, [inViewBun, inViewSauce, inViewMain])
    
    return (
        <div ref={dragRef}  className={mainStyles.mainDiv}>
            <h1 className={`${mainStyles.headers} text text_type_main-large`}>Соберите бургер </h1>  
            <div className={mainStyles.tabs}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setTab}>
                Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setTab}>
                Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setTab}>
                Начинки
                </Tab>
            </div>
            <div className={`${mainStyles.ingredientsDiv} custom-scroll`}>
                <h2 id='Булки' className={`${mainStyles.headers} text text_type_main-medium`}>Булки</h2>
                <div ref={refBun} className={mainStyles.ingredients}> 
                    {data.ingredients.map((ingredient, index)=>(
                        <ShowIngredient setIsModalOpen={setIsModalOpen} setIngredient={setIngredient} key={uuidv4()} ingredient={ingredient} type='bun'/>
                    ))}
                </div>
                <h2 id ='Соусы' className={`${mainStyles.headers} text text_type_main-medium`}>Соусы</h2>
                <div ref={refSauce} className={mainStyles.ingredients}> 
                    {data.ingredients.map((ingredient, index)=>(
                        <ShowIngredient setIsModalOpen={setIsModalOpen} setIngredient={setIngredient} key={uuidv4()} ingredient={ingredient} type='sauce'/>
                    ))}
                </div>
                <h2 id='Начинки' className={`${mainStyles.headers} text text_type_main-medium`}>Начинки</h2>
                <div ref={refMain} className={mainStyles.ingredients}> 
                    {data.ingredients.map((ingredient, index)=>(
                        <ShowIngredient setIsModalOpen={setIsModalOpen} setIngredient={setIngredient} key={uuidv4()} ingredient={ingredient} type='main'/>
                    ))}
                </div>
                {isModalOpen && 
                <Modal header='Детали ингридиента' onClicked={setIsModalClose}>
                    <IngredientDetails ingredient={ingrState}/>
                </Modal>}
            </div>
        </div>
    )
}


BurgerIngredients.propTypes = BurgerPropTypes;

  export default BurgerIngredients;