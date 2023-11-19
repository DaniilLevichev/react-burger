import mainStyles from './modal-overlay.module.css';
import { TModalOverlay } from '../../types/types';

 const ModalOverlay = (props: TModalOverlay) => {
  return(
    <div className={mainStyles.portalContainer} onClick={props.onClick}>
    </div>
  );
};

export default ModalOverlay;