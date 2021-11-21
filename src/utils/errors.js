const LOGIN_PAGE_ERRORS = {
    WRONG_USER_INFO: 'Вы ввели неправильный логин или пароль',
    WRONG_TOKEN_REQUEST: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате',
    WRONG_TOKEN_COMPARE: 'При авторизации произошла ошибка. Переданный токен некорректен'
}

const REGISTER_PAGE_ERRORS = {
    USER_EXIST_ERROR: 'Пользователь с таким E-Mail уже существует',
    USER_REGISTER_ERROR: 'При регистрации пользозователя произошла ошибка'
}

const PROFILE_PAGE_ERRORS = {
    PROFILE_EXIST_ERROR: 'Пользователь с таким E-Mail уже существует',
    PROFILE_EDIT_ERROR: 'При обновлении профиля произошла ошибка'
}

const ANOTHER_ERRORS = {
    SERVER_ERROR: 'На сервере произошла ошибка', // 500
    NOTFOUND_ERROR: 'Страница по указанному маршруту не найдена' // 404
}

export {
    LOGIN_PAGE_ERRORS,
    REGISTER_PAGE_ERRORS,
    PROFILE_PAGE_ERRORS,
    ANOTHER_ERRORS
}