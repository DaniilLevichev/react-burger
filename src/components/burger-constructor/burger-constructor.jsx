import React from 'react';
import { BurgerPropTypes} from '../../units/ingredients-types';
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
import BASE_URL from '../../units/base-url';
import checkReponse from '../../units/check-response';
import { checkUser } from '../../services/actions/identification';

function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  } 

const BurgerConctructor = () => {
    const dataBun        = useSelector(state => state.constructorReducer.selectedBun);
    const dataIngredient = useSelector(state => state.constructorReducer.selectedIngredients);
    const dataPrice      = useSelector(state => state.constructorReducer.price);
    const dataOrder      = useSelector(state => state.order.request);
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

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const setIsModalClose = () => {
        setIsModalOpen(false);
    };

    const moveComponent = (dragIndex, hoverIndex) => {
        const dragComponent = dataIngredient[dragIndex];
        const newComponents = [...dataIngredient];
        newComponents.splice(dragIndex, 1);
        newComponents.splice(hoverIndex, 0, dragComponent);
        dispatch({type:UPDATE_COMPONENT_ORDER, data: newComponents})
    };
    React.useEffect(()=>{
        const accessToken = getCookie('accessToken');
        //const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken='))?.split('=')[1];
        const refreshToken  = getCookie('refreshToken');
        dispatch(checkUser(accessToken, refreshToken));
    }, [])
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
                {dataPrice ? dataIngredient.map((component, index) =>(
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
                {dataPrice && <Button onClick={() => {setIsModalOpen(true); dispatch(crtOrder(dataBun, dataIngredient)); }} htmlType="button" type="primary" size="medium">Офоромить заказ</Button>}
            </div>
            {isModalOpen && dataOrder.success && 
            <Modal onClicked={setIsModalClose}>
                <OrderDetails orderNumber={dataOrder.order.number}/>
            </Modal>}
        </div>
    );
}

BurgerConctructor.propTypes = BurgerPropTypes;

export default BurgerConctructor;