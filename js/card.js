const cardsCaban = document.querySelector(".cards-caban");

class visitCard {
    constructor (card) {
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
removeElemCard () {
    cardsCaban.innerHTML = "";
}

creatElemCard (i) {
        const elemCard = document.createElement('div');
        elemCard.dataset.position = i;

    const elemClient = document.createElement('p');
        elemClient.innerText = 'Name: ';
        const elemClientName = document.createElement('span');
        elemClientName.innerText = this.name;

        const elemDoctor = document.createElement('p');
        elemDoctor.innerText = 'Doctor Name: ';
        const elemDoctorName = document.createElement('span');
        elemDoctorName.innerText = this.doctorName;
        const elemMore = document.createElement('button');
        elemMore.innerText = 'show more data';
        elemMore.classList.add('btn-more');
        elemMore.dataset.doctor = this.doctor;
        const editBtn = document.createElement('button');
        editBtn.innerText = 'edit visit';
        editBtn.dataset.i = i;
        editBtn.dataset.edit = "edit";
        editBtn.dataset.doctor = this.doctor;
    cardsCaban.appendChild(elemCard);
    elemCard.appendChild(elemClient);
    elemClient.appendChild(elemClientName);
    elemCard.appendChild(elemDoctor);
    elemDoctor.appendChild(elemDoctorName);
    elemCard.appendChild(elemMore);
    elemCard.appendChild(editBtn);
    elemCard.id = this.id;
}
creatCard () {
        if(cards.length > 0) {
            visitCard.prototype.removeElemCard();

            let doctorName = '';
            let client = '';
            let cardId = '';
            let doctor = '';
            for (let i = 0; i < cards.length; i++) {
                client = cards[i].content.name;
                doctorName = cards[i].content.doctorName;
                doctor = cards[i].doctor;
                cardId = cards[i].id;
                const card = cards[i];
                visitCard.prototype.creatElemCard(card);
        }
        }
}
}

class cardDantist extends visitCard {
    constructor(card) {
        super(card);
        this.lastVisit = card.content.lastVisitDate;
    }
creatAddField(target, i) {
    target.innerHTML = `<p>doctor:<span>${this.doctor}</span></p>
<p>name:<span>${this.name}</span></p>
<p>title:<span>${this.title}</span></p>
<p>priority:<span>${this.priority}</span></p>
<p>status:<span>${this.status}</span></p>
<p>Description:<span>${this.description}</span></p>
<p>last Visit Date:<span>${this.lastVisit}</span></p>
<p>doctor Name:<span>${this.doctorName}</span></p>
`;
    const editBtn = document.createElement('button');
    editBtn.innerText = 'edit visit';
    editBtn.dataset.i = i;
    editBtn.dataset.edit = "edit";
    editBtn.dataset.doctor = this.doctor;
    target.appendChild(editBtn);
}
}
class cardCardiologist extends visitCard {
    constructor (card,) {
        super(card);
        this.pressure = card.content.pressure;
        this.weightIndex = card.content.weightIndex;
        this.age = card.content.age;
}

    creatAddField(target, i) {

        target.innerHTML = `<p>doctor:<span>${this.doctor}</span></p>
<p>name:<span>${this.name}</span></p>
<p>title:<span>${this.title}</span></p>
<p>priority:<span>${this.priority}</span></p>
<p>status:<span>${this.status}</span></p>
<p>Description:<span>${this.description}</span></p>
<p>pressure:<span>${this.pressure}</span></p>
<p>weight Index:<span>${this.weightIndex}</span></p>
<p>age:<span>${this.age}</span></p>
<p>doctor Name:<span>${this.doctorName}</span></p>
`;
        const editBtn = document.createElement('button');
        editBtn.innerText = 'edit visit';
        editBtn.dataset.i = i;
        editBtn.dataset.edit = "edit";
        editBtn.dataset.doctor = this.doctor;
        target.appendChild(editBtn);
    }
}
class cardTherapist extends visitCard {
    constructor (card,) {
        super(card);
        this.age = card.content.age;
    }
    creatAddField(target, i) {
        target.innerHTML = `<p>doctor:<span>${this.doctor}</span></p>
<p>name:<span>${this.name}</span></p>
<p>title:<span>${this.title}</span></p>
<p>priority:<span>${this.priority}</span></p>
<p>status:<span>${this.status}</span></p>
<p>Description:<span>${this.description}</span></p>
<p>age:<span>${this.age}</span></p>
<p>doctor Name:<span>${this.doctorName}</span></p>
`;
        const editBtn = document.createElement('button');
        editBtn.innerText = 'edit visit';
        editBtn.dataset.i = i;
        editBtn.dataset.edit = "edit";
        editBtn.dataset.doctor = this.doctor;
        target.appendChild(editBtn);
    }
}

visitCard.prototype.firstCreat();

// document.body.addEventListener('submit', () => {
//     creatCards (cards);
// });

cardsCaban.addEventListener('click', (e) => {
   if (e.target.dataset.doctor == "dentist") {
       console.log(e.path[1]);
       let parentCard = e.path[1];
       let currentVisit = e.path[1].dataset.position;
       console.log(currentVisit);
       let card = cards[currentVisit];
       let addCardData = new cardDantist(card);
       addCardData.creatAddField(parentCard, currentVisit);
   }
    if (e.target.dataset.doctor == "cardiologist") {
        console.log(e.path[1]);
        let parentCard = e.path[1];
        let currentVisit = e.path[1].dataset.position;
        let card = cards[currentVisit];
        let addCardData = new cardCardiologist(card);
        addCardData.creatAddField(parentCard, currentVisit);
    }
    if (e.target.dataset.doctor == "therapist") {
        console.log(e.path[1]);
        let parentCard = e.path[1];
        let currentVisit = e.path[1].dataset.position;
        let card = cards[currentVisit];
        let addCardData = new cardTherapist(card);
        addCardData.creatAddField(parentCard, currentVisit);
    }
    if(e.target.dataset.edit) {
        let i = e.path[1].dataset.position;
        new Modal('edit').render();

        const editForm = document.getElementById("edit-card");
        const currentDoctor = document.createElement('p');
        currentDoctor.innerText = `visit to ${e.target.dataset.doctor}`;
        editForm.parentElement.firstChild.appendChild(currentDoctor);

        switch (e.target.dataset.doctor){
            case "cardiologist":
                new FormCardiologist(cards[i]).createInputs(optionalInputs);
                editCardObject(cards[i], i);
                break;
            case "dentist":
                new FormDentist(cards[i]).createInputs(optionalInputs);
                editCardObject (cards[i], i);
                break;
            case "therapist":
                new FormTherapist(cards[i]).createInputs(optionalInputs);
                editCardObject (cards[i], i);
                break;
        }
    }
});


function creatCards (cards) {
    if(cards.length > 0) {
        visitCard.prototype.removeElemCard();
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const genCard = new visitCard(card);
            genCard.creatElemCard(i);
        }
    }
}