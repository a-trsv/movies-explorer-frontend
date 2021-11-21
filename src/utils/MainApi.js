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
        // .then((data) => {
        //     if (data.token) {
        //         localStorage.setItem('jwt', data.token)
        //         api.updateToken()
        //         return data.token
        //     }
        // })
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
        // .then((data) => data)
    }

    getUserProfile(token) {
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => this._checkServerResponse(res))
        // .then((data) => data)
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
    // address: 'https://api-a-trsv-movies.nomoredomains.work',
    address: 'http://localhost:3000',
    headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default mainApi;