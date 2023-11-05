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
import { ProtectedRouteUnAuthorized, ProtectedRouteAuthorized } from '../protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import getCookie from '../../units/get-cookie';
import { checkUser } from '../../services/actions/identification';
import Modal from '../modal/modal';
import { useLocation } from 'react-router-dom';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getData());
    const accessToken = getCookie('accessToken');
    const refreshToken  = getCookie('refreshToken');
    if (accessToken && refreshToken) {
        dispatch(checkUser(accessToken, refreshToken));
    }
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
          }>
        </Route>        
        <Route path='/login'           element={<ProtectedRouteAuthorized element={<AutorizationPage/>}/>}/>
        <Route path='/register'        element={<ProtectedRouteAuthorized element={<RegisterPage/>}/>}/>
        <Route path='/forgot-password' element={<ProtectedRouteAuthorized element={<FixPasswordPage/>}/>}/>
        <Route path='/reset-password'  element={<ProtectedRouteAuthorized element={<ResetPasswordPage/>}/>}/>
        <Route path='/profile'         element={<ProtectedRouteUnAuthorized element={<ProfilePage/>}/>}/>
      </Routes>
      <ModalRoute/>
    </Router>
    </div>
  );
}

function ModalRoute() {
  const state = useLocation();
  return(
    <div>
      <Routes>
        {state.state ? <Route path='/ingredients/:id' element={
          <div className={mainStyles.app}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConctructor/>
            </DndProvider>
            <Modal header='Детали ингридиента'><IngredientDetails/></Modal>
          </div>}/> :
          <Route path='/ingredients/:id' element={<IngredientDetails/>}/>}
      </Routes>
    </div>
  )
}

export default App;