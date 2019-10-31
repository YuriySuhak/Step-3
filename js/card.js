
const cardsCaban = document.querySelector(".cards-caban");

class visitCard {
    constructor () {
        this.elemBtnShow = document.createElement('button');
        elemMore.innerText = 'show more';
}

firstCreat() {
    console.log(cardsCaban);
    cardsCaban.innerHTML = '<p>No items have been added</p>';
}
removeElemCard () {
    cardsCaban.innerHTML = "";
}
creatElemCard (client, doctorName, cardId, doctor, i) {
        const elemCard = document.createElement('div');
        elemCard.dataset.position = i;

    const elemClient = document.createElement('p');
        elemClient.innerText = 'Name: ';
        const elemClientName = document.createElement('span');
        elemClientName.innerText = client;
        const elemDoctor = document.createElement('p');
        elemDoctor.innerText = 'Doctor Name: ';
        const elemDoctorName = document.createElement('span');
        elemDoctorName.innerText = doctorName;
        const elemMore = document.createElement('button');
        elemMore.innerText = 'show more data';
        elemMore.classList.add('btn-more');
        elemMore.dataset.doctor = doctor;
        const edit = document.createElement('button');
        edit.innerText = 'edit visit';
        edit.dataset.i = i;
        edit.dataset.edit = "edit";
    cardsCaban.appendChild(elemCard);
    elemCard.appendChild(elemClient);
    elemClient.appendChild(elemClientName);
    elemCard.appendChild(elemDoctor);
    elemDoctor.appendChild(elemDoctorName);
    elemCard.appendChild(elemMore);
    elemCard.appendChild(edit);
    elemCard.id = cardId;
}
creatCard () {
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
            visitCard.prototype.creatElemCard(client, doctorName, cardId, doctor, i);
        }
}
}

class cardDantist {
creatAddField(target, i) {
    let title = cards[i].title;
    let description = cards[i].description;
    let priority = cards[i].priority;
    let status = cards[i].status;
    let doctor = cards[i].doctor;
    let id = cards[i].id;
    let doctorName = cards[i].content.doctorName;
    // ----
    let lastVisitDate = cards[i].content.lastVisitDate;
    let name = cards[i].content.name;
    target.innerHTML = `<p>doctor:<span>${doctor}</span></p>
<p>name:<span>${name}</span></p>
<p>title:<span>${title}</span></p>
<p>priority:<span>${priority}</span></p>
<p>status:<span>${status}</span></p>
<p>Description:<span>${description}</span></p>
<p>last Visit Date:<span>${lastVisitDate}</span></p>
<p>doctor Name:<span>${doctorName}</span></p>
`;
    const edit = document.createElement('button');
    edit.innerText = 'edit visit';
    edit.dataset.i = i;
    edit.dataset.edit = "edit";
    target.appendChild(edit);
}
}
class cardCardiologist {
    creatAddField(target, i) {
        let title = cards[i].title;
        let description = cards[i].description;
        let priority = cards[i].priority;
        let status = cards[i].status;
        let doctor = cards[i].doctor;
        let id = cards[i].id;
        let doctorName = cards[i].content.doctorName;
        // ----
        let pressure = cards[i].content.pressure;
        let weightIndex = cards[i].content.weightIndex;
        let age = cards[i].content.age;
        let name = cards[i].content.name;
        target.innerHTML = `<p>doctor:<span>${doctor}</span></p>
<p>name:<span>${name}</span></p>
<p>title:<span>${title}</span></p>
<p>priority:<span>${priority}</span></p>
<p>status:<span>${status}</span></p>
<p>Description:<span>${description}</span></p>
<p>pressure:<span>${pressure}</span></p>
<p>weight Index:<span>${weightIndex}</span></p>
<p>age:<span>${age}</span></p>
<p>doctor Name:<span>${doctorName}</span></p>
`;
        const edit = document.createElement('button');
        edit.innerText = 'edit visit';
        edit.dataset.i = i;
        edit.dataset.edit = "edit";
        target.appendChild(edit);
    }
}

class cardTherapist {
    creatAddField(target, i) {
        let title = cards[i].title;
        let description = cards[i].description;
        let priority = cards[i].priority;
        let status = cards[i].status;
        let doctor = cards[i].doctor;
        let id = cards[i].id;
        let doctorName = cards[i].content.doctorName;
        // ----
        let age = cards[i].content.age;
        let name = cards[i].content.name;
        target.innerHTML = `<p>doctor:<span>${doctor}</span></p>
<p>name:<span>${name}</span></p>
<p>title:<span>${title}</span></p>
<p>priority:<span>${priority}</span></p>
<p>status:<span>${status}</span></p>
<p>Description:<span>${description}</span></p>
<p>age:<span>${age}</span></p>
<p>doctor Name:<span>${doctorName}</span></p>
`;
        const edit = document.createElement('button');
        edit.innerText = 'edit visit';
        edit.dataset.i = i;
        edit.dataset.edit = "edit";
        target.appendChild(edit);
    }
}

visitCard.prototype.firstCreat();
visitCard.prototype.creatCard();
document.body.addEventListener('submit', () => {
    console.log(cards[0].doctor);
    visitCard.prototype.creatCard();
});
cardsCaban.addEventListener('click', (e) => {
   if (e.target.dataset.doctor == "dentist") {
       console.log(e.path[1]);
       let parentCard = e.path[1];
       let currentVisit = e.path[1].dataset.position;
       console.log(currentVisit);
       cardDantist.prototype.creatAddField(parentCard, currentVisit);
   }
    if (e.target.dataset.doctor == "cardiologist") {
        console.log(e.path[1]);
        let parentCard = e.path[1];
        let currentVisit = e.path[1].dataset.position;
        cardCardiologist.prototype.creatAddField(parentCard, currentVisit);
    }
    if (e.target.dataset.doctor == "therapist") {
        console.log(e.path[1]);
        let parentCard = e.path[1];
        let currentVisit = e.path[1].dataset.position;
        cardTherapist.prototype.creatAddField(parentCard, currentVisit);
    }
    if(e.target.dataset.edit) {
        console.log("dddd");
        let i = e.path[1].dataset.position;
        new Modal('edit').render();
        let autoevent = new Event ('submit');
        const selected = e.target.dataset.doctor;
        // const selectedDoctor = document.getElementById("selectDoctor");
        selectedDoctor.value = 'selected';
        selectedDoctor.dispatchEvent(autoevent);
        // const editModal = new Modal;
        // editModal.createForm();
        const visitDentist = new FormDentist(data[i].value, data[1].value, data[0].value, data[2].value, data[4].value, data[3].value, data[5].value, data[7].value,)
        console.log(visitDentist);
        new FormDentist().submitForm(visitDentist);
    }
});