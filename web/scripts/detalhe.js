const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const msgDialog = document.querySelector('#dialog')
const span = msgDialog.getElementsByTagName('span')[0]

async function getCollectionsShow(id) {
    try {
        const response = await fetch(`http://localhost:3000/list_collection/${id}`, {
            method: 'GET'
        });

        const resultado = await response.json();

        if (resultado) {

            const img = document.querySelector('.img-detalhes');
            img.src = resultado.image

            const titulo = document.querySelector('#titulo')
            titulo.textContent = `Título: ${resultado.title}`

            const tipo = document.querySelector('#tipo')
            tipo.textContent = `Tipo: ${resultado.type.description}`

            const categoria = document.querySelector('#categoria')
            categoria.textContent = `Categoria: ${resultado.category.description}`

            const ano = document.querySelector('#ano')
            ano.textContent = `Ano de lançamento: ${resultado.release_year}`

            const autor = document.querySelector('#autor')
            autor.textContent = `${resultado.type.id === 1 ? 'Diretor: ' : 'Autor: '} ${resultado.author}`

            const descricao = document.querySelector('#descricao')
            descricao.textContent = `Descrição: ${resultado.description}`

        }

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

getCollectionsShow(id)