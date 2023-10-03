import React from 'react';
import ReactDOM from 'react-dom';
import mainStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

 const ModalOverlay = (props) => {
  const modalRoot = document.getElementById('portal-root');

  return ReactDOM.createPortal(
    <div className={mainStyles.portalContainer} onClick={props.onClick}>
    </div>,
    modalRoot
  );
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default ModalOverlay;