import {ConstructorElement, DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './burger-constructor.module.css'
import { useDispatch } from 'react-redux';
import { DELETE_INGREDIENT } from '../../services/actions/constructor';   

export const PlaceComponent = (props) => {

    const dispatch = useDispatch();

    if (props.component.type === 'main' || props.component.type === 'sauce') {
        return(
            <div className={mainStyles.compMainDiv}>
                <div className={mainStyles.compIcon}>
                    <DragIcon/> 
                </div>
                <div className={mainStyles.compElement}>
                    <ConstructorElement key={props.component._id}
                    text={props.component.name}
                    price={props.component.price}
                    thumbnail={props.component.image_mobile}
                    handleClose={()=>{dispatch({type: DELETE_INGREDIENT, data: props.component})}}
                    />
                </div>
            </div>
        )
    }
}