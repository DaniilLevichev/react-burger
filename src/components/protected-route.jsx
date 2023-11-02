import { Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const ProtectedRouteUnAuthorized = ({ element }) => {
    
    const dataUser = useSelector(state => state.user.userData.name);

    
    return dataUser ? element : <Navigate to="/login" replace/>;
    
} 

export const ProtectedRouteAuthorized = ({ element }) => {
    
    const dataUser = useSelector(state => state.user.userData.name);

    
    return !dataUser ? element : <Navigate to="/" replace/>;
    
} 