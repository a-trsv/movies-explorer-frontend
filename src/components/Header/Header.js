import './Header.css'
import headerLogo from '../../images/logo.svg';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import {hamburgerMenuItems} from '../../utils/constants'

function Header() {

    const { pathname } = useLocation();
    const linkName = `${pathname === '/' ? 'Регистрация' : 'Аккаунт'}`
    const linkUrl = `${pathname === '/' ? '/signup' : '/profile'}`
    // const hamburgerMenu = `${pathname === '' ? '' : 'header__hamburger-btn_active'}`

    const [menuActive, setMenuActive] = React.useState(false);

 
    return (
        <header className="header">
            <Link to='/'><img className="header__logo" src={headerLogo} alt="Логотип проекта Movies" /></Link>
            {pathname === '/' ? (
                <nav className="header__nav">

                    <Link to='/signup' className="header__register">
                        {linkName}
                    </Link>
                    <Link to='/signin' className="header__button-login" type="button">
                        Войти
                    </Link>
                </nav>
            ) : (
                <nav className="header__nav header__nav_hamburger">
                    <Link to='/profile' className="header__register header__profile-link">
                        {linkName}
                    </Link>
                </nav>
            )}

            {pathname === '/' ? (
                <>
                </>
            ) : (
                <>
                    <div className="header__hamburger-btn" onClick={() => setMenuActive(!menuActive)}>
                        {/* <div className={`header__hamburger-btn ${hamburgerMenu}`} onClick={() => setMenuActive(!menuActive)}> */}
                        <span className="header__hamburger-span">

                        </span>
                    </div>
                </>
            )}


            <HamburgerMenu
                active={menuActive}
                setActive={setMenuActive}
                items={hamburgerMenuItems}
                linkName={linkName}
                linkUrl={linkUrl}
            />
        </header>
    )
}

export default Header;