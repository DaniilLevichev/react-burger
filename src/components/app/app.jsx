import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import mainStyles from './app.module.css';
import AppHeader from '../header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConctructor from '../burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getData } from '../../services/actions/index';
import { AutorizationPage } from '../../pages/authorization-page/authorization-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { FixPasswordPage } from '../../pages/fix-password-page/fix-password-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';


function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getData());
  });

  return (
    <div>
    <Router>
    <AppHeader className={mainStyles.appHeader}/>
      <Routes>
        <Route path='/' element={
          <div className={mainStyles.app}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConctructor/>
            </DndProvider>
          </div>
        }/>
        <Route path='/login' element={<AutorizationPage/> }/>
        <Route path='/register' element={<RegisterPage/> }/>
        <Route path='/forgot-password' element={<FixPasswordPage/> }/>
        <Route path='/reset-password' element={<ResetPasswordPage/> }/>
        <Route path='/profile' element={<ProfilePage/> }/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
