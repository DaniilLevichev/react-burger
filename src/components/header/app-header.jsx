import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';

import mainStyles from './app-header.module.css'


export default function AppHeader () {
    return (
        <header>
            <nav className={mainStyles.background}>
                <section className={mainStyles.section}>
                    <div className={mainStyles.extremeDiv} >
                        <a className={mainStyles.links}>
                            <BurgerIcon type='primary'/>
                            <p className={`${mainStyles.text} text text_type_main-default`}>Конструктор</p>
                        </a>
                        <a className={mainStyles.links}>
                            <ListIcon type='primary'/>
                            <p className={`${mainStyles.text} text text_type_main-default`}>Лента заказов</p>
                        </a>
                    </div>
                    <div className={mainStyles.logo}>
                        <Logo/>
                    </div>
                    <div className={mainStyles.extremeDiv}>
                        <a className={mainStyles.account}>
                            <ProfileIcon type='primary'/>
                            <p className={`${mainStyles.text} text text_type_main-default`}>Личный кабинет</p>
                        </a>
                    </div>
                </section>
            </nav>
        </header>
    );
};