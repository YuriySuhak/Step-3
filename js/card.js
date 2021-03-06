const cardsCaban = document.querySelector(".cards-caban");

class visitCard {
    constructor(card) {
        this.name = card.content.name;
        this.doctor = card.doctor;
        this.doctorName = card.content.doctorName;
        this.status = card.status;
        this.priority = card.priority;
        this.description = card.description;
        this.id = card.id;
        this.title = card.title;
    }

    firstCreat() {
        cardsCaban.innerHTML = '<p>No items have been added</p>';
    }

    removeElemCard() {
        cardsCaban.innerHTML = "";
    }

    createElemBtns(elemCard, i) {
        const editField = document.createElement("div");
        editField.classList = "drop-menu";
        elemCard.appendChild(editField);

        const editMenu = document.createElement('button');
        editMenu.innerText = 'Изменить';
        editMenu.dataset.menu = "menu";
        editField.appendChild(editMenu);

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Редактировать';
        editBtn.hidden = true;
        editBtn.dataset.i = i;
        editBtn.dataset.edit = "edit";
        editBtn.dataset.doctor = this.doctor;
        editField.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Удалить';
        deleteBtn.hidden = true;
        deleteBtn.dataset.i = i;
        deleteBtn.dataset.delete = "delete";
        deleteBtn.dataset.doctor = this.doctor;
        editField.appendChild(deleteBtn);

        if (this.status === "open") {
            const doneBtn = document.createElement('button');
            doneBtn.innerText = 'Завершить';
            doneBtn.hidden = true;
            doneBtn.dataset.i = i;
            doneBtn.dataset.complete = "complete";
            doneBtn.dataset.doctor = this.doctor;
            editField.appendChild(doneBtn);
        }
        return editField;
    }

    creatElemCard(i) {
        const elemCard = document.createElement('div');
        elemCard.dataset.position = i;
        if (this.status == 'open') {
            elemCard.classList = 'status-open';
        } else {
            elemCard.classList = 'status-done';
        }
        elemCard.innerHTML = `<p>Пациент:<span>${this.name}</span></p>
<p>Лечащий врач:<span>${this.doctorName}</span></p>`;


        const moreField = document.createElement("div");
        moreField.classList = "drop-menu";


        const elemMore = document.createElement('button');
        elemMore.innerText = 'Показать больше';
        elemMore.classList.add('btn-more');
        elemMore.dataset.doctor = this.doctor;

        cardsCaban.appendChild(elemCard);
        elemCard.appendChild(moreField);
        moreField.prepend(elemMore);
        this.createElemBtns(elemCard, i);
        elemCard.id = this.id;

    }

}

class cardDantist extends visitCard {
    constructor(card) {
        super(card);
        this.lastVisit = card.content.lastVisitDate;
    }

    creatAddField(target, i) {
        target.innerHTML = `<p>Доктор:<span>Стоматолог</span></p>
<p>Пациент:<span>${this.name}</span></p>
<p>Цель визита:<span>${this.title}</span></p>
<p>Приоритет:<span>${this.priority}</span></p>
<p>Статус:<span>${this.status}</span></p>
<p>Описание:<span>${this.description}</span></p>
<p>Последний визит:<span>${this.lastVisit}</span></p>
<p>Лечащий врач:<span>${this.doctorName}</span></p>
`;
        super.createElemBtns(target, i);
    }
}

class cardCardiologist extends visitCard {
    constructor(card,) {
        super(card);
        this.pressure = card.content.pressure;
        this.weightIndex = card.content.weightIndex;
        this.age = card.content.age;
    }

    creatAddField(target, i) {

        target.innerHTML = `<p>Доктор:<span>Кардиолог</span></p>
<p>Пациент:<span>${this.name}</span></p>
<p>Цель визита:<span>${this.title}</span></p>
<p>Приоритет:<span>${this.priority}</span></p>
<p>Статус:<span>${this.status}</span></p>
<p>Описание:<span>${this.description}</span></p>
<p>Давление:<span>${this.pressure}</span></p>
<p>Индекс веса:<span>${this.weightIndex}</span></p>
<p>Возраст:<span>${this.age}</span></p>
<p>Лечащий врач:<span>${this.doctorName}</span></p>
`;
        super.createElemBtns(target, i);
    }
}

