
class Visit {
    constructor(client = null, doctor = null, goal = null, status = null, urgency = null, summary = null, doctorName = null, id = null) {
        this.id = id;
        this.client = client;
        this.goal = goal;
        this.status = status;
        this.urgency = urgency;
        this.doctor = doctor;
        this.doctorName = doctorName;
        this.summary = summary;
    }
    createInputs(form) {
        form.innerHTML = "";

        const nameInput = document.createElement("input");
        nameInput.value = this.client;
        nameInput.name = "name";
        nameInput.id = "clientName";
        nameInput.placeholder = "ФИО";
        nameInput.setAttribute("required", "true");
        // nameInput.classList.add("new-visit-input");

        const nameInputLabel = document.createElement("label");
        nameInputLabel.innerText = "Пациент: ";
        nameInputLabel.append(nameInput);

        const goalInput = document.createElement("input");
        goalInput.value = this.goal;
        goalInput.name = "goal";
        goalInput.id = "goalId";
        goalInput.placeholder = "Обследование";
        goalInput.setAttribute("required", "true");
        const goalInputLabel = document.createElement("label");
        goalInputLabel.innerText = "Цель визита: ";
        goalInputLabel.append(goalInput);

        const urgencySelect = document.createElement("select");
        urgencySelect.value = this.urgency;
        urgencySelect.name = "urgency";
        urgencySelect.setAttribute("required", "true");
        const urgencyLevelHigh = document.createElement("option");
        urgencyLevelHigh.innerText = "Высокая";
        const urgencyLevelMedium = document.createElement("option");
        urgencyLevelMedium.innerText = "Средняя";
        const urgencyLevelLow = document.createElement("option");
        urgencyLevelLow.innerText = "Низкая";
        urgencySelect.append(urgencyLevelHigh, urgencyLevelMedium, urgencyLevelLow);
        const urgencySelectLabel = document.createElement("label");
        urgencySelectLabel.innerText = "Срочность: ";
        urgencySelectLabel.append(urgencySelect);

        const statusSelect = document.createElement("select");

        statusSelect.setAttribute("required", "true");
        statusSelect.value = this.status;
        statusSelect.name = "status";
        const statusOpen = document.createElement("option");
        statusOpen.innerText = "Открыт";
        const statusDone = document.createElement("option");
        statusDone.innerText = "Закрыт";
        statusSelect.append(statusOpen, statusDone);
        const statusSelectLabel = document.createElement("label");
        statusSelectLabel.innerText = "Срочность: ";
        statusSelectLabel.append(statusSelect);


        const summaryInput = document.createElement("textarea");
        summaryInput.value = this.summary;
        summaryInput.name = "summary";
        summaryInput.id = "summaryId";
        summaryInput.placeholder = "Пациента беспокоит...";
        const summaryInputLabel = document.createElement("label");
        summaryInputLabel.innerText = "Краткое описание: ";
        summaryInputLabel.append(summaryInput);

        form.append(nameInputLabel, goalInputLabel, urgencySelectLabel,  statusSelectLabel, summaryInputLabel);
    }
}

class VisitToDentist extends Visit {
    constructor(lastVisitDate = "",...args){
        super(...args);
        this.lastVisitDate = lastVisitDate;
        this.content = {name: this.client, lastVisitDate: this.lastVisitDate, doctorName: this.doctorName};
    }
    createInputs(form) {
        super.createInputs(form);
        const lastVisitDateInput = document.createElement("input");
        lastVisitDateInput.value = this.content.lastVisitDate;
        lastVisitDateInput.name = "lastVisit";
        lastVisitDateInput.id = "lastVisitId";
        lastVisitDateInput.placeholder = "01.01.2019";
        lastVisitDateInput.setAttribute("required", "true");
        const lastVisitDateInputLabel = document.createElement("label");
        lastVisitDateInputLabel.innerText = "Дата последнего посещения: ";
        lastVisitDateInputLabel.append(lastVisitDateInput);

        const dentists = document.createElement("select");
        dentists.name = "dentist";
        dentists.setAttribute("required", "true");
        const dentist1 = document.createElement("option");
        dentist1.innerText = "Иванов А.И.";
        const dentist2 = document.createElement("option");
        dentist2.innerText = "Петров И.И.";
        const dentist3 = document.createElement("option");
        dentist3.innerText = "Сидоров О.О.";
        dentists.append(dentist1, dentist2, dentist3);
        const dentistsLabel = document.createElement("label");
        dentistsLabel.innerText = "Лечащий врач: ";
        dentistsLabel.append(dentists);

        form.append(lastVisitDateInputLabel, dentistsLabel);
    }
    submitForm() {
        $("#new-card").on("submit", function(e){
            e.preventDefault();
            const data = ($(this).serializeArray());
            console.log(data);
            const visit = new VisitToDentist(data[6].value, data[1].value, data[0].value, data[2].value, data[4].value, data[3].value, data[5].value, data[7].value,)
            console.log(visit);
            const object = {
                doctor: visit.doctor,
                title: visit.goal,
                description: visit.summary,
                status: visit.status,
                priority: visit.urgency,
                content: JSON.stringify(visit.content)
            };
            cards.push(object);
            console.log(cards);
        })

    }
}

