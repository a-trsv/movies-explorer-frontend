import React, { useCallback } from 'react';
import { useHistory, withRouter } from 'react-router-dom'
// import { currentUser } from '../../utils/constants';
import Form from '../Form/Form';
import { REGISTER_PAGE_ERRORS, ANOTHER_ERRORS } from '../../utils/errors';

function Register({ onRegister, loggedIn, regErrorStatus }) {

    const [regErrorText, setRegErrorText] = React.useState(null)
    const [formIsValid, setFormIsValid] = React.useState(false)
    const [errors, setErrors] = React.useState({})

    const history = useHistory()
    const [values, setValues] = React.useState({
        name: '',
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
        onRegister(values)
        setFormIsValid(false)
        setRegErrorText(null)
        resetForm()
    }

    React.useEffect(() => {
        switch (regErrorStatus) {
            case '400':
                setRegErrorText(REGISTER_PAGE_ERRORS.USER_REGISTER_ERROR)
                break;
            case '409':
                setRegErrorText(REGISTER_PAGE_ERRORS.USER_EXIST_ERROR)
                break;
            case '500':
                setRegErrorText(ANOTHER_ERRORS.SERVER_ERROR)
                break;
            default:
                break;
        }
    }, [regErrorStatus])

    return (
        <Form
            name="register"
            onSubmit={handleSubmit}
            saveButton="Зарегистрироваться"
            formIsValid={formIsValid}
        >
            <label
                className="form__input-label" htmlFor="inputName">
                Имя
            </label>
            <input
                className="form__input"
                type="text" id="inputName"
                placeholder="Введите имя"
                name='name'
                value={values.name || ''}
                onChange={handleChange}
                pattern="[A-Za-zА-Яа-яЁё -]+"
                minLength="2"
                maxLength="30"
                required
            />
            <span className="form__error" id="inputName-error">{errors.name}</span>



            <label
                className="form__input-label" htmlFor="inputEmail">
                Почта
            </label>
            <input
                className="form__input"
                type="email" id="inputEmail"
                placeholder="Введите E-Mail"
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
            <span className="form__error" id="inputEmail-error">{errors.password}</span>
            <p className="form__span_error">{regErrorText}</p>
        </Form>
    )
}

export default withRouter(Register);