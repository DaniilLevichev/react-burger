import { Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { TProtectedRoute } from '../types/types';

export const ProtectedRouteUnAuthorized = ({ element }: TProtectedRoute) => {
    
    const location = useLocation();
    const dataUser = useSelector((state: any) => state.user.userData.name);

    return dataUser ? <>{element}</> : <Navigate to="/login"  state={{ from: location}}/>;
    
} 

export const ProtectedRouteAuthorized = ({ element }: TProtectedRoute) => {
    const location = useLocation();
    const from = location.state?.from || '/';
    
    const dataUser = useSelector((state: any) => state.user.userData.name);
    
    return !dataUser ? <>{element}</> : <Navigate to={from} replace/>;
    
} 