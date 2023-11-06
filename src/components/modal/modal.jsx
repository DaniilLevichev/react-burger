import React from 'react';
import ReactDOM from 'react-dom';
import mainStyles from './modal.module.css';
import {CloseIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

const Modal = (props) => {
  const modalRoot = document.getElementById('portal-root');
  const navigate = useNavigate();
  React.useEffect(() => {
    const clickEsc = (event) => {
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
            <CloseIcon onClick={()=>{props.onClicked()}}/>
          </div>
          {props.children}
        </div>
      </>,
      modalRoot
    );
  
};

Modal.propTypes = {
  header: PropTypes.string,
  onClicked: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Modal