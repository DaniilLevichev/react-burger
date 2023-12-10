import React from 'react';
import { PasswordInput, EmailInput, Input, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './orders-history-page.module.css';
import { useDispatch, useSelector} from '../../types/redux-types';
import { useNavigate } from 'react-router';
import getCookie from '../../units/get-cookie';
import { logoutUser } from '../../services/actions/identification';
import { useState } from 'react';
import { editUser } from '../../services/actions/identification';
import { NavLink } from 'react-router-dom';
import { ORDER_CONNECTION_CLOSE, ORDER_CONNECTION_START } from '../../services/actions/feed-web-socket';

export const OrdersHistoryPage = () => {

    const dispatch = useDispatch();

    const accessToken: string | undefined = getCookie('accessToken')?.slice(7);
    console.log(accessToken);

    React.useEffect(()=> {
                
        dispatch({type: ORDER_CONNECTION_START, payload: `wss://norma.nomoreparties.space/orders?token=${accessToken}`});
        
        return () => {
            dispatch({type:ORDER_CONNECTION_CLOSE});
        }

    }, [dispatch])

    const userName  = useSelector((state: any) => state.user.userData.name);
    const userEmail = useSelector((state: any) => state.user.userData.email);
    const navigate  = useNavigate();

    const outUser = () => {
        const accessToken = getCookie('accessToken');
        const refreshToken  = getCookie('refreshToken');
        //@ts-ignore
        dispatch(logoutUser(accessToken, refreshToken));
        navigate('/login');
    }

    return (
        userName ? 
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
                <div className={mainStyles.feedContainer}>
                    <div className={mainStyles.containerTop}>
                        <p className="text text_type_main-default">#034535</p>
                        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20</p>
                    </div>
                    <div className={mainStyles.containerMiddle}>
                        <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
                    </div>
                    <div className={mainStyles.containerBottom}>
                        <p className="text text_type_main-default">Тут картинки</p>
                        <div className={mainStyles.price}>
                            <p className="text text_type_digits-default">480</p>
                            <div className={mainStyles.priceIcon}>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={mainStyles.feedContainer}>
                    <div className={mainStyles.containerTop}>
                        <p className="text text_type_main-default">#034535</p>
                        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20</p>
                    </div>
                    <div className={mainStyles.containerMiddle}>
                        <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
                    </div>
                    <div className={mainStyles.containerBottom}>
                        <p className="text text_type_main-default">Тут картинки</p>
                        <div className={mainStyles.price}>
                            <p className="text text_type_digits-default">480</p>
                            <div className={mainStyles.priceIcon}>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={mainStyles.feedContainer}>
                    <div className={mainStyles.containerTop}>
                        <p className="text text_type_main-default">#034535</p>
                        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20</p>
                    </div>
                    <div className={mainStyles.containerMiddle}>
                        <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
                    </div>
                    <div className={mainStyles.containerBottom}>
                        <p className="text text_type_main-default">Тут картинки</p>
                        <div className={mainStyles.price}>
                            <p className="text text_type_digits-default">480</p>
                            <div className={mainStyles.priceIcon}>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={mainStyles.feedContainer}>
                    <div className={mainStyles.containerTop}>
                        <p className="text text_type_main-default">#034535</p>
                        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20</p>
                    </div>
                    <div className={mainStyles.containerMiddle}>
                        <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
                    </div>
                    <div className={mainStyles.containerBottom}>
                        <p className="text text_type_main-default">Тут картинки</p>
                        <div className={mainStyles.price}>
                            <p className="text text_type_digits-default">480</p>
                            <div className={mainStyles.priceIcon}>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={mainStyles.feedContainer}>
                    <div className={mainStyles.containerTop}>
                        <p className="text text_type_main-default">#034535</p>
                        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20</p>
                    </div>
                    <div className={mainStyles.containerMiddle}>
                        <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
                    </div>
                    <div className={mainStyles.containerBottom}>
                        <p className="text text_type_main-default">Тут картинки</p>
                        <div className={mainStyles.price}>
                            <p className="text text_type_digits-default">480</p>
                            <div className={mainStyles.priceIcon}>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> :
        null
    )
}