class cardTherapist extends visitCard {
    constructor(card) {
        super(card);
        this.age = card.content.age;
    }

    creatAddField(target, i) {
        target.innerHTML = `<p>Доктор:<span>Терапевт</span></p>
<p>Пациент:<span>${this.name}</span></p>
<p>Цель визита:<span>${this.title}</span></p>
<p>Приоритет:<span>${this.priority}</span></p>
<p>Статус:<span>${this.status}</span></p>
<p>Описание:<span>${this.description}</span></p>
<p>Возраст:<span>${this.age}</span></p>
<p>Лечащий врач:<span>${this.doctorName}</span></p>
`;
        super.createElemBtns(target, i);
    }
}

visitCard.prototype.firstCreat();

cardsCaban.addEventListener('click', (e) => {
    let parentCard = e.path[2];
    let currentVisit = e.path[2].dataset.position;
    let currentID = e.path[2].id;
    let card;
    if (filtered.length) {
        card = filtered[currentVisit];
    } else {
        card = cards[currentVisit];
    }
    if (e.target.dataset.menu) {
        e.target.parentElement.children[1].hidden = false;
        e.target.parentElement.children[2].hidden = false;
        if (e.target.parentElement.children[3]) {
            e.target.parentElement.children[3].hidden = false;
        }
        e.target.parentElement.children[0].hidden = true;
    }
    if (e.target.dataset.doctor == "dentist") {
        let addCardData = new cardDantist(card);
        addCardData.creatAddField(parentCard, currentVisit);
    }
    if (e.target.dataset.doctor == "cardiologist") {
        let addCardData = new cardCardiologist(card);
        addCardData.creatAddField(parentCard, currentVisit);
    }
    if (e.target.dataset.doctor == "therapist") {
        let addCardData = new cardTherapist(card);
        addCardData.creatAddField(parentCard, currentVisit);
    }
    if (e.target.dataset.edit) {
        // let i = e.path[1].dataset.position;
        new Modal('edit').render();
        let i = cards.findIndex(x => x.id === currentID);
        editModal(card, i, e.target.dataset.doctor)
    }
    if (e.target.dataset.complete) {
        let i = cards.findIndex(x => x.id === currentID);
        card.status = 'done';
        delete card.id;
        completeVisit(currentID, card, i);
    }
    if (e.target.dataset.delete) {
        let i = cards.findIndex(x => x.id === currentID);
        deleteThisVisit(currentID, i);
    }
});

function deleteThisVisit(id, index) {
    axios.delete(`http://cards.danit.com.ua/cards/${id}`, authConfig).then(function (response) {
        if (response.status === 200) {

            cards.splice(index, 1);
            filtered = {};
            creatCards(cards);
        } else {
            alert(`${response.status}: ${response.statusText}`);
        }
    })
        .catch(function (error) {
            console.log(error);
        });
}

function editModal(card, i, doctor) {

    switch (doctor) {
        case "cardiologist":
            new FormCardiologist(card).createInputs(optionalInputs);
            editCardObject(card, i);
            break;
        case "dentist":
            new FormDentist(card).createInputs(optionalInputs);
            editCardObject(card, i);
            break;
        case "therapist":
            new FormTherapist(card).createInputs(optionalInputs);
            editCardObject(card, i);
            break;
    }
}

function completeVisit(cardId, data, index) {
    axios.put(`http://cards.danit.com.ua/cards/${cardId}`, data, authConfig).then(function (response) {
        if (response.status === 200) {
            cards[index] = response.data;
            filtered = {};
            creatCards(cards);
        } else {
            alert(`${response.status}: ${response.statusText}`);
        }
    })
        .catch(function (error) {
            console.log(error);
        });
}

function creatCards(cards) {
    if (cards.length > 0) {
        visitCard.prototype.removeElemCard();
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const genCard = new visitCard(card);
            genCard.creatElemCard(i);
        }
    } else {
        visitCard.prototype.firstCreat();
    }
}

const sortable = document.getElementById('sortable');
Sortable.create(sortable, {
    forceFallback: true,
    animation: 100,
    delay: 50
});