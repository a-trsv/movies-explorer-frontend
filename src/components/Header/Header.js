import './Header.css'
import headerLogo from '../../images/logo.svg';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import hamburgerMenuItems from '../../utils/constants'
import Navigation from '../Navigation/Navigation';

function Header({
    loggedIn
}) {

    const { pathname } = useLocation();
    const linkName = `${pathname === '/' ? 'Регистрация' : 'Аккаунт'}`
    const linkUrl = `${pathname === '/' ? '/signup' : '/profile'}`

    const [menuActive, setMenuActive] = React.useState(false);

    // esli !loggedIn -> reg & login; esli loggedIn -> films+savedfilms+account

    return (
        <header className="header">
            <Link to='/'><img className="header__logo" src={headerLogo} alt="Логотип проекта Movies" /></Link>
            {!loggedIn ? (

                // if !loggedIn
                <nav className="header__nav">

                    <Link to='/signup' className="header__register">
                        {linkName}
                    </Link>
                    <Link to='/signin' className="header__button-login" type="button">
                        Войти
                    </Link>
                </nav>
                //
            ) : (
                <>
                <Navigation />

                <nav className="header__nav header__nav_hamburger">
                    <Link to='/profile' className="header__register header__profile-link">
                         Аккаунт
                    </Link>
                </nav>
                </>
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