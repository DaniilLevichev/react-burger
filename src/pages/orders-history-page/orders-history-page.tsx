import React from 'react';
import { PasswordInput, EmailInput, Input, Button, CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './orders-history-page.module.css';
import { useDispatch, useSelector} from '../../types/redux-types';
import { useLocation, useNavigate } from 'react-router';
import getCookie from '../../units/get-cookie';
import { logoutUser } from '../../services/actions/identification';
import { useState } from 'react';
import { editUser } from '../../services/actions/identification';
import { NavLink } from 'react-router-dom';
import { ORDER_CONNECTION_CLOSE, ORDER_CONNECTION_START } from '../../services/actions/feed-web-socket';
import { TIngredientType, TWSResponse, TWSResponseOrder } from '../../types/types';

export const OrdersHistoryPage = () => {

    const dispatch = useDispatch();

    const accessToken: string | undefined = getCookie('accessToken')?.slice(7);

    React.useEffect(()=> {
                
        dispatch({type: ORDER_CONNECTION_START, payload: `wss://norma.nomoreparties.space/orders?token=${accessToken}`});
        
        return () => {
            dispatch({type:ORDER_CONNECTION_CLOSE});
        }

    }, [dispatch])

    const location = useLocation();

    const data = useSelector(state => state.wsOrder);
    const ingredients = useSelector( state => state.ingredients);
    const navigate  = useNavigate();

    const outUser = () => {
        const accessToken = getCookie('accessToken');
        const refreshToken  = getCookie('refreshToken');
        if (accessToken && refreshToken) {
            dispatch(logoutUser(accessToken, refreshToken));
            navigate('/login');
        }
    }

    const showOrders = (order: TWSResponseOrder, index: number) => {

        let array: Array<string> = [];
        let arrayPrice: Array<number> = [];

        order.ingredients.map((id) => {
            ingredients.ingredients.map((ingredient) => {
                if(id === ingredient._id) {
                    array.push(ingredient.image_mobile);
                    arrayPrice.push(ingredient.price);
                }
            })
        })

        const openModal = (numberFeed: number) => {
            navigate(`/profile/orders/${numberFeed}`, {state: { background: location }})
        }
        
        const sum = arrayPrice.reduce((total, num) => total + num, 0);

        return (
            <div className={mainStyles.feedContainer} key={index} onClick={()=>{openModal(order.number)}}>
                <div className={mainStyles.containerTop}>
                    <p className="text text_type_main-default">#{order.number}</p>
                    <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(order.createdAt)} />
                </div>
                <div className={mainStyles.containerMiddle}>
                    <p className="text text_type_main-medium">{order.name}</p>
                </div>
                <div className={mainStyles.containerBottom}>
                    <ul className={mainStyles.imagesOrder}>
                        {array.slice(0, 6).map((arr, index) => (
                            <li className={mainStyles.imgaesItem} key={index}>
                                {index === 0 && array.length > 5 ? (
                                    <span key={index}>+{array.length - 5}</span>
                                ) : (                                     
                                    <img className={mainStyles.image} src={arr} alt={`Image ${index}`} />
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className={mainStyles.price}>
                        <p className="text text_type_digits-default">{sum}</p>
                        <div className={mainStyles.priceIcon}>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    if (data.messages?.orders) {
        return (
            <div className={mainStyles.mainDiv}>
                <div className={mainStyles.leftDiv}>
                    <div className={mainStyles.navPanel}>
                        <NavLink to='/profile' className={`${mainStyles.link} text text_type_main-large text_color_inactive`}>Профиль</NavLink>
                    </div>
                    <div className={mainStyles.navPanel}>
                        <a className="text text_type_main-large">История заказов</a>
                    </div>
                    <div className={mainStyles.navPanel}>
                        <a onClick={()=>{outUser()}}className="text text_type_main-large text_color_inactive">Выход</a>
                    </div>
                </div>
                <div className={`${mainStyles.scroll} custom-scroll`}>
                    {data.messages?.orders.map((order, index) => (
                        showOrders(order, index)
                    ))}
                </div>
            </div>
        )
    } else {
        return (<></>)
    }
}