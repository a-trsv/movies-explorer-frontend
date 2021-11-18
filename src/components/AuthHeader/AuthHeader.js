import React from 'react';
import './AuthHeader.css';
import headerLogo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function AuthHeader() {
    const { pathname } = useLocation();
    const greetingsMessage = `${pathname === '/signup' ? 'Добро пожаловать!' : 'Рады видеть!'}`
    return (
        <header className="auth__header">
            <div className="header__flex">
                <Link className="auth__header-link" to='/'><img className="auth__header-logo" src={headerLogo} alt="Логотип проекта Movies" /></Link>
                <h1 className="auth__header-greetings">
                    {greetingsMessage}
                </h1>
            </div>
        </header>
    )
}

export default AuthHeader;