class VisitToCardiologist extends Visit {
    constructor(pressure = "", weightIndex ="", illness = "", age = "",...args){
        super(...args);
        this.pressure = pressure;
        this.weightIndex = weightIndex;
        this.illness = illness;
        this.age = age;
        this.content = {name: this.client, pressure: this.pressure, weightIndex: this.weightIndex, illness: this.illness, age: this.age, doctorName: this.doctorName};
    }
    createInputs(form) {
        super.createInputs(form);
        const pressureInput = document.createElement("input");
        pressureInput.value = this.pressure;
        pressureInput.name = "pressure";
        pressureInput.id = "pressureId";
        pressureInput.setAttribute("required", "true");
        pressureInput.placeholder = "../..";
        const pressureInputLabel = document.createElement("label");
        pressureInputLabel.innerText = "Обычное давление: ";
        pressureInputLabel.append(pressureInput);

        const illnessInput = document.createElement("input");
        illnessInput.value = this.illness;
        illnessInput.name = "illness";
        illnessInput.id = "illnessId";
        illnessInput.setAttribute("required", "true");
        illnessInput.placeholder = "...";
        const illnessInputLabel = document.createElement("label");
        illnessInputLabel.innerText = "Перенесенные заболевания: ";
        illnessInputLabel.append(illnessInput);

        const weightIndexInput = document.createElement("input");
        weightIndexInput.value = this.weightIndex;
        weightIndexInput.name = "weightIndex";
        weightIndexInput.id = "weightIndexId";
        weightIndexInput.type = "number";
        weightIndexInput.placeholder = "25";
        const  weightIndexInputLabel = document.createElement("label");
        weightIndexInputLabel.innerText = "Индекс массы тела: ";
        weightIndexInputLabel.append(weightIndexInput);

        const ageInput = document.createElement("input");
        ageInput.value = this.age;
        ageInput.name = "age";
        ageInput.id = "clientAgeId";
        ageInput.type = "number";
        ageInput.placeholder = "30";
        const ageInputLabel = document.createElement("label");
        ageInputLabel.innerText = "Возраст пациента: ";
        ageInputLabel.append(ageInput);

        const cardiologists = document.createElement("select");
        cardiologists.name = "cardiologist";
        cardiologists.setAttribute("required", "true");
        const cardiologist1 = document.createElement("option");
        cardiologist1.innerText = "Иваненко И.И.";
        const cardiologist2 = document.createElement("option");
        cardiologist2.innerText = "Петренко А.И.";
        const cardiologist3 = document.createElement("option");
        cardiologist3.innerText = "Сидоренко Р.О.";
        cardiologists.append(cardiologist1, cardiologist2, cardiologist3);
        const cardiologistsLabel = document.createElement("label");
        cardiologistsLabel.innerText = "Лечащий врач: ";
        cardiologistsLabel.append(cardiologists);

        form.append(pressureInputLabel, illnessInputLabel, weightIndexInputLabel, ageInputLabel, cardiologistsLabel);
    }
    submitForm(){
        $("#new-card").on("submit", function(e){
            e.preventDefault();
            const data = ($(this).serializeArray());
            console.log(data);
            const visit = new VisitToCardiologist(data[6].value, data[8].value, data[7].value, data[9].value, data[1].value, data[0].value, data[2].value, data[4].value, data[3].value, data[5].value, data[10].value)
            console.log(visit);
            const object = {
                doctor: visit.doctor,
                title: visit.goal,
                description: visit.summary,
                status: visit.status,
                priority: visit.urgency,
                content: JSON.stringify(visit.content)
            };
            cards.push(object);
            console.log(cards);
        })
    }
}

class VisitToTherapist extends Visit {
    constructor(age,...args){
        super(...args);
        this.age = age;
        this.content = {name: this.client, age: this.age, doctorName: this.doctorName};
    }
    createInputs(form) {
        super.createInputs(form);
        const ageInput = document.createElement("input");
        ageInput.value = this.age;
        ageInput.name = "age";
        ageInput.id = "ageId";
        ageInput.type = "number";
        ageInput.placeholder = "30";
        const ageInputLabel = document.createElement("label");
        ageInputLabel.innerText = "Возраст пациента: ";
        ageInputLabel.append(ageInput);

        const therapists = document.createElement("select");
        therapists.name = "therapist";
        therapists.setAttribute("required", "true");
        const therapist1 = document.createElement("option");
        therapist1.innerText = "Иванющенко В.И.";
        const therapist2 = document.createElement("option");
        therapist2.innerText = "Мурило С.И.";
        therapists.append(therapist1 ,therapist2);
        const  therapistsLabel = document.createElement("label");
        therapistsLabel.innerText = "Лечащий врач: ";
        therapistsLabel.append(therapists);

        form.append(ageInputLabel, therapistsLabel);
    }

    submitForm(){
        $("#new-card").on("submit", function(e){
            e.preventDefault();
            const data = ($(this).serializeArray());
            console.log(data);
            const visit = new VisitToTherapist(data[6].value, data[1].value, data[0].value, data[2].value, data[4].value, data[3].value, data[5].value, data[7].value,)
            console.log(visit);
            const object = {
                doctor: visit.doctor,
                title: visit.goal,
                description: visit.summary,
                status: visit.status,
                priority: visit.urgency,
                content: JSON.stringify(visit.content)
            };
            cards.push(object);
            console.log(cards);
        })
    }
}


const optionalInputs = document.getElementById("optionalInputs");
const selectedDoctor = document.getElementById("selectDoctor");
selectedDoctor.addEventListener("change", (e)=> {
    if (e.currentTarget.value === "cardiologist") {
        new VisitToCardiologist().createInputs(optionalInputs);
        new VisitToCardiologist().submitForm() ;
    } else if (e.currentTarget.value === "dentist"){
        new VisitToDentist().createInputs(optionalInputs);
        new VisitToDentist().submitForm();
    } else if (e.currentTarget.value === "therapist"){
        new VisitToTherapist().createInputs(optionalInputs);
        new VisitToTherapist().submitForm();
    }
});

const cards = [];