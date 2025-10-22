const inputLogin = document.getElementById('input-login')
const helperLogin = document.getElementById('helper-login')
const senha = document.getElementById('input-senha')
const helperLoginSenha = document.getElementById('helper-login-senha')
const buttonLogin = document.getElementById('button-login')
const msgDialog = document.querySelector('#dialog')
const span = msgDialog.getElementsByTagName('span')[0]

function habilitarDesabilitarBotao() {
    let inputError = document.getElementsByClassName('error')

    if (inputLogin.value !== "" && senha.value !== "" && inputError.length === 0) {
        buttonLogin.disabled = false
    } else {
        buttonLogin.disabled = true
    }
}

function estilizarInputIncorreto(input, helper) {
    helper.classList.add("visible")
    input.classList.add("error")
    buttonLogin.disabled = true
}

function removerEstilizacaoInputIncorreto(input, helper) {
    helper.classList.remove("visible")
    input.classList.remove("error")
}

let timer = null; // variavel para armazenar nosso timer

// Validação de login
inputLogin.addEventListener('input', (e) => {
    let valor = e.target.value

    clearTimeout(timer);

    timer = setTimeout(function () {
        if (!valor.includes("@") || !valor.includes(".com")) {
            helperLogin.textContent = "Precisa inserir um e-mail válido!"
            estilizarInputIncorreto(inputLogin, helperLogin)
        } else {
            removerEstilizacaoInputIncorreto(inputLogin, helperLogin)
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
            helperLoginSenha.textContent = "O campo senha não pode ser vazio!"
            estilizarInputIncorreto(senha, helperLoginSenha)
        } else {
            removerEstilizacaoInputIncorreto(senha, helperLoginSenha)
            habilitarDesabilitarBotao()
        }
    }, 600);

})

async function login() {
    //Obtem os dados informados no formulário de login
    const dados = {
        email: inputLogin.value,
        password: senha.value
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados) // Converte os dados para JSON
        });

        const dadosRetornado = await response.json()

        if (!response.ok) {
            throw new Error(dadosRetornado.msg);
        }

        // Armazena os dados do usuário no localStorage
        localStorage.setItem("usuario", JSON.stringify(dadosRetornado.data.usuario))

        // Encaminha para tela home
        window.location.href = 'home.html'
    } catch (error) {
        msgDialog.classList.add('msg-error')
        span.innerText = `${String(error).split(':')[1]}`

        setTimeout(function () {
            span.innerText = ''
            msgDialog.classList.remove('msg-error')
        }, 5000);
    }
}
