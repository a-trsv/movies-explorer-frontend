import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthFooter.css';

function AuthFooter() {
    const { pathname } = useLocation();
    const phraseName = `${pathname === '/signup' ? 'Уже зарегистрированы?' : 'Еще не зарегистрированы?'}`
    const buttonName = `${pathname === '/signup' ? 'Войти' : 'Регистрация'}`
    const linkURL = `${pathname === '/signup' ? '/signin' : '/signup'}`
    return (
        <div className="auth-footer">
            <span className="auth-footer__span">
                {phraseName}
                <Link className="auth-footer__link" to={linkURL}>
                    {buttonName}
                </Link>
            </span>
        </div>
    )
}

export default AuthFooter;
