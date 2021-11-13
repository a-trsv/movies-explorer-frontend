import React from 'react';
import './Profile.css'
import {currentUser} from '../../utils/constants';
import { Link } from 'react-router-dom';

// После этапа 2 переписать на форму

function Profile() {

    return (
        <section className="profile">
            <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <div className="profile__info">
                <div className="profile__zone">
                    <p className="profile__name">Имя</p>
                    <p className="profile__current-name">{currentUser.name}</p>
                </div>
                <div className="profile__zone">
                    <p className="profile__email">Имя</p>
                    <p className="profile__current-email">{currentUser.email}</p>
                </div>
            </div>
            <div className="profile__edit-zone">
                <button className="profile__button profile__button_edit">
                    Редактировать
                </button>
                <Link className="profile__button profile__button_signout" to="/">
                    Выйти из аккаунта
                </Link>
            </div>
        </section>
    )
}

export default Profile;