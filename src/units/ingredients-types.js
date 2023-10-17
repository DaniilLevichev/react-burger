import PropTypes from 'prop-types';
import ingredientType from './ingredient-types';

export const BurgerPropTypes = {
    components: PropTypes.arrayOf(PropTypes.shape(ingredientType))
}