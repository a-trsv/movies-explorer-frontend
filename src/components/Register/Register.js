import React from 'react';
import { currentUser } from '../../utils/constants';
import Form from '../Form/Form';

function Register() {
    return (
        <Form
            name="register"
            // onSubmit={handleSubmit}
            saveButtonClassName=""
            saveButton="Зарегистрироваться"
        >
            <label
                className="form__input-label" for="inputName">
                Имя
            </label>
            <input
                className="form__input"
                type="text" id="inputName"
                placeholder={currentUser.name}
                required
            />
            <span className="form__error" id="inputName-error">Что-то пошло не так..</span>



            <label
                className="form__input-label" for="inputEmail">
                Почта
            </label>
            <input
                className="form__input"
                type="email" id="inputEmail"
                placeholder={currentUser.email}
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

export default Register;