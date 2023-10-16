import React from 'react';
import mainStyles from './burger-ingredients.module.css'
import { BurgerPropTypes } from '../../prop-types/prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDrag } from "react-dnd";
import { ShowIngredient } from './show-ingredient';
import { useInView } from 'react-intersection-observer';

const BurgerIngredients = () => {

    const data = useSelector(state => state.ingredients);

    const [refBun,      inViewBun] = useInView();
    const [refSauce,    inViewSauce] = useInView();
    const [refMain,     inViewMain] = useInView();

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
            <div className={mainStyles.tabs} onClick={setTab(current)}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
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
                <div ref={refBun} className={mainStyles.ingredients}> 
                    {data.ingredients.map((ingredient, index)=>(
                        <ShowIngredient key={index} ingredient={ingredient} type='bun'/>
                    ))}
                </div>
                <h2 id ='Соусы' className={`${mainStyles.headers} text text_type_main-medium`}>Соусы</h2>
                <div ref={refSauce} className={mainStyles.ingredients}> 
                    {data.ingredients.map((ingredient, index)=>(
                        <ShowIngredient key={index} ingredient={ingredient} type='sauce'/>
                    ))}
                </div>
                <h2 id='Начинки' className={`${mainStyles.headers} text text_type_main-medium`}>Начинки</h2>
                <div ref={refMain} className={mainStyles.ingredients}> 
                    {data.ingredients.map((ingredient, index)=>(
                        <ShowIngredient key={index} ingredient={ingredient} type='main'/>
                    ))}
                </div>
            </div>
        </div>
    )
}


BurgerIngredients.propTypes = BurgerPropTypes;

  export default BurgerIngredients;