import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import mainStyles from './app-header.module.css'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AppHeader () {
    const dataUser = useSelector((state: any) => state.user.userData.name);
    return (
        <header>
            <nav className={mainStyles.background}>
                <section className={mainStyles.section}>
                    <div className={mainStyles.extremeDiv} >
                        <NavLink to='/' className={mainStyles.links}>
                            <BurgerIcon type='primary'/>
                            <p className={`${mainStyles.text} text text_type_main-default`}>Конструктор</p>
                        </NavLink>
                        <NavLink to='/' className={mainStyles.links}>
                            <ListIcon type='primary'/>
                            <p className={`${mainStyles.text} text text_type_main-default`}>Лента заказов</p>
                        </NavLink>
                    </div>
                    <div className={mainStyles.logo}>
                        <Logo/>
                    </div>
                    <div className={mainStyles.extremeDiv}>
                        <NavLink to='/profile' className={mainStyles.account}>
                            <ProfileIcon type='primary'/>
                            <p className={`${mainStyles.text} text text_type_main-default`}>{dataUser ? dataUser : 'Личный кабинет'}</p>
                        </NavLink>
                    </div>
                </section>
            </nav>
        </header>
    );
};