import React from 'react';
import { PasswordInput, EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './register-page.module.css';
import { useNavigate } from 'react-router';
import { createUser } from '../../services/actions/identification';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';



export const RegisterPage = () => {

    const [name,        setName]        = React.useState('');
    const [login,       setLogin]       = React.useState('');
    const [password,    setPassword]    = React.useState('');
    const dispatch       = useDispatch();

    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'name' ){
            setName(e.target.value)
        } else if (e.target.name === 'email') {
            setLogin(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const confirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            "email": login,
            "password": password,
            "name": name
        };
        //@ts-ignore
        dispatch(createUser(data));
        navigate('/');
        
    }

    return (
        <div className={mainStyles.mainDiv}>
            <div className={mainStyles.header}>
                <p className='text text_type_main-medium'>Регистрация</p>
            </div>
            <form onSubmit={confirm} className={mainStyles.rightDiv}>
                <div className={mainStyles.input}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        onChange = {e => onChange(e)}
                        value={name}
                        
                    />
                </div>
                <div className={mainStyles.input}>
                    <EmailInput
                        name={'email'}
                        isIcon={false}
                        onChange = {e => onChange(e)}
                        value={login}
                    />
                </div>
                <div className={mainStyles.input}>
                    <PasswordInput
                        name={'password'}
                        extraClass="mb-2"
                        onChange = {e => onChange(e)}
                        value={password}
                    />
                </div>
                <div className={mainStyles.button}>
                    <Button htmlType="submit" type="primary" size="medium">Зарегестрироваться</Button> 
                </div>
            </form>
            <div className={mainStyles.linkText}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                <NavLink to='/login' className={mainStyles.link}>Войти</NavLink>
            </div>
        </div>
    )
}