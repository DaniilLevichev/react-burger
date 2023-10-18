import mainStyles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { BurgerPropTypes } from '../../prop-types/prop-types';

const IngredientDetails = (props) => {
    return (
        <div className={mainStyles.detail}>
            <img src={props.ingredient.image_large} alt={props.ingredient.name}/>
            <p className={`${mainStyles.detailIngredientName} text text_type_main-medium`}>{props.ingredient.name}</p>
            <div className={mainStyles.section}>
                <div className={mainStyles.sectionCell}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{props.ingredient.calories}</p>
                </div>
                <div className={mainStyles.sectionCell}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{props.ingredient.proteins}</p>
                </div>
                <div className={mainStyles.sectionCell}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{props.ingredient.fat}</p>
                </div>
                <div className={mainStyles.sectionCell}>
                    <p className="text text_type_main-default text_color_inactive">Улеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{props.ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = BurgerPropTypes;

export default IngredientDetails;