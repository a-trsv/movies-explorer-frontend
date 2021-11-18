import React from 'react';
import './NotFoundError.css';
import { useHistory } from 'react-router-dom';

function NotFoundError() {

    const history = useHistory();

    return (
        <section className="not-found-error">
            <h1 className="not-found-error__title">404</h1>
            <p className="not-found-error__span">Страница не найдена</p>
            <p className="not-found-error__return" onClick={() => history.goBack()}>Назад</p>
        </section>
    )
}

export default NotFoundError;