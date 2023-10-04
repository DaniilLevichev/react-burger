import React from 'react';
import ReactDOM from 'react-dom';
import mainStyles from './modal.module.css';
import {CloseIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = (props) => {
  const modalRoot = document.getElementById('portal-root');

  React.useEffect(() => {
    const clickEsc = (event) => {
      if (event.key === 'Escape') {
        props.onClick();
      }
    };

    document.addEventListener('keydown', clickEsc);

    return () => {
      document.removeEventListener('keydown', clickEsc);
    };
  }, [props.onClick]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={props.onClick}/>
      <div className={mainStyles.square}>
        <div className={mainStyles.header} >
          <h1>{props.header}</h1>
          <CloseIcon onClick={props.onClick}/>
        </div>
        {props.children}
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  header: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal