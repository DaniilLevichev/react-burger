import React from 'react';
import ReactDOM from 'react-dom';
import mainStyles from './modal.module.css';
import {CloseIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { TModalType } from '../../types/types';

const Modal = (props: TModalType) => {
  const modalRoot = document.getElementById('portal-root') as HTMLElement;
  React.useEffect(() => {
    const clickEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        props.onClicked()
      }
    };

    document.addEventListener('keydown', clickEsc);

    return () => {
      document.removeEventListener('keydown', clickEsc);
    };
  }, [props.onClicked]);

    return ReactDOM.createPortal(
      <>
        <ModalOverlay onClick={()=>{props.onClicked()}}/>
        <div className={mainStyles.square}>
          <div className={mainStyles.header} >
            <h1>{props.header}</h1>
            <div data-testid='close-modal' >
              <CloseIcon 
                type='primary' 
                onClick={()=>{props.onClicked()}}
              />
            </div>
          </div>
          {props.children}
        </div>
      </>,
      modalRoot
    );
  
};

export default Modal