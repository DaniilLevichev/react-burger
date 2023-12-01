import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import mainStyles from './app.module.css';
import AppHeader from '../header/app-header';
import MainPage from '../../pages/main-page';
import { useDispatch } from 'react-redux';
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
import { OrderFeed } from '../order-feed/order-feed';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  useEffect(()=>{
    //@ts-ignore
    dispatch(getData());
    const accessToken: string | undefined = getCookie('accessToken');
    const refreshToken: string | undefined = getCookie('refreshToken');
    if (accessToken && refreshToken) {
        //@ts-ignore
        dispatch(checkUser(accessToken, refreshToken));
    }
  });

  const handleClose = () => {
    navigate(-1);
  }
  
  return (
    <div>
      <AppHeader/>
      <Routes location={background || location}>
        <Route path='/'                element={<MainPage/>}/>
        <Route path='/login'           element={<ProtectedRouteAuthorized element={<AutorizationPage/>}/>}/>
        <Route path='/register'        element={<ProtectedRouteAuthorized element={<RegisterPage/>}/>}/>
        <Route path='/forgot-password' element={<ProtectedRouteAuthorized element={<FixPasswordPage/>}/>}/>
        <Route path='/reset-password'  element={<ProtectedRouteAuthorized element={<ResetPasswordPage/>}/>}/>
        <Route path='/profile'         element={<ProtectedRouteUnAuthorized element={<ProfilePage/>}/>}/>
        <Route path='/ingredients/:id' element={<IngredientDetails/>}/>
        <Route path='/feed'            element={<OrderFeed/>}/>
      </Routes>
      {background && <Routes><Route path='/ingredients/:id' element={<Modal onClicked={handleClose} header='Детали ингридиента'><IngredientDetails/></Modal>}/></Routes>}
    </div>
  );
}

export default App;