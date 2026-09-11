// Dados padrão caso o navegador não tenha nenhuma alteração salva ainda
const dadosPadrao = {
    foto: "https://github.com", // Puxa automaticamente sua foto do GitHub
    nome: "Miguel Marques",
    descricao: "Desenvolvedor em formação | Viciado em tecnologia.",
    links: [
        { texto: "GitHub", url: "https://github.com" },
        { texto: "LinkedIn", url: "https://linkedin.com" },
        { texto: "Meu Portfólio", url: "https://github.com/Miguel-Galax/site-de-mercado-trabalho-escolar.git" },
        { texto: "Contato via WhatsApp", url: "https://web.whatsapp.com/" },
        { texto: "Currículo PDF", url: "https://canva.link/0ez8h1719689gah" }
    ]
};

// Carrega as informações gravadas ou assume o objeto padrão
let dadosAtualizados = JSON.parse(localStorage.getItem('meuLinktreeDados')) || dadosPadrao;

// Função responsável por desenhar a interface na tela
function renderizarLinktree() {
    document.getElementById('perfilFoto').src = dadosAtualizados.foto;
    document.getElementById('perfilNome').textContent = dadosAtualizados.nome;
    document.getElementById('perfilDescricao').textContent = dadosAtualizados.descricao;

    const container = document.getElementById('linksContainer');
    container.innerHTML = ''; // Limpa os botões antigos antes de recriar

    dadosAtualizados.links.forEach((link) => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = "_blank";
        a.className = "link-botao";
        a.textContent = link.texto;

        // Mantém o comportamento original do efeito visual de clique
        a.addEventListener('click', () => {
            console.log(`Você clicou no link: ${link.texto}`);
            a.classList.add('clicado');
            setTimeout(() => { a.classList.remove('clicado'); }, 200);
        });

        container.appendChild(a);
    });
}

// Exibe ou oculta a janela modal do painel administrativo
function togglePainel() {
    const painel = document.getElementById('painelAdmin');
    if (painel.style.display === 'block') {
        painel.style.display = 'none';
    } else {
        painel.style.display = 'block';
        preencherFormulario();
    }
}

// Copia as informações correntes para dentro das caixas de input do formulário
function preencherFormulario() {
    document.getElementById('editFoto').value = dadosAtualizados.foto;
    document.getElementById('editNome').value = dadosAtualizados.nome;
    document.getElementById('editDescricao').value = dadosAtualizados.descricao;

    const containerInputs = document.getElementById('inputsLinksContainer');
    containerInputs.innerHTML = '';

    dadosAtualizados.links.forEach((link, index) => {
        const div = document.createElement('div');
        div.style.marginBottom = '12px';
        div.style.display = 'flex';
        div.style.gap = '8px';
        
        div.innerHTML = `
            <input type="text" value="${link.texto}" id="linkTexto${index}" style="width: 35%;" placeholder="Nome">
            <input type="text" value="${link.url}" id="linkUrl${index}" style="width: 65%;" placeholder="https://...">
        `;
        containerInputs.appendChild(div);
    });
}

// Grava as novas strings digitadas e atualiza o estado da aplicação
function salvarAlteracoes() {
    dadosAtualizados.foto = document.getElementById('editFoto').value;
    dadosAtualizados.nome = document.getElementById('editNome').value;
    dadosAtualizados.descricao = document.getElementById('editDescricao').value;

    dadosAtualizados.links.forEach((link, index) => {
        link.texto = document.getElementById(`linkTexto${index}`).value;
        link.url = document.getElementById(`linkUrl${index}`).value;
    });

    // Salva o JSON no armazenamento persistente local do navegador
    localStorage.setItem('meuLinktreeDados', JSON.stringify(dadosAtualizados));
    
    renderizarLinktree();
    togglePainel();
}

// Execução inicial ao terminar de carregar o arquivo script.js
renderizarLinktree();
