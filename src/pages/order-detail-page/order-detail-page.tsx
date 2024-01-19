import React from 'react';
import mainStyles from './order-detail-page.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../types/redux-types';
import { FEED_CONNECTION_CLOSE, FEED_CONNECTION_CLOSED, FEED_CONNECTION_START, ORDER_CONNECTION_CLOSE, ORDER_CONNECTION_START } from '../../services/actions/feed-web-socket';
import { useLocation } from 'react-router';
import { TIngredientType, TWSResponse, TWSResponseOrder, TWSResponseOrders } from '../../types/types';
import getCookie from '../../units/get-cookie';
import { TWSState } from '../../services/reducers/feed-web-socket';

export const OrderNumber = () => {

    const location = useLocation();
    const stringFeed = location.pathname.match(/\d+/);
    const numberFeed = stringFeed ? parseInt(stringFeed[0]) : 0;
    const dispatch = useDispatch();
    const accessToken: string | undefined = getCookie('accessToken')?.slice(7);
    
    React.useEffect(()=> {
        if (location.state === null) {
            if (location.pathname.slice(0, 2) == '/f') {
    
                dispatch({type: FEED_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all'});
                
                return () => {
                    dispatch({type: FEED_CONNECTION_CLOSE});
                }
            
            } else {
                dispatch({type: ORDER_CONNECTION_START, payload: `wss://norma.nomoreparties.space/orders?token=${accessToken}`});
                
                return () => {
                    dispatch({type:ORDER_CONNECTION_CLOSE});
                }
            }
        }
    }, [dispatch])
    
    const ingredients = useSelector( state => state.ingredients);


    
    const dataOrders = useSelector( state => state.wsOrder );
    const dataFeed = useSelector( state => state.ws );
    
    let data: TWSResponse | TWSState | null= null;
    if (location.pathname.slice(0, 2) == '/f') {
        data = dataFeed;
    } else {
        data = dataOrders;
    }

    const objectData = data.messages?.orders.find((order: TWSResponseOrder)=> order.number === numberFeed);
    
    let array: Array<TIngredientType> = [];

    objectData?.ingredients.map((id) => {
        ingredients.ingredients.map((ingredient) => {
            if (id === ingredient._id) {
                array.push(ingredient);
            }
        })
    })
    
    let idCounts: {[key: string]: number} = {};

    array.forEach((product) => {
        if (idCounts[product._id]) {
            idCounts[product._id]++;
            product.count = idCounts[product._id];
            product.lastPrice = product.price * idCounts[product._id];
        } else {
            idCounts[product._id] = 1;
            product.count = 1;
            product.lastPrice = product.price;
        }
    });
    let uniqueArray = array.filter((obj, index, self) =>
        index === self.findIndex((o) => o._id === obj._id)
    );
    let totalLastPrice = uniqueArray.reduce((total, obj) => {
        if (obj.lastPrice) {
          return total + obj.lastPrice;
        } else {
          return total;
        }
    }, 0);

    return(
        <div className={mainStyles.mainDiv}>
            <div className={mainStyles.orderNumber}>
                <p className="text text_type_digits-default">#{numberFeed}</p>
            </div>
            <h2 className="text text_type_main-medium mt-10">{objectData?.name}</h2>
            <p className="text text_type_main-default text_color_inactive mt-3">{objectData?.status === 'done' ? 'Выполнен' : 'В работе'}</p>
            <p className="text text_type_main-medium mt-15">Состав</p>
            <div className={`${mainStyles.ingredientsList} custom-scroll`}>
                {uniqueArray.map((arr, index) => (
                    <div className={mainStyles.body} key={index}>
                        <div className={mainStyles.body}>
                            <img src={arr.image_mobile}/>
                            <p className="text text_type_main-small">{arr.name}</p>
                        </div>
                        <div className={mainStyles.price}>
                            <p className="text text_type_digits-default">{arr.count} x {arr.lastPrice}</p>
                            <div className={mainStyles.priceIcon}>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={mainStyles.bottomInfo}>
                {objectData && <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(objectData?.createdAt)} />}
                <div className={mainStyles.price}>
                    <p className="text text_type_digits-default mr-2">{totalLastPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )    
}