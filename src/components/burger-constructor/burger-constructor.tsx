import React from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import mainStyles from './burger-constructor.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { PUT_BUN, PUT_INGREDIENT, UPDATE_COMPONENT_ORDER } from '../../services/actions/constructor';   
import { v4 as uuidv4 } from 'uuid';
import { PlaceComponent } from './place-component';
import { crtOrder } from '../../services/actions/index';
import { useNavigate } from 'react-router';
import getCookie from '../../units/get-cookie';

type TIngredientType = {
    _id:            string;
    name:           string;
    type:           string;
    proteins:       number;
    fat:            number;
    carbohydrates:  number;
    calories:       number;
    price:          number;
    image:          string;
    image_mobile:   string;
    image_large:    string;
    __v:            number;
    id?:            string;
}

const BurgerConctructor = () => {
    const dataBun        = useSelector((state: any) => state.constructorReducer.selectedBun);
    const dataIngredient = useSelector((state: any) => state.constructorReducer.selectedIngredients);
    const dataPrice      = useSelector((state: any) => state.constructorReducer.price);
    const dataOrder      = useSelector((state: any) => state.order.request);
    const dataUser       = useSelector((state: any) => state.user.userData.name);
    const dispatch       = useDispatch();
    const navigate       = useNavigate();

    const [{handlerId}, dropTarget] = useDrop({
        accept: "dragIngredient",
        drop(item: TIngredientType) {
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

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const setIsModalClose = () => {
        setIsModalOpen(false);
    };

    const moveComponent = (dragIndex: number, hoverIndex: number) => {
        const dragComponent = dataIngredient[dragIndex];
        const newComponents = [...dataIngredient];
        newComponents.splice(dragIndex, 1);
        newComponents.splice(hoverIndex, 0, dragComponent);
        dispatch({type:UPDATE_COMPONENT_ORDER, data: newComponents})
    };

    return (      
        <div ref={dropTarget} className={mainStyles.mainDiv}>
            <div className={mainStyles.bunDiv}>
                {dataPrice ? <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={`${dataBun.name} верх`}
                    price={dataBun.price}
                    thumbnail={dataBun.image_mobile}/> : <h1 className='text text_type_main-default'>Добавьте булку</h1>}
            </div>

            <div className={`${mainStyles.constrCompnent} custom-scroll`}>
                {dataPrice ? dataIngredient.map((component: TIngredientType, index: number) =>(
                    <PlaceComponent 
                    component={component} 
                    id={component.id}
                    key={component.id} 
                    index={index}
                    moveComponent={moveComponent}/>
                )) : <h1 className='text text_type_main-default'>Добавьте ингредиенты</h1>}
            </div>   
            
            <div className={mainStyles.bunDiv}>
                {dataPrice ? <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text={`${dataBun.name} низ`}
                    price={dataBun.price}
                    thumbnail={dataBun.image_mobile}/> : <h1 className='text text_type_main-default'>Добавьте булку</h1>}
            </div>
            <div className={mainStyles.result}> 
                <a className={`${mainStyles.resultPrice} text text_type_digits-medium `}>{dataPrice}</a>
                {dataPrice && <CurrencyIcon type="primary" />}
                {dataPrice && <Button onClick={() => {if (dataUser === undefined) navigate('/login');  setIsModalOpen(true); dispatch<any>(crtOrder(dataBun, dataIngredient)); }} htmlType="button" type="primary" size="medium">Офоромить заказ</Button>}
            </div>
            {isModalOpen && dataOrder.success && 
            <Modal onClicked={setIsModalClose}>
                <OrderDetails orderNumber={dataOrder.order.number}/>
            </Modal>}
        </div>
    );
}

export default BurgerConctructor;