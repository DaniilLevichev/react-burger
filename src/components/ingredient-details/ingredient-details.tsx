import mainStyles from './ingredient-details.module.css';
import { useParams } from 'react-router';
import { useDispatch, useSelector} from '../../types/redux-types';
import { TIngredientType } from '../../types/types';

const IngredientDetails = () => {
    
    const params = useParams();
    const ingredients = useSelector( state => state.ingredients.ingredients);
    const ingredient = ingredients.find((ingredient: TIngredientType) => ingredient._id === params.id);
    
    return (
        ingredient ?
        <div className={mainStyles.detail}>
            <img src={ingredient.image_large} alt={ingredient.name}/>
            <p className={`${mainStyles.detailIngredientName} text text_type_main-medium`}>{ingredient.name}</p>
            <div className={mainStyles.section}>
                <div className={mainStyles.sectionCell}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{ingredient.calories}</p>
                </div>
                <div className={mainStyles.sectionCell}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{ingredient.proteins}</p>
                </div>
                <div className={mainStyles.sectionCell}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{ingredient.fat}</p>
                </div>
                <div className={mainStyles.sectionCell}>
                    <p className="text text_type_main-default text_color_inactive">Улеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{ingredient.carbohydrates}</p> 
                </div>
            </div>
        </div> : null
    )
}

export default IngredientDetails;