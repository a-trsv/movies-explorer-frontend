class MainApi {
    constructor(options) {
        this._address = options.address;
        this._headers = options.headers;
    }

    _checkServerResponse(res) {
        if (res.ok) {
            return res.json()
        }
        // Если происходит ошибка, отклоняем промис
        return Promise.reject(`${res.status}`)
    }

    register(name, email, password) {
        return fetch(`${this._address}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ name, email, password })
        })
            .then(res => this._checkServerResponse(res))
    }

    authorization(email, password) {
        return fetch(`${this._address}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
        })
            .then(res => this._checkServerResponse(res))
    }

    checkToken(token) {
        // console.log(token)
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => this._checkServerResponse(res))
    }

    getUserData() {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => this._checkServerResponse(res))
        //
        //  .then((data) => data)
    }

    getUserMovies() {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._address}/movies`, {
            method: 'GET',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => this._checkServerResponse(res))
        //
        //  .then((data) => data)
    }

    // https://www.youtube.com/watch?v=dQw4w9WgXcQ

    addFilm(movie) {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._address}/movies`, {
            method: 'POST',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                country: movie.country ? movie.country : 'null',
                director: movie.director ? movie.director : 'null',
                duration: movie.duration ? movie.duration : '0',
                year: movie.year ? movie.year : '1900',
                description: movie.description ? movie.description : 'null',
                image: movie.image ? `https://api.nomoreparties.co${movie.image.url}` : 'null',
                trailer: movie.trailerLink ? movie.trailerLink : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail ? movie.image.formats.thumbnail.url : ''}`,
                movieId: movie.id,
                nameRU: movie.nameRU ? movie.nameRU : 'null',
                nameEN: movie.nameEN ? movie.nameEN : 'null',

            })
        })
            .then(res => this._checkServerResponse(res))
        //
        //  .then((data) => data)
    }

    deleteFilm(movieId) {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._address}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => this._checkServerResponse(res))
        //
        //  .then((data) => data)
    }

    updateProfile(data, token) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`,

            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
            })
        })
            .then(res => this._checkServerResponse(res))
    }

}
const mainApi = new MainApi({
    // address: 'https://api.a-trsv.nomoredomains.club',
    address: 'https://api-a-trsv-movies.nomoredomains.work',
    // address: 'http://localhost:3000',
    headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default mainApi;