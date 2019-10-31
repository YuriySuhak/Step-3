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
        this.modalTitle = document.createElement('h3');
    }

    render() {
        this.modal.classList.add('modal');
        this.modalTitle.classList.add('modal-title');
        this.modal.append(this.modalTitle);
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('modal-close-btn');
        this.modal.append(closeBtn);
        closeBtn.addEventListener('click', () => {
            this.modal.remove();
        });
        document.getElementById('main').append(this.modal);

        if (this.type === "login") {
            this.login();
        } else if (this.type === "newCard") {
            this.createForm();
        }

    }

    login() {
        this.modalTitle.innerText = 'Log in';
        const modalForm = document.createElement('form');
        modalForm.id = 'modal-form';
        const loginLabel = document.createElement('label');
        loginLabel.innerText = 'email: ';
        const loginInput = document.createElement('input');
        loginInput.type = 'email';
        loginInput.id = 'email';
        // auto Value
        loginInput.value = 'alexandr.sugak@gmail.com';
        // auto Value
        loginLabel.append(loginInput);
        modalForm.append(loginLabel);
        const passwordLabel = document.createElement('label');
        passwordLabel.innerText = 'password: ';
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.id = 'password';
        // auto Value
        passwordInput.value = 'tree00';
        // auto Value
        passwordLabel.append(passwordInput);
        modalForm.append(passwordLabel);
        const loginBtn = document.createElement('input');
        loginBtn.type = 'submit';
        loginBtn.value = 'Login';
        loginBtn.classList.add('form-button');
        modalForm.append(loginBtn);
        this.modal.append(modalForm);
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitLogin();
        })
    }

    submitLogin() {
        const modal = this.modal;
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
                    loginBtn.classList.replace('disp-block', "disp-none");
                    createCard.classList.replace('disp-none', "disp-block");
                } else {
                    alert(`${response.data.status}: ${response.data.text}`);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    createForm() {
        this.modalTitle.innerText = 'New Card';
        const modalForm = document.createElement('form');
        modalForm.id = 'new-card';
        this.modal.append(modalForm);
        const selectDoctor = document.createElement('select');
        selectDoctor.name = 'doctor';
        selectDoctor.id = 'selectDoctor';
        selectDoctor.required = true;
        modalForm.append(selectDoctor);
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
        modalForm.append(optionalInputs);

        const createNewCardBtn = document.createElement('input');
        createNewCardBtn.type = 'submit';
        createNewCardBtn.id = 'create-new-card-btn';
        createNewCardBtn.value = 'Create';
        createNewCardBtn.classList.add('create-new-card-btn');

        modalNewVisit();
        modalForm.append(createNewCardBtn);
    }
}
