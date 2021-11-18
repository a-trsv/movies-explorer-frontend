import React from 'react';
import Form from '../Form/Form';

function Login() {
    return (
        <Form
            name="login"
            // onSubmit={handleSubmit}
            saveButtonClassName="form__save-button_login"
            saveButton="Войти"
        >
            <label
                className="form__input-label" for="inputEmail">
                Почта
            </label>
            <input
                className="form__input"
                type="email" id="inputEmail"
                placeholder="Введите Ваш E-Mail"
                required
            />
            <span className="form__error" id="inputEmail-error">Что-то пошло не так..</span>

            <label
                className="form__input-label" for="inputPassword">
                Почта
            </label>
            <input
                className="form__input form__input_error"
                type="password" id="inputPassword"
                required
            />
            <span className="form__error form__error_visible" id="inputPassword-error">Что-то пошло не так..</span>

        </Form>
    )
}

export default Login;