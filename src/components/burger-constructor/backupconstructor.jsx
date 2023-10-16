import React from 'react';
import {BurgerPropTypes} from '../../prop-types/prop-types';
import {ConstructorElement, Button, CurrencyIcon, DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import mainStyles from './burger-constructor.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { PUT_BUN, PUT_INGREDIENT, DELETE_INGREDIENT } from '../../services/actions/constructor';   
import { v4 as uuidv4 } from 'uuid';

const BurgerConctructor = () => {
    const dataBun        = useSelector(state => state.constructorReducer.selectedBun);
    const dataIngredient = useSelector(state => state.constructorReducer.selectedIngredients);
    const dataPrice      = useSelector(state => state.constructorReducer.price);
    const dispatch       = useDispatch();
    const [{handlerId}, dropTarget] = useDrop({
        accept: "dragIngredient",
        drop(item) {
            item.type === 'bun' ?
                dispatch({ type: PUT_BUN,        data: item}):
                dispatch({ type: PUT_INGREDIENT, data: { ...item, id: uuidv4() } });
        },
        collect(monitor) {
            return {
              handlerId: monitor.getHandlerId(),
            }
        }
    });
    console.log(handlerId);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const setIsModalClose = () => {
        setIsModalOpen(false);
    }
    const placeComponent = (component, i) => {
        if (component.type === 'main' || component.type === 'sauce') {
            return(
                <div className={mainStyles.compMainDiv}>
                    <div className={mainStyles.compIcon}>
                        <DragIcon/> 
                    </div>
                    <div className={mainStyles.compElement}>
                        <ConstructorElement key={component._id}
                        text={component.name}
                        price={component.price}
                        thumbnail={component.image_mobile}
                        handleClose={()=>{dispatch({type: DELETE_INGREDIENT, data: component})}}
                        />
                    </div>
                </div>
            )
        }
    }
    return (      
        <div ref={dropTarget} className={mainStyles.mainDiv}>
            <div className={mainStyles.bunDiv}>
                {dataBun ? <ConstructorElement key={dataBun._id}
                    type='top'
                    isLocked={true}
                    text={`${dataBun.name} верх`}
                    price={dataBun.price}
                    thumbnail={dataBun.image_mobile}/> : <h1 className='text text_type_main-default'>Добавьте булку</h1>}
            </div>

            <div  className={`${mainStyles.constrCompnent} custom-scroll`}>
                {dataIngredient ? dataIngredient.map((component, index) =>(
                    <React.Fragment key={index}>
                        {placeComponent(component,  index)}
                    </React.Fragment> 
                )) : <h1 className='text text_type_main-default'>Добавьте ингредиенты</h1>}
            </div>   
            
            <div  className={mainStyles.bunDiv}>
                {dataBun ? <ConstructorElement key={dataBun._id}
                    type='bottom'
                    isLocked={true}
                    text={`${dataBun.name} низ`}
                    price={dataBun.price}
                    thumbnail={dataBun.image_mobile}/> : <h1 className='text text_type_main-default'>Добавьте булку</h1>}
                    
            </div>
            <div className={mainStyles.result}> 
                <a className={`${mainStyles.resultPrice} text text_type_digits-medium `}>{dataPrice}</a>
                <CurrencyIcon type="primary" />
                <Button onClick={() => {setIsModalOpen(true);}} htmlType="button" type="primary" size="medium">Офоромить заказ</Button>
            </div>
            {isModalOpen && 
            <Modal onClick={setIsModalClose}>
                <OrderDetails/>
            </Modal>}
        </div>
    );
}

BurgerConctructor.propTypes = BurgerPropTypes;

export default BurgerConctructor;