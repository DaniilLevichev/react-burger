import React from 'react';
import { PasswordInput, EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './register-page.module.css';
import BASE_URL from '../../units/base-url';
import checkReponse from '../../units/check-response';
import { useNavigate } from 'react-router';
import { createUser } from '../../services/actions/registry';
import { useDispatch, useSelector } from 'react-redux';



export const RegisterPage = () => {

    const [name,        setName]        = React.useState();
    const [login,       setLogin]       = React.useState();
    const [password,    setPassword]    = React.useState();
    const dispatch       = useDispatch();

    const navigate = useNavigate();

    const onChange = (e) => {
        if (e.target.name === 'name' ){
            setName(e.target.value)
        } else if (e.target.name === 'email') {
            setLogin(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }
/*
    const buttonClick = (email, password, name) => {
        fetch(BASE_URL+'/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name}),
        })
            .then(checkReponse)
            .then(data => {
                if (data.success) {
                    navigate('/login');
                } 
            })
            .catch(error => {
                console.error(error);
            });
    }*/

    const buttonClick = ( email, password, name) => {
        const data = {
            "email": email,
            "password": password,
            "name": name
        };
        dispatch(createUser(data));
        navigate('/');
        
    }

    return (
        <div className={mainStyles.mainDiv}>
            <div className={mainStyles.header}>
                <p className='text text_type_main-medium'>Регистрация</p>
            </div>
            <div className={mainStyles.input}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    onChange = {e => onChange(e)}
                    
                />
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
                <Button htmlType="button" type="primary" size="medium" onClick={() => buttonClick(login, password, name)}>Зарегестрироваться</Button> 
            </div>
            <div className={mainStyles.linkText}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                <a href='login' className={mainStyles.link}>Войти</a>
            </div>
        </div>
    )
}