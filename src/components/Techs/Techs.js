import './Techs.css'

function Techs() {
    return (
        <section className="techs" id="techs">
            <h3 className="techs__subtitle">Технологии</h3>
            <div className="techns__description">
                <h2 className="techs__title">7 технологий</h2>
                <p className="techs__paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <ul className="techs__items">
                <button className="techs__item">HTML</button>
                <button className="techs__item">CSS</button>
                <button className="techs__item">JS</button>
                <button className="techs__item">React</button>
                <button className="techs__item">Git</button>
                <button className="techs__item">Express.js</button>
                <button className="techs__item">MongoDB</button>
            </ul>
        </section>
    )
}

export default Techs;