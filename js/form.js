class Input {
    constructor(tagName, name, id, placeholder = null) {
        this.el = document.createElement(tagName);
        this.el.name = name;
        this.el.id = id;
        this.el.placeholder = placeholder;
    }

    createInput(form) {
        form.append(this.el)
    }
}

class requiredInput extends Input {
    constructor(required, ...args) {
        super(...args);
        this.el.required = required;
    }
}

class Form {
    constructor(cardObject = {content: {}}) {
        this.id = cardObject.id || "";
        this.client = cardObject.content.name || "";
        this.goal = cardObject.title || "";
        this.status = cardObject.status || "";
        this.urgency = cardObject.priority || "";
        this.doctor = cardObject.doctor || "";
        this.doctorName = cardObject.content.doctorName || "";
        this.summary = cardObject.description || "";
        this.content = cardObject.content;
    }

    createInputs(form) {
        form.innerHTML = "";

        const nameInputLabel = document.createElement("label");
        nameInputLabel.innerText = "Пациент: ";

        const nameInput = new requiredInput("true", "input", "name", "clientName", "ФИО");
        nameInput.createInput(nameInputLabel);
        nameInput.el.value = this.client;

        const goalInputLabel = document.createElement("label");
        goalInputLabel.innerText = "Цель визита: ";

        const goalInput = new requiredInput("true", "input", "goal", "goalId", "Обследование");
        goalInput.createInput(goalInputLabel);
        goalInput.el.value = this.goal;

        const urgencySelect = document.createElement("select");
        urgencySelect.name = "urgency";
        urgencySelect.setAttribute("required", "true");
        const urgencyLevelHigh = document.createElement("option");
        urgencyLevelHigh.innerText = "Высокая";
        if (this.urgency === "Высокая") {
            urgencyLevelHigh.selected = true;
        }
        const urgencyLevelMedium = document.createElement("option");
        urgencyLevelMedium.innerText = "Средняя";
        if (this.urgency === "Средняя") {
            urgencyLevelMedium.selected = true;
        }
        const urgencyLevelLow = document.createElement("option");
        urgencyLevelLow.innerText = "Низкая";
        if (this.urgency === "Низкая") {
            urgencyLevelLow.selected = true;
        }

        urgencySelect.append(urgencyLevelHigh, urgencyLevelMedium, urgencyLevelLow);
        const urgencySelectLabel = document.createElement("label");
        urgencySelectLabel.innerText = "Срочность: ";
        urgencySelectLabel.append(urgencySelect);

        const statusSelect = document.createElement("select");
        statusSelect.setAttribute("required", "true");
        statusSelect.name = "status";

        const statusOpen = document.createElement("option");
        statusOpen.value = "open";
        statusOpen.innerText = "Открыт";
        if (this.status === "open") {
            statusOpen.selected = true;
        }
        const statusDone = document.createElement("option");
        statusDone.value = "done";
        statusDone.innerText = "Закрыт";
        if (this.status === "done") {
            statusDone.selected = true;
        }

        statusSelect.append(statusOpen, statusDone);
        const statusSelectLabel = document.createElement("label");
        statusSelectLabel.innerText = "Статус: ";
        statusSelectLabel.append(statusSelect);

        const summaryInputLabel = document.createElement("label");
        summaryInputLabel.innerText = "Краткое описание: ";

        const summaryInput = new Input("textarea", "summary", "summaryId", "Пациента беспокоит...");
        summaryInput.createInput(summaryInputLabel);
        summaryInput.el.value = this.summary;

        form.append(nameInputLabel, goalInputLabel, urgencySelectLabel, statusSelectLabel, summaryInputLabel);
    }

