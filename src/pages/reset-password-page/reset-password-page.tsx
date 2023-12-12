import React from 'react';
import { PasswordInput, EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './reset-password-page.module.css';
import BASE_URL from '../../units/base-url';
import checkReponse from '../../units/check-response';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector} from '../../types/redux-types';
import { resetPassword } from '../../services/actions/identification';

export const ResetPasswordPage = () => {

    const dataUser = useSelector( state => state.user.isForgotPassword);
    const dispatch = useDispatch();

    const [password, setPassword] = React.useState('');
    const [token,    setToken]    = React.useState('');

    const navigate = useNavigate();

    React.useEffect(() => {
        !dataUser && navigate('/');
    }, [])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'password'){
            setPassword(e.target.value);
        } else {
            setToken(e.target.value);
        }
    }

    const confirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password && token ) {
            dispatch(resetPassword(password, token));
            navigate('/login');
        }
    }

    return (
        <div className={mainStyles.mainDiv}>
            <div className={mainStyles.header}>
                <p className='text text_type_main-medium'>Восстановление пароля</p>
            </div>
            <form onSubmit={confirm}>
                <div className={mainStyles.input}>
                    <PasswordInput
                        name={'password'}
                        placeholder={'Введите новый пароль'}
                        extraClass="mb-2"
                        onChange = {e => onChange(e)}
                        value={password}
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
                        value={token}
                    />
                </div>
                <div className={mainStyles.button}>
                    <Button htmlType="submit" type="primary" size="medium">Восстановить</Button> 
                </div>
            </form>
            <div className={mainStyles.linkText}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <a href='login' className={mainStyles.link}>Войти</a>
            </div>
        </div>
    )
}