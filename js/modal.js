initialize();

function initialize() {
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', () => {
        new Modal('login').render();
    });

    const createCard = document.getElementById('createCardBtn');
    createCard.addEventListener('click', () => {
        new Modal('newCard').render();
    });

}

class Modal {
    constructor(type) {
        this.type = type;
        this.modal = document.createElement('div');
        this.overlap = document.createElement('div');
        this.modalTitle = document.createElement('h3');
        this.modalForm = document.createElement('form');
    }

    render() {
        this.modal.classList.add('modal');
        this.overlap.id = 'overlap';
        document.getElementById('main').append(this.overlap);
        this.modalTitle.classList.add('modal-title');
        this.modal.append(this.modalTitle);
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('modal-close-btn');
        this.modal.append(closeBtn);
        closeBtn.addEventListener('click', () => {
            this.modal.remove();
            this.overlap.remove();
        });
        this.overlap.addEventListener('click', () => {
            this.modal.remove();
            this.overlap.remove();
        });
        document.getElementById('main').append(this.modal);

        if (this.type === "login") {
            this.login();
        } else if (this.type === "newCard") {
            this.createForm();
        } else if (this.type === "edit") {
            this.editForm();
        }

    }

    login() {
        this.modalTitle.innerText = 'Авторизация';
        this.modalForm.id = 'modal-form';
        const loginLabel = document.createElement('label');
        loginLabel.innerText = 'e-mail: ';
        const loginInput = document.createElement('input');
        loginInput.type = 'email';
        loginInput.id = 'email';
        // auto Value
        loginInput.value = 'alexandr.sugak@gmail.com';
        // auto Value
        this.modalForm.append(loginLabel);
        this.modalForm.append(loginInput);
        const passwordLabel = document.createElement('label');
        passwordLabel.innerText = 'password: ';
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.id = 'password';
        // auto Value
        passwordInput.value = 'tree00';
        // auto Value
        this.modalForm.append(passwordLabel);
        this.modalForm.append(passwordInput);
        const loginBtn = document.createElement('input');
        loginBtn.type = 'submit';
        loginBtn.value = 'Войти';
        loginBtn.classList.add('form-button');
        this.modalForm.append(loginBtn);
        this.modal.append(this.modalForm);
        this.modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitLogin();
        })
    }

    submitLogin() {
        const modal = this.modal;
        const overlap = this.overlap;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const data = {
            email: email,
            password: password
        };
        const authOptions = {
            method: 'POST',
            url: 'http://cards.danit.com.ua/login',
            data: JSON.stringify(data),
        };

        axios(authOptions)
            .then(function (response) {
                if (response.data.status === "Success") {
                    authToken = response.data.token;
                    console.log(authToken);
                    authConfig = {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    };
                    modal.remove();
                    document.getElementById('overlap').remove();
                    document.getElementById('loginBtn').classList.replace('disp-block', "disp-none");
                    document.getElementById('createCardBtn').classList.replace('disp-none', "disp-block");
                    document.getElementById('filter-submit').removeAttribute('disabled');
                    getAllCards();
                } else {
                    alert(`${response.data.status}: ${response.data.text}`);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    createForm() {
        this.modal.append(this.modalForm);
        this.modalTitle.innerText = 'Новый визит';
        this.modalForm.id = 'new-card';

        const selectDoctor = document.createElement('select');
        selectDoctor.name = 'doctor';
        selectDoctor.id = 'selectDoctor';
        selectDoctor.required = true;
        this.modalForm.append(selectDoctor);
        const selectOption = document.createElement('option');
        selectOption.disabled = true;
        selectOption.selected = true;
        selectOption.innerText = 'Выберите врача';
        selectDoctor.append(selectOption);
        const cardiologistOption = document.createElement('option');
        cardiologistOption.value = 'cardiologist';
        cardiologistOption.innerText = 'Кардиолог';
        selectDoctor.append(cardiologistOption);
        const dentistOption = document.createElement('option');
        dentistOption.value = 'dentist';
        dentistOption.innerText = 'Стоматолог';
        selectDoctor.append(dentistOption);
        const therapistOption = document.createElement('option');
        therapistOption.value = 'therapist';
        therapistOption.innerText = 'Терапевт';
        selectDoctor.append(therapistOption);

        const optionalInputs = document.createElement('fieldset');
        optionalInputs.id = 'optionalInputs';
        this.modalForm.append(optionalInputs);

        const createNewCardBtn = document.createElement('input');
        createNewCardBtn.type = 'submit';
        createNewCardBtn.id = 'create-new-card-btn';
        createNewCardBtn.value = 'Создать';
        createNewCardBtn.classList.add('create-new-card-btn');

        modalNewVisit();
        this.modalForm.append(createNewCardBtn);
    }

    editForm() {
        this.modal.append(this.modalForm);
        this.modalTitle.innerText = 'Редактировать визит';
        this.modalForm.id = 'edit-card';

        const optionalInputs = document.createElement('fieldset');
        optionalInputs.id = 'optionalInputs';
        this.modalForm.append(optionalInputs);

        const editCardBtn = document.createElement('input');
        editCardBtn.type = 'submit';
        editCardBtn.id = 'edit-card-btn';
        editCardBtn.value = 'Изменить';
        editCardBtn.classList.add('edit-card-btn');


        // editCard();
        this.modalForm.append(editCardBtn);
    }
}

function getAllCards() {
    axios.get("http://cards.danit.com.ua/cards", authConfig).then(function (response) {
        if (response.status === 200) {
            cards = response.data;
            creatCards(cards);
            console.log(cards);
        } else {
            alert(`${response.status}: ${response.statusText}`);
        }
    })
        .catch(function (error) {
            console.log(error);
        });
}
