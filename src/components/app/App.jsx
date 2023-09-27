import React from 'react';
import './App.css';
import AppHeader from '../header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConctructor from '../burger-constructor/burger-constructor';
import data from '../units/data'

function App() {
  return (
    <div className="App">
        <AppHeader className='App-header'/>
        <BurgerIngredients ingredients={data}/>
        <BurgerConctructor components={data}/>
    </div>
  );
}

export default App;
