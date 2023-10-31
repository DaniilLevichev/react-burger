import React from 'react';
import { PasswordInput, EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './reset-password-page.module.css';
import BASE_URL from '../../units/base-url';
import checkReponse from '../../units/check-response';
import { useNavigate } from 'react-router';

export const ResetPasswordPage = () => {

    const [password, setPassword] = React.useState();
    const [token,    setToken]    = React.useState();

    const navigate = useNavigate();

    const onChange = (e) => {
        if (e.target.name === 'password'){
            setPassword(e.target.value);
        } else {
            setToken(e.target.value);
        }
    }

    const buttonClick = () => {
        if(password && token ) {
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
                        console.log(data);
                        navigate('/login');
                    } 
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    return (
        <div className={mainStyles.mainDiv}>
            <div className={mainStyles.header}>
                <p className='text text_type_main-medium'>Восстановление пароля</p>
            </div>
            <div className={mainStyles.input}>
                <PasswordInput
                    name={'password'}
                    placeholder={'Введите новый пароль'}
                    extraClass="mb-2"
                    onChange = {e => onChange(e)}
                />
            </div>
            <div className={mainStyles.input}>
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    onChange = {e => onChange(e)}
                />
            </div>
            <div className={mainStyles.button}>
                <Button htmlType="button" type="primary" size="medium" onClick={buttonClick}>Восстановить</Button> 
            </div>
            <div className={mainStyles.linkText}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <a href='login' className={mainStyles.link}>Войти</a>
            </div>
        </div>
    )
}