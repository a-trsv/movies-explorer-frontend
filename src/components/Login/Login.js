import React, { useCallback } from 'react';
import Form from '../Form/Form';
import { useHistory, withRouter } from 'react-router-dom'

function Login({ onLogin, loggedIn, profileStatus }) {

    const history = useHistory()
    const [formIsValid, setFormIsValid] = React.useState(false)
    const [errors, setErrors] = React.useState({})

    const [values, setValues] = React.useState({
        email: '',
        password: '',
    })

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/movies')
        }
    }, [history, loggedIn])

    function handleChange(evt) {
        const target = evt.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value })
        setErrors({ ...errors, [name]: target.validationMessage })
        setFormIsValid(target.closest('form').checkValidity())

    }
    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newFormIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setFormIsValid(newFormIsValid)
        },
        [setValues, setErrors, setFormIsValid]
    )


    function handleSubmit(evt) {
        evt.preventDefault();
        // console.log(values)
        onLogin(values)
        resetForm()
    }

    return (
        <Form
            name="login"
            onSubmit={handleSubmit}
            saveButtonClassName="form__save-button_login"
            saveButton="Войти"
            formIsValid={formIsValid}
        >
            <label
                className="form__input-label" htmlFor="inputEmail">
                Почта
            </label>
            <input
                className="form__input"
                type="email" id="inputEmail"
                placeholder="Введите Ваш E-Mail"
                name='email'
                value={values.email || ''}
                onChange={handleChange}
                // добавляем проверку на корректность домена почты + возможность доменов нескольких уровней, например login@domain.com.ru
                pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                required
            />
            <span className="form__error" id="inputEmail-error">{errors.email}</span>

            <label
                className="form__input-label" htmlFor="inputPassword">
                Пароль
            </label>
            <input
                className="form__input form__input_error"
                type="password" id="inputPassword"
                name='password'
                placeholder="Введите пароль"
                value={values.password || ''}
                onChange={handleChange}
                minLength="8"
                required
            />
            <span className="form__error" id="inputPassword-error">{errors.password}</span>
            <p className="form__span_error">{profileStatus}</p>

        </Form>
    )
}

export default withRouter(Login);