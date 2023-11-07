import { Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const ProtectedRouteUnAuthorized = ({ element }) => {
    
    const location = useLocation();
    const dataUser = useSelector(state => state.user.userData.name);

    return dataUser ? element : <Navigate to="/login"  state={{ from: location}}/>;
    
} 

export const ProtectedRouteAuthorized = ({ element }) => {
    const location = useLocation();
    const from = location.state?.from || '/';
    
    const dataUser = useSelector(state => state.user.userData.name);
    
    return !dataUser ? element : <Navigate to={from} replace/>;
    
} 