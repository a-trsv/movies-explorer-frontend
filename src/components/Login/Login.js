import React, { useCallback } from 'react';
import Form from '../Form/Form';
import { useHistory, withRouter } from 'react-router-dom'
import { LOGIN_PAGE_ERRORS, ANOTHER_ERRORS } from '../../utils/errors';



function Login({ onLogin, loggedIn, loginErrorStatus, tokenErrorStatus }) {

    const history = useHistory()
    const [formIsValid, setFormIsValid] = React.useState(false)
    const [loginErrorText, setLoginErrorText] = React.useState(null)
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
        getErrorSpan()
        resetForm()
    }

    function getErrorSpan() {
        if (loginErrorStatus) {
            switch (loginErrorStatus) {
                case '400':
                    setLoginErrorText(LOGIN_PAGE_ERRORS.WRONG_USER_INFO)
                    break;
                case '401':
                    setLoginErrorText(LOGIN_PAGE_ERRORS.WRONG_TOKEN_REQUEST)
                    break;
                case '500':
                    setLoginErrorText(ANOTHER_ERRORS.SERVER_ERROR)
                    break;
                default:
                    break;
            }
        }
        if (tokenErrorStatus) {
            switch (tokenErrorStatus) {
                case '409':
                    setLoginErrorText(LOGIN_PAGE_ERRORS.WRONG_TOKEN_COMPARE)
                    break;
                default:
                    break;
            }
        }
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
            <p className="form__span_error">{loginErrorText}</p>

        </Form>
    )
}

export default withRouter(Login);