import React from 'react';
import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './authorization-page.module.css';
import { authorizationUser } from '../../services/actions/identification';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

export const AutorizationPage = () => {

    const dispatch       = useDispatch();
    const navigate       = useNavigate();

    const [login,       setLogin]       = React.useState();
    const [password,    setPassword]    = React.useState();

    const onChange = (e) => {
        if (e.target.name === 'email') {
            setLogin(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }
    return (
        <div className={mainStyles.mainDiv}>
            <div className={mainStyles.header}>
                <p className='text text_type_main-medium'>Вход</p>
            </div>
            <div className={mainStyles.input}>
                <EmailInput
                    name={'email'}
                    isIcon={false}
                    onChange = {e => onChange(e)}
                />
            </div>
            <div className={mainStyles.input}>
                <PasswordInput
                    name={'password'}
                    extraClass="mb-2"
                    onChange = {e => onChange(e)}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                />
            </div>
            <div className={mainStyles.button}>
                <Button htmlType="button" type="primary" size="medium" onClick={()=>{dispatch(authorizationUser(login, password)); navigate('/');}}>Войти</Button>
            </div>
            <div className={mainStyles.linkText}>
                <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь?</p>
                <NavLink to='/register' className={mainStyles.link}>Зарегестрироваться</NavLink>
            </div>
            <div className={mainStyles.linkText}>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                <NavLink to='/forgot-password' className={mainStyles.link}>Восстановить пароль</NavLink>
            </div>
        </div>
    )
}