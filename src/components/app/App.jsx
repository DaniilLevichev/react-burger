import React, {useState, useEffect} from 'react';
import './App.css';
import AppHeader from '../header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConctructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal-overlay/modal-overlay';
//import data from '../units/data'

function App() {

  const [data, setData] = useState(null);

  const url = "https://norma.nomoreparties.space/api/ingredients";

  const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

  useEffect(()=>{
    fetch(url)
    .then(checkReponse)
    .then(data => setData(data.data))
    .catch(error => console.log(error));
  }, []);


  return (
    <div className="App">
        <AppHeader className='App-header'/>
        {data !== null && (
          <>
            <BurgerIngredients ingredients={data}/>
            <BurgerConctructor components={data}/>
          </>
        )}
    </div>
  );
}

export default App;
