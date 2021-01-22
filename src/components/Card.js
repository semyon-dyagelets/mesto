export default class Card {
    constructor({ data, userID, handleCardClick, handleLikeClick, handleDeleteClick }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._userID = userID;
        this._id = data._id;
        this._ownerID = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__photo');
        this._cardName = this._element.querySelector('.element__place-name');
        this._cardName.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        if (this._userID !== this._ownerID) {
            this._element.querySelector('.element__delete').style.display = "none";
        }
        this._setEventListeners();
        this.setLikes(this._likes);
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => this._handleLikeClick(this._id, this._isLiked()));
        this._element.querySelector('.element__delete').addEventListener('click', () => this._handleDeleteClick(this._id, this));
        this._element.querySelector('.element__photo').addEventListener('click', () => this._handleCardClick(this._link, this._name));
    }

    _handleLikeClick() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    removeCard() {
        this._element.remove();
    }

    _isLiked() {
        return this._element.querySelector('.element__like').classList.contains('element__like_active');
    }

    _isLikedByUser() {
        for (let i = 0;
            i < this._likes.length;
            i++) {
            if (this._likes[i]._id === this._userID) {
                return true;
            }
        }
        return false;
    }

    setLikes(likesArray) {
        this._likes = likesArray;
        const likeCounter = this._element.querySelector('.element__like-counter');
        const likeButton = this._element.querySelector('.element__like');
        likeCounter.textContent = likesArray.length;
        if (this._isLikedByUser()) {
            likeButton.classList.add('element__like_active');
        } else {
            likeButton.classList.remove('element__like_active');
        }
    }
}