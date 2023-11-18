import React from 'react';
import ReactDOM from 'react-dom';
import mainStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

type TModalOverlay = {
  onClick: () => void;
}

 const ModalOverlay = (props: TModalOverlay) => {
  return(
    <div className={mainStyles.portalContainer} onClick={props.onClick}>
    </div>
  );
};

export default ModalOverlay;