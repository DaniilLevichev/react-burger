import {ConstructorElement, DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './burger-constructor.module.css'
import { useDispatch } from 'react-redux';
import { DELETE_INGREDIENT } from '../../services/actions/constructor';
import { useDrag, useDrop } from 'react-dnd';
import React from 'react';
import { TPlaceComponent } from '../../types/types';

export const PlaceComponent = (props: TPlaceComponent) => {
    const ref = React.useRef<HTMLInputElement>(null);
    const [, dropRef] = useDrop ({
        accept: 'component',
        hover: (item: any, monitor: any) => {
            if (!ref.current) {
              return
            }
            {if (item.returnIndex === props.index){
                return;
            }}
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (item.returnIndex < props.index && hoverClientY < hoverMiddleY) {
                return;
            };
            if (item.returnIndex > props.index && hoverClientY > hoverMiddleY) {
                return;
            };
            props.moveComponent(item.returnIndex, props.index);
            item.returnIndex = props.index;
        }
    })
    const [ { isDragging }, dragRef] = useDrag({
        type: 'component',
        item: () => {
            const returnId = props.id;
            const returnIndex = props.index
            return {returnId, returnIndex}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    const opacity: number = isDragging ? 0 : 1;
    const dispatch = useDispatch();
    dragRef(dropRef(ref))
    if (props.component.type === 'main' || props.component.type === 'sauce') {
        return(
            <div ref={ref} className={mainStyles.compMainDiv} style={{opacity}}>
                <div className={mainStyles.compIcon}>
                    <DragIcon type='primary'/>
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
    } else return null;
}