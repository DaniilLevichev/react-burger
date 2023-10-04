import React from 'react';
import ReactDOM from 'react-dom';
import mainStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

 const ModalOverlay = (props) => {
  return(
    <div className={mainStyles.portalContainer} onClick={props.onClick}>
    </div>
  );
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default ModalOverlay;