const userid = JSON.parse(usuario)

async function getCollections() {
    try {
        const response = await fetch(`http://localhost:3000/list_collection?user_id=${userid.id}`, {
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

        console.log(resultado)
    } catch (error) {
        console.log('error', error)
    }
}

getCollections()

