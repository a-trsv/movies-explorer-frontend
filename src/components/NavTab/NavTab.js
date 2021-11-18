import './NavTab.css'

function NavTab() {
    return (
        <nav className="nav-tab">
            <button className="nav-tab__button">
                <a
                    className="nav-tab__link"
                    href="#project"
                >
                    О проекте
                </a>
            </button>
            <button className="nav-tab__button">
                <a
                    className="nav-tab__link"
                    href="#techs"
                >
                    Технологии
                </a>
            </button>
            <button className="nav-tab__button">
                <a
                    className="nav-tab__link"
                    href="#me"
                >
                    Студент
                </a>
            </button>
        </nav>
    )
}

export default NavTab