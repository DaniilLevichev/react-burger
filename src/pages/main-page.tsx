import BurgerConctructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import mainStyles from '../../src/components/app/app.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { OrderFeed } from '../components/order-feed/order-feed';

export default function MainPage() {
    return(
        <div className={mainStyles.app}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConctructor/>
            </DndProvider>
        </div>
    )
}