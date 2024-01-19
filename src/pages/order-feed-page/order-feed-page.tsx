import React from 'react';
import mainStyles from './order-feed-page.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../types/redux-types';
import { FEED_CONNECTION_CLOSE, FEED_CONNECTION_CLOSED, FEED_CONNECTION_START } from '../../services/actions/feed-web-socket';
import { useLocation, useNavigate } from 'react-router';
import { TIngredientType, TWSResponseOrder } from '../../types/types'

export const OrderFeed = () => {

    const navigate = useNavigate();
    const location = useLocation();
    
    const dispatch = useDispatch();

    const data = useSelector( state => state.ws );

    React.useEffect(()=> {
                
        dispatch({type: FEED_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all'});
        
        return () => {
            dispatch({type: FEED_CONNECTION_CLOSE});
        }
    }, [])

    const ingredients = useSelector( state => state.ingredients);

    const openModal = (numberFeed: number) => {
        navigate(`/feed/${numberFeed}`, {state: { background: location }})
    }

    let doneArray: Array<number> = [];
    let notDoneArray: Array<number> = [];

    data.messages?.orders.map((_feed) =>{
        _feed.status === 'done' ? 
        doneArray.push(_feed.number) :
        notDoneArray.push(_feed.number)
    })

    const showFeeds = (feed: TWSResponseOrder, index: number) => {

        let array: Array<string> = [];
        let arrayPrice: Array<number> = [];

        feed.ingredients.map((id) => {
            ingredients.ingredients.map((ingredient) => {
                if(id === ingredient._id) {
                    array.push(ingredient.image_mobile);
                    arrayPrice.push(ingredient.price);
                }
            })
        })

        const sum = arrayPrice.reduce((total, num) => total + num, 0);

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
                        <p className="text text_type_digits-default">{sum}</p>
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
                {data.messages?.orders.map((_feed, index) =>(
                    showFeeds(_feed, index)
                ))}
            </div>
        </div>
        <div className={mainStyles.numbersDiv}>
            <div className={mainStyles.numbersTop}>
                <div className={mainStyles.leftNumbers}>
                    <p className="text text_type_main-medium pb-6">Готовы:</p>
                    <div className={mainStyles.orders}>
                        <div>
                            {doneArray.splice(0, 5).map((num, index) => (
                                <p className="text text_type_digits-default pt-2" key={index}>{num}</p>
                            ))}
                        </div>
                        <div className='pl-10'>
                            {doneArray.splice(0, 5).map((num, index) => (
                                <p className="text text_type_digits-default pt-2" key={index}>{num}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={mainStyles.rightNumbers}>
                    <p className="text text_type_main-medium pb-6">В работе:</p>
                    <div className={mainStyles.orders}>
                        <div>
                            {notDoneArray.splice(0, 5).map((num) => (
                                <p className="text text_type_digits-default pt-2">{num}</p>
                            ))}
                        </div>
                        <div className='pl-10'>
                            {notDoneArray.splice(0, 5).map((num) => (
                                <p className="text text_type_digits-default pt-2">{num}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={mainStyles.numbersMiddle}>
                <p className="text text_type_main-medium pt-15">Выполнено за всё время</p>
                <p className={`${mainStyles.textStyle} text text_type_digits-large`}>{data.messages?.total}</p>
            </div>
            <div>
                <p className="text text_type_main-medium pt-15">Выполнено за сегодня</p>
                <p className={`${mainStyles.textStyle} text text_type_digits-large`}>{data.messages?.totalToday}</p>
            </div>
        </div>
    </>
    )
}