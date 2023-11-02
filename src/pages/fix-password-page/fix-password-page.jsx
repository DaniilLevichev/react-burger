import React from 'react';
import { PasswordInput, EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './fix-password-page.module.css';
import BASE_URL from '../../units/base-url';
import checkReponse from '../../units/check-response';
import { useNavigate } from 'react-router';
import { fixPassword } from '../../services/actions/identification';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const FixPasswordPage = () => {

    const [email, setEmail]    = React.useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = (e) => {
        setEmail(e.target.value);
    }

    const buttonClick = () => {
        if(email) {
            dispatch(fixPassword(email));
            navigate('/reset-password');
        }
    }

    return (
        <div className={mainStyles.mainDiv}>
            <div className={mainStyles.header}>
                <p className='text text_type_main-medium'>Восстановление пароля</p>
            </div>
            <div className={mainStyles.input}>
                <EmailInput
                    name={'email'}
                    placeholder={'Укажите e-mail'}
                    isIcon={false}
                    onChange = {e => onChange(e)}
                />
            </div>
            <div className={mainStyles.button}>
                <Button htmlType="button" type="primary" size="medium" onClick={buttonClick}>Восстановить</Button> 
            </div>
            <div className={mainStyles.linkText}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <NavLink to='/login' className={mainStyles.link}>Войти</NavLink>
            </div>
        </div>
    )
}