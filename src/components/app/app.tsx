import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import mainStyles from './app.module.css';
import AppHeader from '../header/app-header';
import MainPage from '../../pages/main-page';
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
import { OrderFeed } from '../../pages/order-feed-page/order-feed-page';
import { OrderNumber } from '../../pages/order-detail-page/order-detail-page';
import { OrdersHistoryPage } from '../../pages/orders-history-page/orders-history-page';
import { useDispatch } from '../../types/redux-types';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getData());
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    if (accessToken && refreshToken) {
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
        <Route path='/profile/orders'  element={<ProtectedRouteUnAuthorized element={<OrdersHistoryPage/>}/>}/>
        <Route path='/profile/orders/:number'  element={<ProtectedRouteUnAuthorized element={<OrderNumber/>}/>}/>
        <Route path='/ingredients/:id' element={<IngredientDetails/>}/>
        <Route path='/feed/:number'    element={<OrderNumber/>}/>
        <Route path='/feed'            element={<OrderFeed/>}/>
      </Routes>
      {background && 
      <Routes>
        <Route path='/ingredients/:id' element={<Modal onClicked={handleClose} header='Детали ингридиента'><IngredientDetails/></Modal>}/>
        <Route path='/feed/:number' element={<Modal onClicked={handleClose} header=''><OrderNumber/></Modal>}/>
        <Route path='/profile/orders/:number' element={<Modal onClicked={handleClose} header=''><OrderNumber/></Modal>}/>
      </Routes>}
    </div>
  );
}

export default App;