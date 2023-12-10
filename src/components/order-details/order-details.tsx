import mainStyles from './order-details.module.css';
import CheckMark from '../../images/ChekMark.jpg';
import { TOrderDetail } from '../../types/types';

const OrderDetails = (props:TOrderDetail) => {
    return (
        <div className={mainStyles.detail}>
            <p className={`${mainStyles.zakazNumber} text text_type_digits-large`}>{props.orderNumber}</p>
            <p className={`${mainStyles.idOrder} text text_type_main-medium`}>идентификатор заказа</p>
            <img src={CheckMark} className={mainStyles.icon}/>
            <p className={`${mainStyles.startCook} text text_type_main-small`}>Ваш заказ начали готовить</p>
            <p className={`${mainStyles.waiting}text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитльной станции</p>
        </div>
    )
}

export default OrderDetails;