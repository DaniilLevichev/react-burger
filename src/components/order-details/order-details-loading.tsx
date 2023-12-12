import mainStyles from './order-details.module.css';
import CheckMark from '../../images/ChekMark.jpg';
import { TOrderDetail } from '../../types/types';

const OrderDetailsLoading = () => {
    return (
        <div className={mainStyles.detail}>
            <p className={`${mainStyles.idOrder} text text_type_main-large`}>Обрабатываем заказ</p>
        </div>
    )
}

export default OrderDetailsLoading;