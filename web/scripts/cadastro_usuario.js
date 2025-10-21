const nome = document.getElementById('nome')
const helperName = document.getElementById('helper-nome')
const email = document.getElementById('email')
const helperEmail = document.getElementById('helper-email')
const telefone = document.getElementById('telefone')
const helperTelefone = document.getElementById('helper-telefone')
const data_nascimento = document.getElementById('data_nascimento')
const helperDataNascimento = document.getElementById('helper-data-nascimento')
const senha = document.getElementById('senha')
const helperSenha = document.getElementById('helper-senha')
const confirmaSenha = document.getElementById('confirma-senha')
const helperConfirmaSenha = document.getElementById('helper-confirma-senha')
const button = document.getElementById('button-cadastro')
const fotoPerfil = document.getElementById('foto')
const msgDialog = document.querySelector('#dialog')
const span = msgDialog.getElementsByTagName('span')[0]

function habilitarDesabilitarBotao() {
    let inputError = document.getElementsByClassName('error')
    console.log(inputError)

    if (nome.value !== "" && email.value !== "" && senha.value !== "" && confirmaSenha.value !== "" && inputError.length === 0) {
        button.disabled = false
    } else {
        button.disabled = true
    }
}

function estilizarInputIncorreto(input, helper) {
    helper.classList.add("visible")
    input.classList.add("error")
    button.disabled = true
}

function removerEstilizacaoInputIncorreto(input, helper) {
    helper.classList.remove("visible")
    input.classList.remove("error")
}

timer = null; // variavel para armazenar nosso timer

// Validação do Nome do usuário
nome.addEventListener('input', (e) => {
    const valor = e.target.value

    clearTimeout(timer);

    timer = setTimeout(function () {
        if (valor.length < 3) {
            helperName.textContent = "O nome deve ter 3 ou mais caracteres!"
            estilizarInputIncorreto(nome, helperName)
        } else {
            removerEstilizacaoInputIncorreto(nome, helperName)
            habilitarDesabilitarBotao()
        }
    }, 800);
})

// Validação do e-mail
email.addEventListener('input', (e) => {
    let valor = e.target.value

    clearTimeout(timer);

    timer = setTimeout(function () {
        if (!valor.includes("@") || !valor.includes(".com")) {
            helperEmail.textContent = "Precisa inserir um e-mail válido!"
            estilizarInputIncorreto(email, helperEmail)
        } else {
            removerEstilizacaoInputIncorreto(email, helperEmail)
            habilitarDesabilitarBotao()
        }
    }, 800);
})

// Validação de senha
senha.addEventListener('input', (e) => {
    let valor = e.target.value

    clearTimeout(timer);

    timer = setTimeout(function () {
        if (valor === "") {
            helperSenha.textContent = "O campo senha não pode ser vazio!"
            estilizarInputIncorreto(senha, helperSenha)
        } else {
            removerEstilizacaoInputIncorreto(senha, helperSenha)
            habilitarDesabilitarBotao()
        }
    }, 800);

})

// Validação de confirmação de senha
confirmaSenha.addEventListener('input', (e) => {
    let valor = e.target.value
    let valorSenha = senha.value

    clearTimeout(timer);

    timer = setTimeout(function () {
        if (confirmaSenha === "") {
            helperConfirmaSenha.textContent = "O campo não pode ser vazio!"
            estilizarInputIncorreto(confirmaSenha, helperConfirmaSenha)
        } else if (valorSenha !== valor) {
            helperConfirmaSenha.textContent = "As senhas não são iguais!"
            estilizarInputIncorreto(confirmaSenha, helperConfirmaSenha)
        } else {
            removerEstilizacaoInputIncorreto(confirmaSenha, helperConfirmaSenha)
            habilitarDesabilitarBotao()
        }
    }, 800);

})

async function cadastro() {
    const formData = new FormData();

    formData.append("image", fotoPerfil.files[0]);
    formData.append("username", nome.value);
    formData.append("password", senha.value);
    formData.append("email", email.value);
    formData.append("phone_number", telefone.value);
    formData.append("birth_date", data_nascimento.value);

    let classlist

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            body: formData
        });

        const resp = await response.json()

        if (!response.ok) {
            throw new Error(resp.msg);
        }

        classlist = 'msg-success'
        msgDialog.classList.add(classlist)
        span.innerText = 'Cadastro efetuado com sucesso!!'

        window.location.href = `confirmacao.html?email=${email.value}`


    } catch (error) {
        classlist = 'msg-error'
        msgDialog.classList.add(classlist)
        span.innerText = `${String(error).split(':')[1]}`
    }

    //remove a mensagem de erro ou sucesso da tela depois de 5 segundos.
    setTimeout(function () {
        span.innerText = ''
        msgDialog.classList.remove(classlist)
    }, 5000);
}