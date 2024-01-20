import { Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector} from '../types/redux-types';
import { TProtectedRoute } from '../types/types';

export const ProtectedRouteUnAuthorized = ({ element }: TProtectedRoute) => {
    
    const location = useLocation();
    console.log(location);
    const dataUser = useSelector( state => state.user.userData?.name);

    return dataUser ? <>{element}</> : <Navigate to="/login"  state={{ from: location}}/>;
    
} 

export const ProtectedRouteAuthorized = ({ element }: TProtectedRoute) => {
    const location = useLocation();
    const from = location.state?.from || '/';
    
    const dataUser = useSelector( state => state.user.userData?.name);
    
    return !dataUser ? <>{element}</> : <Navigate to={from} replace/>;
    
} 