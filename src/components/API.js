export default class API {
    constructor({ baseURL, token }) {
        this._baseURL = baseURL;
        this._token = token;
    }

    getUserInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }

    getInitialCards() {
        return fetch(`${this._baseURL}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }

    editProfile(data) {
        console.log(data);
        return fetch(`${this._baseURL}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }

    editAvatar(data) {
        return fetch(`${this._baseURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }

    addCard(data) {
        return fetch(`${this._baseURL}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }

    deleteCard(id) {
        return fetch(`${this._baseURL}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }

    putLike(id) {
        return fetch(`${this._baseURL}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }

    deleteLike(id) {
        return fetch(`${this._baseURL}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }
}