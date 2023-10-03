import React from 'react';
import {BurgerPropTypes} from '../../prop-types/prop-types';
import {ConstructorElement, Button, CurrencyIcon, DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';

import mainStyles from './burger-constructor.module.css'

const placeBun = (component, id, place) => {
    if (component.type === 'bun' && component._id === id) {
        return(
            <ConstructorElement key={component._id}
            type={place === '(верх)' ? "top" : "bottom"}
            isLocked={true}
            text={`${component.name} ${place}`}
            price={component.price}
            thumbnail={component.image_mobile}
        />
        )
    }
    return null;
}

const placeComponent = (component) => {
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
                    />
                </div>
            </div>
        )
    }
}

const BurgerConctructor = (props) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const setIsModalClose = () => {
        setIsModalOpen(false);
    }
    return (      
        <div className={mainStyles.mainDiv}>
            <div className={mainStyles.bunDiv}>
                {props.components.map((component) => (
                    <React.Fragment key={component._id}>
                        {placeBun(component, '643d69a5c3f7b9001cfa093c', '(верх)')}
                    </React.Fragment>    
                ))}
            </div>

            <div className={`${mainStyles.constrCompnent} custom-scroll`}>
                {props.components.map((component) =>(
                    <React.Fragment key={component._id}>
                        {placeComponent(component)}
                    </React.Fragment>
                ))}
            </div>   
            
            <div  className={mainStyles.bunDiv}>
                {props.components.map((component) => (
                    <React.Fragment key={component._id}>
                        {placeBun(component, '643d69a5c3f7b9001cfa093c', '(низ)')}
                    </React.Fragment>
                ))}
            </div>
            <div className={mainStyles.result}> 
                <a className={`${mainStyles.resultPrice} text text_type_digits-medium `}>19010</a>
                <CurrencyIcon type="primary" />
                <Button onClick={() => {setIsModalOpen(true);}} htmlType="button" type="primary" size="medium">Офоромить заказ</Button>
            </div>
            {isModalOpen && 
            <Modal onClick={setIsModalClose}>
                <OrderDetails/>
                <ModalOverlay onClick={setIsModalClose}/>
            </Modal>}
        </div>
    );
}

BurgerConctructor.propTypes = BurgerPropTypes;

export default BurgerConctructor;