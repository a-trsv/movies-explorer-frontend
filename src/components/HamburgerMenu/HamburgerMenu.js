import React from 'react';
import { NavLink } from 'react-router-dom';
import './HamburgerMenu.css'


function HamburgerMenu({ items, linkName, active, setActive, linkUrl }) {

    return (
        <div className={active ? 'hamburger-menu active' : 'hamburger-menu'} onClick={() => setActive(false)}>
            <div className="hamburger-menu__blur" />
            <div className="hamburger-menu__content" onClick={event => event.stopPropagation()}>
                <ul className="hamburger-menu__items">
                    {items.map(item =>
                        <li key={item.id} className="hamburger-menu__item">
                            <NavLink className="hamburger-menu__link" activeClassName="hamburger-menu__link_active" exact={true} to={item.href}
                                onClick={() => setActive(false)}>{item.value}</NavLink>
                        </li>
                    )}
                </ul>
                <>
                    <NavLink to={linkUrl} activeClassName="hamburger-menu__link_active" exact={true} className="hamburger-menu__profile-link"
                        onClick={() => setActive(false)}>
                        {linkName}
                    </NavLink>
                    <button onClick={() => setActive(false)} aria-label="Закрыть меню" type="button" className="hamburger-menu__close-button" />
                </>
            </div>
        </div>
    )
}

export default HamburgerMenu;