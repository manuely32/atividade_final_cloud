const urlAtual = window.location.href;
const url = new URL(urlAtual);
const params = url.searchParams;
const email = params.get('email')
const codigo = document.getElementById('codigo')

async function confirmar() {
    //Obtem os dados informados no formulário de login
    const dados = {
        email: email,
        codigo: codigo.value
    }

    try {
        const response = await fetch('http://localhost:3000/confirmation_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados) // Converte os dados para JSON
        });

        const dadosRetornado = await response.json();

        if (!response.ok) {
            throw new Error(dadosRetornado.msg);
        }

        // Encaminha para tela home
        window.location.href = 'index.html'
    } catch (error) {
        msgDialog.classList.add('msg-error')
        span.innerText = `${String(error).split(':')[1]}`

        setTimeout(function () {
            span.innerText = ''
            msgDialog.classList.remove('msg-error')
        }, 5000);
    }
}