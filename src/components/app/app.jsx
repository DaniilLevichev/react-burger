import React, {useEffect} from 'react';
import mainStyles from './app.module.css';
import AppHeader from '../header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConctructor from '../burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getData } from '../../services/actions/index'

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getData());
  });

  return (
    <div className={mainStyles.app}>
        <AppHeader className={mainStyles.appHeader}/>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConctructor/>
        </DndProvider>
    </div>
  );
}

export default App;
