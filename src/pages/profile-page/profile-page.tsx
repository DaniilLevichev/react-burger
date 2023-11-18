import React from 'react';
import { PasswordInput, EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './profile-page.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import getCookie from '../../units/get-cookie';
import { logoutUser } from '../../services/actions/identification';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { editUser } from '../../services/actions/identification';

export const ProfilePage = () => {

    const userName  = useSelector((state: any) => state.user.userData.name);
    const userEmail = useSelector((state: any) => state.user.userData.email);
    const [name,        setName]        = useState(userName);
    const [login,       setLogin]       = useState(userEmail);
    const [password,    setPassword]    = useState('');
    const [isChanged,     setChanged]   = useState(false);
    const [nameIcon, setNameIcon]       = useState('EditIcon');
    const [loginIcon, setLoginIcon]     = useState('EditIcon');
    const dispatch  = useDispatch();
    const navigate  = useNavigate();

    const outUser = () => {
        const accessToken = getCookie('accessToken');
        const refreshToken  = getCookie('refreshToken');
        //@ts-ignore
        dispatch(logoutUser(accessToken, refreshToken));
        navigate('/login');
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email') {
            setLogin(e.target.value)
            setLoginIcon('CloseIcon')
        } else if(e.target.name === 'password') {
            setPassword(e.target.value)
        } else if(e.target.name === 'name') {
            setName(e.target.value)
            setNameIcon('CloseIcon')
        }
        setChanged(true);
    }

    const cancel = () => {
        setLogin(userEmail);
        setPassword('');
        setName(userName);
        setChanged(false);
        setLoginIcon('EditIcon');
        setNameIcon('EditIcon');
    }

    const confirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = {
            "name": name,
            "login": login,
            "password": password
        }
        const accessToken = getCookie('accessToken');
        //@ts-ignore
        dispatch(editUser(accessToken, userData));
    }

    return (
        userName ? 
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
            <form  onSubmit={confirm} className={mainStyles.rightDiv}>
                <div className={mainStyles.input}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        //@ts-ignore
                        icon={nameIcon}
                        value={name}
                        onChange = {e => onChange(e)}
                    />
                </div>
                <div className={mainStyles.input}>
                    <EmailInput
                        name={'email'}
                        placeholder={'Логин'}
                        //@ts-ignore
                        icon={loginIcon}
                        value={login}
                        onChange = {e => onChange(e)}
                    />
                </div>
                <div className={mainStyles.input}>
                    <PasswordInput
                        name={'password'}
                        placeholder={'Пароль'}
                        //@ts-ignore
                        icon="EditIcon"
                        value={password}
                        onChange = {e => onChange(e)}
                    />
                </div>
                {isChanged && <div className={mainStyles.buttons}>
                    <Button htmlType="button" type="secondary" size="medium" onClick={()=>{cancel()}}>Отменить</Button>
                    <Button htmlType="submit" type="primary" size="medium">Применить</Button>
                </div>}
            </form>
        </div> :
        null
    )
}