    submitForm() {
        const object = {
            doctor: this.doctor,
            title: this.goal,
            description: this.summary,
            status: this.status,
            priority: this.urgency,
            content: this.content
        };

        const dat = JSON.stringify(object);

        console.log(object);
        console.log(authConfig);

        axios.post("http://cards.danit.com.ua/cards", dat, authConfig).then(function (response) {
            if (response.status === 200) {
                console.log(response.data.id);
                object.id = response.data.id;
                cards.push(object);
                // console.log(object);
                // console.log(cards);
                document.getElementById('overlap').remove();
                $("#new-card").parent().remove();
            } else {
                alert(`${response.status}: ${response.statusText}`);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    editObjectFromCards(cardId, index) {
        const object = {
            doctor: this.doctor,
            title: this.goal,
            description: this.summary,
            status: this.status,
            priority: this.urgency,
            content: this.content
        };

        const dat = JSON.stringify(object);

        console.log(object);
        console.log(cardId);
        console.log(index);

        axios.put(`http://cards.danit.com.ua/cards/${cardId}`, dat, authConfig).then(function (response) {
            if (response.status === 200) {
                console.log(response.data);
                cards[index] = response.data;
                document.getElementById('overlap').remove();
                $("#edit-card").parent().remove();
                filtred = {};
                creatCards(cards);
            } else {
                alert(`${response.status}: ${response.statusText}`);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }
}

class FormDentist extends Form {
    constructor(cardObject = {content: {}}) {
        super(cardObject);
        this.lastVisitDate = cardObject.content.lastVisitDate || "";
        this.content = {name: this.client, lastVisitDate: this.lastVisitDate, doctorName: this.doctorName};
    }

    createInputs(form) {
        super.createInputs(form);
        const lastVisitDateInputLabel = document.createElement("label");
        lastVisitDateInputLabel.innerText = "Дата последнего посещения: ";

        const lastVisitDateInput = new requiredInput("true", "input", "lastVisit", "lastVisitId", "01.01.2019");
        lastVisitDateInput.createInput(lastVisitDateInputLabel);
        lastVisitDateInput.el.value = this.content.lastVisitDate;

        const dentists = document.createElement("select");
        dentists.name = "dentist";
        dentists.setAttribute("required", "true");

        const dentist1 = document.createElement("option");
        dentist1.innerText = "Иванов А.И.";
        if (this.doctorName === "Иванов А.И.") {
            dentist1.selected = true;
        }

        const dentist2 = document.createElement("option");
        dentist2.innerText = "Петров И.И.";
        if (this.doctorName === "Петров И.И.") {
            dentist2.selected = true;
        }

        const dentist3 = document.createElement("option");
        dentist3.innerText = "Сидоров О.О.";
        if (this.doctorName === "Сидоров О.О.") {
            dentist3.selected = true;
        }

        dentists.append(dentist1, dentist2, dentist3);
        const dentistsLabel = document.createElement("label");
        dentistsLabel.innerText = "Лечащий врач: ";
        dentistsLabel.append(dentists);

        form.append(lastVisitDateInputLabel, dentistsLabel);
    }
}

class FormCardiologist extends Form {
    constructor(cardObject = {content: {}}) {
        super(cardObject);
        this.pressure = cardObject.content.pressure || "";
        this.weightIndex = cardObject.content.weightIndex || "";
        this.illness = cardObject.content.illness || "";
        this.age = cardObject.content.age || "";
        this.content = {
            name: this.client,
            pressure: this.pressure,
            weightIndex: this.weightIndex,
            illness: this.illness,
            age: this.age,
            doctorName: this.doctorName
        };
    }

    createInputs(form) {
        super.createInputs(form);
        const pressureInputLabel = document.createElement("label");
        pressureInputLabel.innerText = "Обычное давление: ";

        const pressureInput = new requiredInput("true", "input", "pressure", "pressureId", "../..");
        pressureInput.createInput(pressureInputLabel);
        pressureInput.el.value = this.pressure;

        const illnessInputLabel = document.createElement("label");
        illnessInputLabel.innerText = "Перенесенные заболевания: ";

        const illnessInput = new requiredInput("true", "input", "illness", "illnessId", "...");
        illnessInput.createInput(illnessInputLabel);
        illnessInput.el.value = this.illness;

        const weightIndexInputLabel = document.createElement("label");
        weightIndexInputLabel.innerText = "Индекс массы тела: ";

        const weightIndexInput = new requiredInput("true", "input", "weightIndex", "weightIndexId", "25");
        weightIndexInput.type = "number";
        weightIndexInput.createInput(weightIndexInputLabel);
        weightIndexInput.el.value = this.weightIndex;

        const ageInputLabel = document.createElement("label");
        ageInputLabel.innerText = "Возраст пациента: ";

        const ageInput = new requiredInput("true", "input", "age", "clientAgeId", "50");
        ageInput.type = "number";
        ageInput.createInput(ageInputLabel);
        ageInput.el.value = this.age;

        const cardiologists = document.createElement("select");
        cardiologists.name = "cardiologist";
        cardiologists.setAttribute("required", "true");

        const cardiologist1 = document.createElement("option");
        cardiologist1.innerText = "Иваненко И.И.";
        if (this.doctorName === "Иваненко И.И.") {
            cardiologist1.selected = true;
        }

        const cardiologist2 = document.createElement("option");
        cardiologist2.innerText = "Петренко А.И.";
        if (this.doctorName === "Петренко А.И.") {
            cardiologist2.selected = true;
        }

        const cardiologist3 = document.createElement("option");
        cardiologist3.innerText = "Сидоренко Р.О.";
        if (this.doctorName === "Сидоренко Р.О.") {
            cardiologist3.selected = true;
        }

        cardiologists.append(cardiologist1, cardiologist2, cardiologist3);
        const cardiologistsLabel = document.createElement("label");
        cardiologistsLabel.innerText = "Лечащий врач: ";
        cardiologistsLabel.append(cardiologists);

        form.append(pressureInputLabel, illnessInputLabel, weightIndexInputLabel, ageInputLabel, cardiologistsLabel);
    }
}

class FormTherapist extends Form {
    constructor(cardObject = {content: {}}) {
        super(cardObject);
        this.age = cardObject.content.age || "";
        this.content = {name: this.client, age: this.age, doctorName: this.doctorName};
    }

    createInputs(form) {
        super.createInputs(form);
        const ageInputLabel = document.createElement("label");
        ageInputLabel.innerText = "Возраст пациента: ";

        const ageInput = new requiredInput("true", "input", "age", "ageId", "30");
        ageInput.type = "number";
        ageInput.createInput(ageInputLabel);
        ageInput.el.value = this.age;

        const therapists = document.createElement("select");
        therapists.name = "therapist";
        therapists.setAttribute("required", "true");

        const therapist1 = document.createElement("option");
        therapist1.innerText = "Иванющенко В.И.";
        if (this.doctorName === "Иванющенко В.И.") {
            therapist1.selected = true;
        }

        const therapist2 = document.createElement("option");
        therapist2.innerText = "Мурило С.И.";
        if (this.doctorName === "Мурило С.И.") {
            therapist2.selected = true;
        }

        therapists.append(therapist1, therapist2);
        const therapistsLabel = document.createElement("label");
        therapistsLabel.innerText = "Лечащий врач: ";
        therapistsLabel.append(therapists);

        form.append(ageInputLabel, therapistsLabel);
    }
}

function modalNewVisit() {
    const optionalInputs = document.getElementById("optionalInputs");
    const selectedDoctor = document.getElementById("selectDoctor");
    selectedDoctor.addEventListener("change", (e) => {
        switch (e.currentTarget.value) {
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

    $("#new-card").on("submit", function (e) {
        e.preventDefault();
        const data = ($(this).serializeArray());
        // console.log(data);
        // console.log(authToken);
        const object = {
            doctor: data[0].value,
            title: data[2].value,
            description: data[5].value,
            status: data[4].value,
            priority: data[3].value,
        };
        switch (selectedDoctor.value) {
            case "cardiologist":
                object.content = {
                    name: data[1].value,
                    pressure: data[6].value,
                    weightIndex: data[8].value,
                    illness: data[7].value,
                    age: data[9].value,
                    doctorName: data[10].value,
                };
                new FormCardiologist(object).submitForm();
                break;
            case "dentist":
                object.content = {
                    name: data[1].value,
                    lastVisitDate: data[6].value,
                    doctorName: data[7].value,
                };
                new FormDentist(object).submitForm();
                break;
            case "therapist":
                object.content = {
                    name: data[1].value,
                    age: data[6].value,
                    doctorName: data[7].value,
                };
                new FormTherapist(object).submitForm();
                break;
        }
    })
}

function editCardObject(objectToEdit, index) {
    $("#edit-card").on("submit", function (e) {
        e.preventDefault();
        const data = ($(this).serializeArray());
        const object = {
            doctor: objectToEdit.doctor,
            title: data[1].value,
            description: data[4].value,
            status: data[3].value,
            priority: data[2].value,
        };
        switch (objectToEdit.doctor) {
            case "cardiologist":
                object.content = {
                    name: data[0].value,
                    pressure: data[5].value,
                    weightIndex: data[7].value,
                    illness: data[6].value,
                    age: data[8].value,
                    doctorName: data[9].value,
                };
                console.log(objectToEdit.id);
                new FormCardiologist(object).editObjectFromCards(objectToEdit.id, index);
                break;
            case "dentist":
                object.content = {
                    name: data[0].value,
                    lastVisitDate: data[5].value,
                    doctorName: data[6].value,
                };
                console.log(objectToEdit.id);
                new FormDentist(object).editObjectFromCards(objectToEdit.id, index);
                break;
            case "therapist":
                object.content = {
                    name: data[0].value,
                    age: data[5].value,
                    doctorName: data[6].value,
                };
                console.log(objectToEdit.id);
                new FormTherapist(object).editObjectFromCards(objectToEdit.id, index);
                break;
        }
    })
}

