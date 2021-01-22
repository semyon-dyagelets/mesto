export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    clear() {
        this._container.innerHTML = '';
    }

    renderItems(cards) {
        this.clear();
        cards.forEach(item => {
            this._renderer(item);
        })
    }

    addItem(element) {
        this._container.prepend(element)
    }
}