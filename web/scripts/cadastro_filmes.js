const titulo = document.getElementById('titulo')
const helperTitulo = document.getElementById('helper-titulo')
const tipo = document.getElementById('tipo')
const helperTipo = document.getElementById('helper-tipo')
const descricao = document.getElementById('descricao')
const helperDescricao = document.getElementById('helper-descricao')
const button_filme = document.getElementById('button_cadastro_filme')
const fotoCapa = document.getElementById('foto_capa')
const msgDialog = document.querySelector('#dialog')
const span = msgDialog.getElementsByTagName('span')[0]
const userID = JSON.parse(usuario)
const categoria = document.getElementById('categoria')
const ano = document.getElementById('ano')
const helperAno = document.getElementById('helper-ano')
const autor = document.getElementById('autor')
const helperAutor = document.getElementById('helper-autor')

async function buscarTipos() {
    try {
        const response = await fetch('http://localhost:3000/types', {
            method: 'GET'
        })

        const resp = await response.json()

        if (!response.ok) {
            throw new Error(resp.msg)
        }

        const select = document.getElementById('tipo')

        resp.tipos.forEach((item, index) => {
            const option = document.createElement("option")
            option.value = item.id
            option.textContent = item.description;
            select.appendChild(option)
        })

    } catch (error) {
        console.log(error)
    }
}

buscarTipos()

async function buscarCategorias() {
    try {
        const response = await fetch('http://localhost:3000/category', {
            method: 'GET'
        })

        const resp = await response.json()

        if (!response.ok) {
            throw new Error(resp.msg)
        }

        const selectCategoria = document.getElementById('categoria')

        resp.categorias.forEach((item, index) => {
            const option = document.createElement("option")
            option.value = item.id
            option.textContent = item.description
            selectCategoria.appendChild(option)
        })

    } catch (error) {
        console.log(error)
    }
}

buscarCategorias()


function habilitarDesabilitarBotao() {
    let inputError = document.getElementsByClassName('error')

    if (titulo.value !== "" && descricao.value !== "" && ano.value !== "" && autor.value !== "" && inputError.length === 0) {
        button_filme.disabled = false
    } else {
        button_filme.disabled = true
    }
}

function estilizarInputIncorreto(input, helper) {
    helper.classList.add("visible")
    input.classList.add("error")
    button_filme.disabled = true
}

function removerEstilizacaoInputIncorreto(input, helper) {
    helper.classList.remove("visible")
    input.classList.remove("error")
}

timer = null; // variavel para armazenar nosso timer

// Validação do título
titulo.addEventListener('input', (e) => {
    const valor = e.target.value

    clearTimeout(timer);

    timer = setTimeout(function () {
        if (valor.length === "") {
            helperTitulo.textContent = "O título deve ser preenchido!"
            estilizarInputIncorreto(titulo, helperTitulo)
        } else {
            removerEstilizacaoInputIncorreto(titulo, helperTitulo)
            habilitarDesabilitarBotao()
        }
    }, 800);
})


// Validação de ano
ano.addEventListener('input', (e) => {
    let valor = e.target.value

    clearTimeout(timer);

    timer = setTimeout(function () {
        if (valor === "") {
            helperAno.textContent = "Informe o ano de lançamento!"
            estilizarInputIncorreto(ano, helperAno)
        } else {
            removerEstilizacaoInputIncorreto(ano, helperAno)
            habilitarDesabilitarBotao()
        }
    }, 800);
})

autor.addEventListener('input', (e) => {
    let valor = e.target.value

    clearTimeout(timer);

    timer = setTimeout(function () {
        if (valor === "") {
            helperAutor.textContent = "Informe o autor/diretor!"
            estilizarInputIncorreto(autor, helperAutor)
        } else {
            removerEstilizacaoInputIncorreto(autor, helperAutor)
            habilitarDesabilitarBotao()
        }
    }, 800);

})

descricao.addEventListener('input', (e) => {
    let valor = e.target.value

    clearTimeout(timer);

    timer = setTimeout(function () {
        if (valor === "") {
            helperDescricao.textContent = "Informe a descrição!"
            estilizarInputIncorreto(descricao, helperDescricao)
        } else {
            removerEstilizacaoInputIncorreto(descricao, helperDescricao)
            habilitarDesabilitarBotao()
        }
    }, 800);

})

async function cadastroFilmes() {
    const formData = new FormData();

    formData.append("imagem", fotoCapa.files[0]);
    formData.append("titulo", titulo.value);
    formData.append("tipo", tipo.value);
    formData.append("categoria", categoria.value);
    formData.append("autor", autor.value);
    formData.append("descricao", descricao.value);
    formData.append("ano", ano.value);
    formData.append("usuarioId", userID.id)

    let classlist

    try {
        const response = await fetch('http://localhost:3000/collection', {
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

        window.location.href = 'home.html'

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