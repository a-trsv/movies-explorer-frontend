import React from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { withRouter } from 'react-router-dom'
import { CurrentUserContext } from '../../components/CurrentUserContext/CurrentUserContext'
import { PROFILE_PAGE_ERRORS, ANOTHER_ERRORS } from '../../utils/errors';


function Profile({
    loggedIn,
    onSignOut,
    onUpdateProfile,
    profileEditErrorStatus
}) {

    const currentUser = React.useContext(CurrentUserContext)
    // console.log(currentUser)
    const [values, setValues] = React.useState({
        name: '',
        email: '',
    })
    const [formIsValid, setFormIsValid] = React.useState(false)
    const profileSaveButtonType = `${!formIsValid ? 'profile__button_edit' : 'profile__button_active'}`
    const profileSaveButtonText = `${!formIsValid ? 'Редактировать' : 'Сохранить'}`
    const profileSignOutButtonType = `${!formIsValid ? 'profile__exit-button_active' : 'profile__exit-button'}`

    const [profileErrorText, setProfileErrorText] = React.useState(null)

    React.useEffect(() => {
        setValues({
            name: currentUser.name || '',
            email: currentUser.email || '',
        })
    }, [currentUser])

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateProfile(values)
        setFormIsValid(false)
        setProfileErrorText(null)
    }

    function handleChange(evt) {
        const target = evt.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value })
        setFormIsValid(target.closest('form').checkValidity())
    }


    React.useEffect(() => {
        switch (profileEditErrorStatus) {
            case '400':
                setProfileErrorText(PROFILE_PAGE_ERRORS.PROFILE_EDIT_ERROR)
                break;
            case '409':
                setProfileErrorText(PROFILE_PAGE_ERRORS.PROFILE_EXIST_ERROR)
                break;
            case '500':
                setProfileErrorText(ANOTHER_ERRORS.SERVER_ERROR)
                break;
            default:
                break;
        }
    }, [profileEditErrorStatus])


    return (
        <>
            <Header loggedIn={loggedIn} />
            <form className="profile" id="profile-edit" onSubmit={handleSubmit}>
                <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                <div className="profile__info">
                    <div className="profile__zone">
                        <label
                            className="profile__name" htmlFor="inputName">
                            Имя
                            </label>
                        <input
                            className="profile__input"
                            type="text" id="inputName"
                            placeholder='Введите свое имя'
                            name='name'
                            value={values.name}
                            onChange={handleChange}
                            minLength="2"
                            maxLength="30"
                            required
                        />
                    </div>
                    <div className="profile__zone">
                        <label
                            className="profile__email" htmlFor="inputEmail">
                            Почта
                            </label>
                        <input
                            className="profile__input"
                            type="text" id="inputEmail"
                            placeholder='Введите свой E-Mail!'
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="profile__edit-zone">
                    <p className="profile__edit-error">{profileErrorText}</p>
                    <button disabled={!formIsValid} className={`profile__button ${profileSaveButtonType}`} form="profile-edit" type="submit">
                        {profileSaveButtonText}
                    </button>
                    <Link onClick={onSignOut} className={`profile__button ${profileSignOutButtonType}`} to="/">
                        Выйти из аккаунта
                </Link>
                </div>
            </form>
        </>
    )
}

export default withRouter(Profile);