class Input {
    constructor(tagName, name, id, placeholder = null) {
        this.el = document.createElement(tagName);
        this.el.name = name;
        this.el.id = id;
        this.el.placeholder = placeholder;
    }
    createInput(form){
        form.append(this.el)
    }
}

class requiredInput extends Input{
    constructor(required,...args){
        super(...args);
        this.el.required = required;
    }
}

class Form {
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

        const nameInputLabel = document.createElement("label");
        nameInputLabel.innerText = "Пациент: ";

        const nameInput = new requiredInput( "true", "input", "name", "clientName","ФИО");
        nameInput.createInput(nameInputLabel);
        nameInput.value = this.client;
        // nameInput.classList.add("new-visit-input");

        const goalInputLabel = document.createElement("label");
        goalInputLabel.innerText = "Цель визита: ";

        const goalInput = new requiredInput("true","input", "goal", "goalId", "Обследование");
        goalInput.createInput(goalInputLabel);
        goalInput.value = this.goal;

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

        const summaryInputLabel = document.createElement("label");
        summaryInputLabel.innerText = "Краткое описание: ";

        const summaryInput = new Input("textarea", "summary","summaryId", "Пациента беспокоит...");
        summaryInput.createInput(summaryInputLabel);
        summaryInput.value = this.summary;

        form.append(nameInputLabel, goalInputLabel, urgencySelectLabel,  statusSelectLabel, summaryInputLabel);
    }

    submitForm(visit){
        const object = {
            doctor: visit.doctor,
            title: visit.goal,
            description: visit.summary,
            status: visit.status,
            priority: visit.urgency,
            content: visit.content
        };
        cards.push(object);
        console.log(object);
        console.log(cards);
        $("#new-card").parent().remove();
    }
}

class FormDentist extends Form {
    constructor(lastVisitDate = "",...args){
        super(...args);
        this.lastVisitDate = lastVisitDate;
        this.content = {name: this.client, lastVisitDate: this.lastVisitDate, doctorName: this.doctorName};
    }
    createInputs(form) {
        super.createInputs(form);
        const lastVisitDateInputLabel = document.createElement("label");
        lastVisitDateInputLabel.innerText = "Дата последнего посещения: ";

        const lastVisitDateInput = new requiredInput( "true", "input", "lastVisit", "lastVisitId", "01.01.2019");
        lastVisitDateInput.createInput(lastVisitDateInputLabel);
        lastVisitDateInput.value = this.content.lastVisitDate;

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
}

class FormCardiologist extends Form {
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
        const pressureInputLabel = document.createElement("label");
        pressureInputLabel.innerText = "Обычное давление: ";

        const pressureInput =  new requiredInput( "true", "input" , "pressure", "pressureId", "../..");
        pressureInput.createInput(pressureInputLabel);
        pressureInput.value = this.pressure;

        const illnessInputLabel = document.createElement("label");
        illnessInputLabel.innerText = "Перенесенные заболевания: ";

        const illnessInput = new requiredInput( "true", "input" , "illness", "illnessId", "...");
        illnessInput.createInput(illnessInputLabel);
        illnessInput.value = this.illness;

        const  weightIndexInputLabel = document.createElement("label");
        weightIndexInputLabel.innerText = "Индекс массы тела: ";

        const weightIndexInput = new requiredInput( "true", "input" , "weightIndex", "weightIndexId", "25");
        weightIndexInput.type = "number";
        weightIndexInput.createInput(weightIndexInputLabel);
        weightIndexInput.value = this.weightIndex;

        const ageInputLabel = document.createElement("label");
        ageInputLabel.innerText = "Возраст пациента: ";

        const ageInput = new requiredInput( "true", "input" , "age", "clientAgeId", "50");
        ageInput.type = "number";
        ageInput.createInput(ageInputLabel);
        ageInput.value = this.age;

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
}

class FormTherapist extends Form {
    constructor(age,...args){
        super(...args);
        this.age = age;
        this.content = {name: this.client, age: this.age, doctorName: this.doctorName};
    }
    createInputs(form) {
        super.createInputs(form);
        const ageInputLabel = document.createElement("label");
        ageInputLabel.innerText = "Возраст пациента: ";

        const ageInput = new requiredInput( "true", "input" , "age", "ageId", "30");
        ageInput.type = "number";
        ageInput.createInput(ageInputLabel);
        ageInput.value = this.age;

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
}

function modalNewVisit() {
    const optionalInputs = document.getElementById("optionalInputs");
    const selectedDoctor = document.getElementById("selectDoctor");
    selectedDoctor.addEventListener("change", (e)=> {
        switch (e.currentTarget.value){
            case "cardiologist":
                new FormCardiologist().createInputs(optionalInputs);
                break;
            case "dentist":
                new FormDentist().createInputs(optionalInputs);
                break;
            case "therapist":
                new FormTherapist().createInputs(optionalInputs);
                break;
        }
    });

    $("#new-card").on("submit", function(e){
        e.preventDefault();
        const data = ($(this).serializeArray());
        console.log(data);
        switch (selectedDoctor.value) {
            case "cardiologist":
                const visitCardiologist = new FormCardiologist(data[6].value, data[8].value, data[7].value, data[9].value, data[1].value, data[0].value, data[2].value, data[4].value, data[3].value, data[5].value, data[10].value)
                console.log(visitCardiologist);
                new FormCardiologist().submitForm(visitCardiologist);
                break;
            case "dentist":
                const visitDentist = new FormDentist(data[6].value, data[1].value, data[0].value, data[2].value, data[4].value, data[3].value, data[5].value, data[7].value,)
                console.log(visitDentist);
                new FormDentist().submitForm(visitDentist);
                break;
            case "therapist":
                const visitTherapist = new FormTherapist(data[6].value, data[1].value, data[0].value, data[2].value, data[4].value, data[3].value, data[5].value, data[7].value,)
                console.log(visitTherapist);
                new FormTherapist().submitForm(visitTherapist);
                break;
        }
    })
}

