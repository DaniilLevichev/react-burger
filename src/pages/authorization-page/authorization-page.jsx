
import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './authorization-page.module.css';

export const AutorizationPage = () => {
    return (
        <div className={mainStyles.mainDiv}>
            <div className={mainStyles.header}>
                <p className='text text_type_main-medium'>Вход</p>
            </div>
            <div className={mainStyles.input}>
                <EmailInput
                    name={'email'}
                    isIcon={false}
                />
            </div>
            <div className={mainStyles.input}>
                <PasswordInput
                    name={'password'}
                    extraClass="mb-2"
                />
            </div>
            <div className={mainStyles.button}>
                <Button htmlType="button" type="primary" size="medium">Войти</Button> 
            </div>
            <div className={mainStyles.linkText}>
                <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь?</p>
                <a href='register' className={mainStyles.link}>Зарегестрироваться</a>
            </div>
            <div className={mainStyles.linkText}>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                <a href='forgot-password' className={mainStyles.link}>Восстановить пароль</a>
            </div>
        </div>
    )
}