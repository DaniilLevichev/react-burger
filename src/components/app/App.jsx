import React, {useEffect} from 'react';
import './App.css';
import AppHeader from '../header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConctructor from '../burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { GET_INGREDIENTS_SUCCESS } from '../../services/actions/ingredients';   
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

  const dispatch = useDispatch();

  const url = "https://norma.nomoreparties.space/api/ingredients";

  const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

  useEffect(()=>{
    fetch(url)
    .then(checkReponse)
    .then(data => dispatch({type: GET_INGREDIENTS_SUCCESS, data: data.data}))
    .catch(error => console.log(error));
  }, [dispatch]);
  return (
    <div className="App">
        <AppHeader className='App-header'/>
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
