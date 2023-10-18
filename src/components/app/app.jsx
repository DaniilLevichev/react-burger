import React, {useEffect} from 'react';
import mainStyles from './app.module.css';
import AppHeader from '../header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConctructor from '../burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { GET_INGREDIENTS_SUCCESS } from '../../services/actions/ingredients';   
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BASE_URL from '../../units/base-url';

function App() {

  const dispatch = useDispatch();

  const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

  useEffect(()=>{
    fetch(BASE_URL+'/ingredients')
    .then(checkReponse)
    .then(data => dispatch({type: GET_INGREDIENTS_SUCCESS, data: data.data}))
    .catch(console.error);
  }, [dispatch]);
  return (
    <div className={mainStyles.app}>
        <AppHeader className={mainStyles.appHeader}/>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConctructor/>
        </DndProvider>
        {/*{data !== null && (
          <>
            <BurgerIngredients/>
            <BurgerConctructor/>
          </>
        })}*/}
    </div>
  );
}

export default App;
