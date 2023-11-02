import React from 'react';
import { PasswordInput, EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './profile-page.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import getCookie from '../../units/get-cookie';
import { logoutUser } from '../../services/actions/identification';
import { useDispatch } from 'react-redux';

export const ProfilePage = () => {
    const dataUser = useSelector(state => state.user.userData.name);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const outUser = () => {
        const accessToken = getCookie('accessToken');
        const refreshToken  = getCookie('refreshToken');
        dispatch(logoutUser(accessToken, refreshToken));
        navigate('/');
    }

    return (
        <div className={mainStyles.mainDiv}>
            <div className={mainStyles.leftDiv}>
                <div className={mainStyles.navPanel}>
                    <a className="text text_type_main-large">Профиль</a>
                </div>
                <div className={mainStyles.navPanel}>
                    <a className="text text_type_main-large text_color_inactive">История заказов</a>
                </div>
                <div className={mainStyles.navPanel}>
                    <a onClick={()=>{outUser()}}className="text text_type_main-large text_color_inactive">Выход</a>
                </div>
            </div>
            <div className={mainStyles.rightDiv}>
                <div className={mainStyles.input}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        icon={'EditIcon'}
                    />
                </div>
                <div className={mainStyles.input}>
                    <EmailInput
                        name={'email'}
                        placeholder={'Логин'}
                        isIcon={true}
                    />
                </div>
                <div className={mainStyles.input}>
                    <PasswordInput
                        name={'password'}
                        placeholder={'Пароль'}
                        icon="EditIcon"
                    />
                </div>
            </div>
        </div>
    )
}