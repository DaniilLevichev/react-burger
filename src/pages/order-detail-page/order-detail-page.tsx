import React from 'react';
import mainStyles from './order-detail-page.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../types/redux-types';
import { FEED_CONNECTION_CLOSE, FEED_CONNECTION_CLOSED, FEED_CONNECTION_START } from '../../services/actions/feed-web-socket';
import { useLocation } from 'react-router';
import { TIngredientType, TWSResponseOrder } from '../../types/types';

export const OrderNumber = () => {

    const location = useLocation();
    //@ts-ignore
    const numberFeed = parseInt(location.pathname.match(/\d+/)[0]);
    const dispatch = useDispatch();

    React.useEffect(()=> {
                
        dispatch({type: FEED_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all'});
        
        return () => {
            dispatch({type: FEED_CONNECTION_CLOSE});
        }
    }, [dispatch])
    
    const ingredients = useSelector( state => state.ingredients);
    const data: any = useSelector( state => state.ws );

    const objectData = data.messages[data.messages.length - 1]?.orders.find((order: TWSResponseOrder)=> order.number === numberFeed);
    
    let array: Array<TIngredientType> = [];

    objectData?.ingredients.map((id: string) => {
        ingredients.ingredients.map((ingredient: TIngredientType) => {
            if (id === ingredient._id) {
                array.push(ingredient);
            }
        })
    })

    return(
        <div className={mainStyles.mainDiv}>
            <div className={mainStyles.orderNumber}>
                <p className="text text_type_digits-default">#{numberFeed}</p>
            </div>
            <h2 className="text text_type_main-medium mt-10">{objectData?.name}</h2>
            <p className="text text_type_main-default text_color_inactive mt-3">{objectData?.status === 'done' ? 'Выполнен' : 'В работе'}</p>
            <p className="text text_type_main-medium mt-15">Состав</p>
            <div className={`${mainStyles.ingredientsList} custom-scroll`}>
                {array.map((arr: TIngredientType, index: number) => (
                    <div className={mainStyles.body} key={index}>
                        <div className={mainStyles.body}>
                            <img src={arr.image_mobile}/>
                            <p className="text text_type_main-small">{arr.name}</p>
                        </div>
                        <div className={mainStyles.price}>
                            <p className="text text_type_digits-default">480</p>
                            <div className={mainStyles.priceIcon}>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={mainStyles.bottomInfo}>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(objectData?.createdAt)} />
                <div className={mainStyles.price}>
                    <p className="text text_type_digits-default mr-2">510</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )    
}