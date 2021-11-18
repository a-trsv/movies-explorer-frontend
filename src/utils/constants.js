// Поскольку на этапе 2 фронтенд не связан с API, то мы не получаем карточки с сервера
// Поэтому создаем карточки через указанные данные

import firstMovieThumbnail from '../images/benksi-first.png';
import secondMovieThumbnail from '../images/benksi-second.png'
import thirdMovieThumbnail from '../images/benksi-third.png';
import fourthMovieThumbnail from '../images/benksi-four.png';
import fifthMovieThumbnail from '../images/benksi-five.png';
import sixthMovieThumbnail from '../images/benksi-six.png';
import seventhMovieThumbnail from '../images/benksi-seven.png';
import eightMovieThumbnail from '../images/benksi-eight.png';
import ninethMovieThumbnail from '../images/benksi-nine.png';
import tenthMovieThumbnail from '../images/benksi-ten.png';
import eleventhMovieThumbnail from '../images/benksi-eleven.png';
import twelvethMovieThumbnail from '../images/benksi-twelve.png';

const MOVIES = [
    {
        id: 1,
        title: 'В погоне за Бенкси',
        duration: '27 минут',
        imageSRC: firstMovieThumbnail,
        isSaved: true,
        isShortFilm: true,
    },
    {
        id: 2,
        title: 'В погоне за Бенкси',
        duration: '27 минут',
        imageSRC: secondMovieThumbnail,
        isSaved: true,
        isShortFilm: true,
    },
    {
        id: 3,
        title: 'В погоне за Бенкси',
        duration: '27 минут',
        imageSRC: thirdMovieThumbnail,
        isSaved: false,
        isShortFilm: true,
    },
    {
        id: 4,
        title: 'В погоне за Бенкси',
        duration: '27 минут',
        imageSRC: fourthMovieThumbnail,
        isSaved: false,
        isShortFilm: true,
    },
    {
        id: 5,
        title: 'В погоне за Бенкси',
        duration: '27 минут',
        imageSRC: fifthMovieThumbnail,
        isSaved: false,
        isShortFilm: true,
    },
    {
        id: 6,
        title: 'В погоне за Бенкси',
        duration: '27 минут',
        imageSRC: sixthMovieThumbnail,
        isSaved: true,
        isShortFilm: true,
    },
    {
        id: 7,
        title: 'В погоне за Бенкси',
        duration: '27 минут',
        imageSRC: seventhMovieThumbnail,
        isSaved: true,
        isShortFilm: true,
    },
    {
        id: 8,
        title: 'В погоне за Бенкси',
        duration: '27 минут',
        imageSRC: eightMovieThumbnail,
        isSaved: false,
        isShortFilm: true,
    },
    {
        id: 9,
        title: 'В погоне за Бенкси',
        duration: '27 минут',
        imageSRC: ninethMovieThumbnail,
        isSaved: false,
        isShortFilm: true,
    },
    {
        id: 10,
        title: 'В погоне за Бенкси',
        duration: '27 минут',
        imageSRC: tenthMovieThumbnail,
        isSaved: false,
        isShortFilm: true,
    },
    {
        id: 11,
        title: 'В погоне за Бенкси',
        duration: '27 минут',
        imageSRC: eleventhMovieThumbnail,
        isSaved: true,
        isShortFilm: true,
    },
    {
        id: 12,
        title: 'В погоне за Бенкси',
        duration: '27 минут',
        imageSRC: twelvethMovieThumbnail,
        isSaved: false,
        isShortFilm: true,
    }

]

const currentUser = {
    name: 'Виталий',
    email: 'pochta@yandex.ru'
}

const hamburgerMenuItems = [
    {
        value: "Главная",
        href: '/',
        id: 1
    },
    {
        value: "Фильмы",
        href: '/movies',
        id: 2
    },
    {
        value: "Сохранённые фильмы",
        href: '/saved-movies',
        id: 3
    },
]


export {
    MOVIES,
    currentUser,
    hamburgerMenuItems
}