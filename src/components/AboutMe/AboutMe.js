import './AboutMe.css';
import profilePhoto from '../../images/vitaly.png';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <section className="about-me" id="me">
            <h3 className="about-me__subtitle">Cтудент</h3>
            <div className="about-me__container">
                <article className="about-me__description">
                    <h2 className="about-me__title">Виталий</h2>
                    <p className="about-me__span">Фронтенд-разработчик, 30 лет</p>
                    <p className="about-me__paragraph">
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                        С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
                        начал заниматься фриланс-заказами и ушёл с постоянной работы.
                </p>
                    <div className="about-me__links">
                        <a
                            className="about-me__link"
                            href="https://facebook.com"
                            rel="noreferrer"
                            target="_blank"
                        >
                            Facebook
                    </a>
                        <a
                            className="about-me__link"
                            href="https://GitHub.com/a-trsv"
                            rel="noreferrer"
                            target="_blank"
                        >
                            Github
                    </a>
                    </div>
                </article>
                <img className="about-me__photo" src={profilePhoto} alt="Фото Виталия" />
            </div>
            <Portfolio />
        </section>
    )
}

export default AboutMe;