import './Footer.css'

function Footer() {
    return (
        <section className="footer">
            <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className="footer__container">
                <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                <ul className="footer__nav">
                    <li className="footer__nav-item">
                        <a
                            className="footer__link"
                            href="https://practicum.yandex.ru"
                            rel="noreferrer"
                            target="_blank"
                        >
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li className="footer__nav-item">
                        <a
                            className="footer__link"
                            href="https://Github.com"
                            rel="noreferrer"

                            target="_blank"
                        >
                            Github
                        </a>
                    </li>
                    <li className="footer__nav-item">
                        <a
                            className="footer__link"
                            href="https://Facebook.com"
                            rel="noreferrer"

                            target="_blank"
                        >
                            Facebook
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Footer;