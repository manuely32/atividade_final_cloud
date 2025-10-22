const userid = JSON.parse(usuario)
const msgDialog = document.querySelector('#dialog')
const span = msgDialog.getElementsByTagName('span')[0]

async function getCollections() {
    let classlist

    try {
        const response = await fetch(`http://localhost:3000/collection?user_id=${userid.id}`, {
            method: 'GET',

        });

        const resultado = await response.json();
        const div = document.querySelector('#collection');

        if (resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {

                const ul = document.querySelector('#container-collections');
                const li = document.createElement('li');
                li.innerHTML = `
                    <a href="detalhe.html?id=${resultado[i].id}" style="display: flex; flex-direction: column; gap: 10px;">
                        <img src="${resultado[i].image}" alt="" style="width:130px; height: 200px; border-radius:12px; object-fit: cover; "
                        <p>${resultado[i].title}</p>
                    </a>
                `;
                ul.appendChild(li);
            }
        } else {
            div.style.alignSelf = 'center'
            div.innerHTML = `
                <p>Não há filmes cadastrados.</p>
            `
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

getCollections()

