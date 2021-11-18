import './AboutProject.css'

function AboutProject() {
    return (
        <section className="about-project" id="project">
            <h3 className="about-project__title">О проекте</h3>
            <article className="about-project__description">
                <div className="about-project__two-columns">
                    <h4 className="about-project__subtitle">Дипломный проект включил 5 этапов</h4>
                    <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку,
                        добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__two-columns">
                    <h4 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h4>
                    <p className="about-project__paragraph">У каждого был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
                        чтобы успешно защититься.</p>
                </div>
            </article>
            <div className="about-project__timeline-container">
                <div className="about-project__timeline about-project__timeline_backend">
                    <div className="about-project__timeline-graph about-project__timeline-graph_backend">1 неделя</div>
                    <p className="about-project__timeline-span">Back-end</p>
                </div>
                <div className="about-project__timeline about-project__timeline_frontend">
                    <div className="about-project__timeline-graph about-project__timeline-graph_frontend">4 недели</div>
                    <p className="about-project__timeline-span">Front-end</p>
                </div>
            </div>
        </section>
    )
}


export default AboutProject;