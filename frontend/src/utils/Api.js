class Api {
    constructor(baseUrl) {
        this._checkRes = (res => res.ok ? res.json() : Promise.reject());
        this.baseUrl = baseUrl;
    }

    getAllCards(token) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(this._checkRes)
    }

    sendCard(data, token) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkRes)
    }

    deleteCard(cardId, token) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(this._checkRes)
    }

    getUserInfo(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(this._checkRes)
    }

    sendUserInfo(data, token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.info
            })
        })
            .then(this._checkRes)
    }

    changeAvatar(data, token) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkRes)
    }

    likeCard(cardId, token) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(this._checkRes)
    }

    dislikeCard(cardId, token) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(this._checkRes)
    }
}

const api = new Api( 'api.iceteamesto.nomoredomainsrocks.ru');

export default api;