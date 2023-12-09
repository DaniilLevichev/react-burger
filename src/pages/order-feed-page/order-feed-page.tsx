import React from 'react';
import mainStyles from './order-feed-page.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../types/redux-types';
import { FEED_CONNECTION_CLOSE, FEED_CONNECTION_CLOSED, FEED_CONNECTION_START } from '../../services/actions/feed-web-socket';
import { useLocation, useNavigate } from 'react-router';
import { TIngredientType } from '../../types/types'

export const OrderFeed = () => {

    const navigate = useNavigate();
    const location = useLocation();
    
    const dispatch = useDispatch();

    const data: any = useSelector( state => state.ws );

    React.useEffect(()=> {
                
        dispatch({type: FEED_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all'});
        
        return () => {
            if(data.wsConnected) {
                dispatch({type: FEED_CONNECTION_CLOSE});
            }
        }
    }, [dispatch])

    const ingredients = useSelector( state => state.ingredients);

    const openModal = (numberFeed: number) => {
        navigate(`/feed/${numberFeed}`, {state: { background: location }})
    }

    const showFeeds = (feed: any, index: number) => {

        let array: Array<string> = [];

        feed.ingredients.map((id: string) => {
            ingredients.ingredients.map((ingredient: TIngredientType) => {
                if(id === ingredient._id) {
                    array.push(ingredient.image_mobile);
                }
            })
        })

        return(
            <div className={mainStyles.feedContainer} key={index} onClick={()=>{openModal(feed.number)}}>
                <div className={mainStyles.containerTop}>
                    <p className="text text_type_main-default">#{feed.number}</p>
                    <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(feed.createdAt)} />
                </div>
                <div className={mainStyles.containerMiddle}>
                    <p className="text text_type_main-medium">{feed.name}</p>
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
                        <p className="text text_type_digits-default">480</p>
                        <div className={mainStyles.priceIcon}>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
    <>
        <div className={mainStyles.mainDiv}>
            <h1 className={`${mainStyles.header} text text_type_main-large`}>Лента заказов</h1>
            <div className={`${mainStyles.scroll} custom-scroll`}>
                {data.messages[0]?.orders.map((_feed: any, index: number) =>(
                    showFeeds(_feed, index)
                ))}
            </div>
        </div>
        <div className={mainStyles.numbersDiv}>
            <div className={mainStyles.numbersTop}>
                <div className={mainStyles.leftNumbers}>
                    <p className="text text_type_main-medium pb-6">Готовы:</p>
                    <p className="text text_type_digits-default text_color_inactive pt-2">12345</p>
                    <p className="text text_type_digits-default text_color_inactive pt-2">12345</p>
                    <p className="text text_type_digits-default text_color_inactive pt-2">12345</p>
                    <p className="text text_type_digits-default text_color_inactive pt-2">12345</p>
                    <p className="text text_type_digits-default text_color_inactive pt-2">12345</p>
                </div>
                <div className={mainStyles.rightNumbers}>
                    <p className="text text_type_main-medium pb-6">В работе:</p>
                    <p className="text text_type_digits-default pt-2">12345</p>
                    <p className="text text_type_digits-default pt-2">12345</p>
                    <p className="text text_type_digits-default pt-2">12345</p>
                </div>
            </div>
            <div className={mainStyles.numbersMiddle}>
                <p className="text text_type_main-medium pt-15">Выполнено за всё время</p>
                <p className={`${mainStyles.textStyle} text text_type_digits-large`}>{data.messages[0]?.total}</p>
            </div>
            <div>
                <p className="text text_type_main-medium pt-15">Выполнено за сегодня</p>
                <p className={`${mainStyles.textStyle} text text_type_digits-large`}>{data.messages[0]?.totalToday}</p>
            </div>
        </div>
    </>
    )
}