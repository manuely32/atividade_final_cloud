const usuario = localStorage.getItem("usuario")

if (!usuario) {
    window.location.href = 'index.html'
}

const header = document.querySelector("header")

header.innerHTML = `
            <ul>
                <li><a href="cadastro_filme.html">Cadastrar Novo</a></li>
                <li><a href="home.html">Ver todos</a></li>
            </ul>

        <div>
            <img style="width: 40px; height:40px; border-radius: 110px;" id="foto_perfil">
            <span id="span-nome"></span>
            <button type="button" onclick="logoff()">SAIR</button>
        </div>
`

const user = JSON.parse(usuario)

const imagem = document.getElementById('foto_perfil')
imagem.src = user.profile.profile_photo || 'img/user3.png'

const corpo = document.getElementById('span-nome')
corpo.innerText = `${user.username}`


function logoff() {
    localStorage.removeItem('usuario')
    window.location.href = 'index.html'
}