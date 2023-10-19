import PropTypes from 'prop-types';
import { IngredientType } from './ingredient-types';

export const BurgerPropTypes = {
    components: PropTypes.arrayOf(PropTypes.shape(IngredientType))
}