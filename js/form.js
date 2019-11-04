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
        // console.log(object);

        axios.post("http://cards.danit.com.ua/cards", dat, authConfig).then(function (response) {
            if (response.status === 200) {
                // console.log(response.data.id);
                object.id = response.data.id;
                cards.push(object);
                // console.log(object);
                // console.log(cards);
                document.getElementById("overlap").remove();
                document.getElementById("new-card").parentNode.remove();
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
        // console.log(object);
        // console.log(cardId);
        // console.log(index);

        axios.put(`http://cards.danit.com.ua/cards/${cardId}`, dat, authConfig).then(function (response) {
            if (response.status === 200) {
                // console.log(response.data);
                cards[index] = response.data;
                document.getElementById("overlap").remove();
                document.getElementById("edit-card").parentNode.remove();
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
        document.getElementById('create-new-card-btn').classList.replace('disp-none', 'disp-block');
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
    const newCardForm = document.getElementById("new-card");
    newCardForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = serializeForm(newCardForm);
        // console.log(data);
        const object = {
            doctor: data[0],
            title: data[2],
            description: data[5],
            status: data[4],
            priority: data[3],
        };
        switch (selectedDoctor.value) {
            case "cardiologist":
                object.content = {
                    name: data[1],
                    pressure: data[6],
                    weightIndex: data[8],
                    illness: data[7],
                    age: data[9],
                    doctorName: data[10],
                };
                new FormCardiologist(object).submitForm();
                break;
            case "dentist":
                object.content = {
                    name: data[1],
                    lastVisitDate: data[6],
                    doctorName: data[7],
                };
                new FormDentist(object).submitForm();
                break;
            case "therapist":
                object.content = {
                    name: data[1],
                    age: data[6],
                    doctorName: data[7],
                };
                new FormTherapist(object).submitForm();
                break;
        }
    });
}

function editCardObject(objectToEdit, index) {
    const editCardForm = document.getElementById("edit-card");
    editCardForm.addEventListener("submit" , function (e) {
        e.preventDefault();
        const data = serializeForm(editCardForm);
        // console.log(data);
        const object = {
            doctor: objectToEdit.doctor,
            title: data[1],
            description: data[4],
            status: data[3],
            priority: data[2],
        };
        switch (objectToEdit.doctor) {
            case "cardiologist":
                object.content = {
                    name: data[0],
                    pressure: data[5],
                    weightIndex: data[7],
                    illness: data[6],
                    age: data[8],
                    doctorName: data[9],
                };
                // console.log(objectToEdit.id);
                new FormCardiologist(object).editObjectFromCards(objectToEdit.id, index);
                break;
            case "dentist":
                object.content = {
                    name: data[0],
                    lastVisitDate: data[5],
                    doctorName: data[6],
                };
                // console.log(objectToEdit.id);
                new FormDentist(object).editObjectFromCards(objectToEdit.id, index);
                break;
            case "therapist":
                object.content = {
                    name: data[0],
                    age: data[5],
                    doctorName: data[6],
                };
                // console.log(objectToEdit.id);
                new FormTherapist(object).editObjectFromCards(objectToEdit.id, index);
                break;
        }
    });
};

function serializeForm(form) {
    const serialized = [];
    for (let i = 0; i < form.elements.length; i++) {
        let field = form.elements[i];
        if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
        if (field.type === 'select-multiple') {
            for (let n = 0; n < field.options.length; n++) {
                if (!field.options[n].selected) continue;
                serialized.push(`${field.options[n].value}`);
            }
        }
        else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
            serialized.push(`${field.value}`);
        }
    }
    return serialized;
}

