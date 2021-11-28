class MoviesApi {
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

    getMoviesContent() {
        return fetch(`${this._address}`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(res => this._checkServerResponse(res))
    }
}

const moviesApi = new MoviesApi({
    // address: 'http://localhost:3000',
    address: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default moviesApi;