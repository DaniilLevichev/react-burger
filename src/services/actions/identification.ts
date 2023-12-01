import { ThunkDispatch } from 'redux-thunk';
import { AppDispatch, AppThunk, TApplicationActions, TUserData } from '../../types/redux-types';
import BASE_URL from '../../units/base-url';
import checkReponse from '../../units/check-response';
import deleteCookie from '../../units/delete-cookie';
import setCookie from '../../units/set-cookie';

export const CHECK_USER: 'CHECK_USER' = 'CHECK_USER';
export const REGISTRY_USER: 'REGISTRY_USER' = 'REGISTRY_USER';
export const LOGOUT_USER: 'LOGOUT_USER' = 'LOGOUT_USER';
export const LOGIN_USER: 'LOGIN_USER' = 'LOGIN_USER';
export const FIX_PASSWORD: 'FIX_PASSWORD' = 'FIX_PASSWORD';
export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD';
export const EDIT_USER: 'EDIT_USER' = 'EDIT_USER';

export const checkUser = (accessToken: string, refreshToken: string): AppThunk<Promise<unknown>> => {
    return (dispatch) => {
        return(
            fetch(BASE_URL+'/auth/user', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization' : accessToken
                }
            })
                .then(checkReponse)
                .then(data => {
                    if(data.success){
                        dispatch({type:CHECK_USER, data:data.user});
                    }
                })
                .catch(error => {
                    if (error.message === 'jwt expired'){
                        fetch(BASE_URL+'/auth/token', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({"token": refreshToken}),
                        })
                            .then(checkReponse)
                            .then(data => {
                                if (data.success){
                                    setCookie('accessToken', data.accessToken);
                                    setCookie('refreshToken', data.refreshToken);
                                }
                            })
                            .catch(error=> {
                                console.error(error);
                            })
                    } else console.error(error);
                })
        )
    }
};

export const editUser = (accessToken: string, userData: TUserData): AppThunk<Promise<unknown>> => {
    return (dispatch) => {
        return (
            fetch(BASE_URL+'/auth/user', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'authorization' : accessToken
            },
            body: JSON.stringify(userData)
        })
            .then(checkReponse)
            .then(data => {
                if(data.success){
                    dispatch({type:EDIT_USER, data:data.user});
                }
            })
            .catch(error => {
                console.error(error);
            })
        )
        
    }
};

export const createUser: AppThunk = (dataUser) => {
    return (dispatch: AppDispatch) => {
        fetch(BASE_URL+'/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUser),
        })
            .then(checkReponse)
            .then(data => {
                dispatch({type:REGISTRY_USER, data:data.user});
                setCookie('accessToken', data.accessToken);
                setCookie('refreshToken', data.refreshToken);
            })
            .catch(error => {
                console.error(error);
            });
    }
};

export const logoutUser: AppThunk = (accessToken, refreshToken) => {
    return(dispatch: AppDispatch) => {
        fetch(BASE_URL + '/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"token": refreshToken}),
        })
            .then(checkReponse)
            .then(data => {
                dispatch({type: LOGOUT_USER});
                deleteCookie('accessToken');
                deleteCookie('refreshToken');
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export const authorizationUser: AppThunk = (login, password) => {
    return(dispatch: AppDispatch) => {
        fetch(BASE_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": login,
                "password": password
            })
        })
            .then(checkReponse)
            .then(data => {
                dispatch({type:LOGIN_USER, data:data.user});
                setCookie('accessToken', data.accessToken);
                setCookie('refreshToken', data.refreshToken);
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export const fixPassword: AppThunk = (email) => {
    return(dispatch: AppDispatch) => {
        fetch(BASE_URL+'/password-reset', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email
            })
        })
            .then(checkReponse)
            .then(data => {
                if (data.success) {
                    dispatch({type:FIX_PASSWORD});
                } 
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export const resetPassword: AppThunk = (password, token) => {
    return(dispatch: AppDispatch) => {
        fetch(BASE_URL+'/password-reset', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": password,
                "token": token
            })
        })
            .then(checkReponse)
            .then(data => {
                if (data.success) {
                    dispatch({type: RESET_PASSWORD});
                } 
            })
            .catch(error => {
                console.error(error);
            });
    }
}