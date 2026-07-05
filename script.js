// Aqui controlamos a lógica do tamanho do texto na tela
let tamanhoBaseFonte = 16; 

function mudarFonte(fatorAlteracao) {
    tamanhoBaseFonte += (fatorAlteracao * 2);
    
    // Deixamos um limite seguro para o texto não ficar minúsculo ou gigante demais
    if(tamanhoBaseFonte >= 12 && tamanhoBaseFonte <= 28) {
        document.documentElement.style.setProperty('--fonte-base', tamanhoBaseFonte + 'px');
    }
}

// Configurações iniciais do nosso robô de conversação
let nomeUsuario = ""; 
let primeiraInteracao = true; 

function processarChat() {
    const inputElemento = document.getElementById('chatInput');
    const entradaTexto = inputElemento.value.trim();
    
    // Se o usuário clicar em enviar sem escrever nada, paramos por aqui
    if (!entradaTexto) return; 

    const janelaConversa = document.getElementById('chatJanela');

    // Adiciona o texto do usuário na caixinha de conversa
    janelaConversa.innerHTML += `<div class="mensagem msg-usuario">${entradaTexto}</div>`;
    inputElemento.value = ''; // Limpa o campo de entrada para a próxima pergunta

    let respostaSistema = "";

    // Se for a primeira vez que a pessoa digita, o sistema salva o nome dela
    if (primeiraInteracao) {
        nomeUsuario = entradaTexto;
        respostaSistema = `✨ Prazer em conhecer você, **${nomeUsuario}**! Agora que te conheço, me conta: qual dúvida ou problema técnico você possui sobre o manejo sustentável das suas futuras terras?`;
        primeiraInteracao = false; // Desativa o gatilho inicial para permitir perguntas reais
    } else {
        const termosPesquisa = entradaTexto.toLowerCase();

        // Sistema inteligente que lê palavras-chave e entrega a resposta correta
        if (termosPesquisa.includes('fertilizante') || termosPesquisa.includes('adubo') || termosPesquisa.includes('substituir') || termosPesquisa.includes('quimico')) {
            respostaSistema = `💡 **Olá ${nomeUsuario}!** Para substituir fertilizantes químicos como o NPK sintético, você deve implantar **adubação verde** com plantas leguminosas (que fixam Nitrogênio do ar pelas raízes), uso sistemático de **compostos orgânicos maturados** ou aplicação foliar de **biofertilizantes líquidos ricos em microrganismos eficientes (EM)**.`;
        } else if (termosPesquisa.includes('solo') || termosPesquisa.includes('terra') || termosPesquisa.includes('fraco') || termosPesquisa.includes('recuperar') || termosPesquisa.includes('erosao')) {
            respostaSistema = `🌱 **Veja bem, ${nomeUsuario}:** Solos fracos e degradados necessitam de proteção imediata. A regra fundamental da regeneração é o **não-revolvimento** combinado com **cobertura por palhada**. Isso alimenta a macrofauna (como as minhocas) e reestrutura a porosidade da terra, impedindo a erosão pela chuva.`;
        } else if (termosPesquisa.includes('praga') || termosPesquisa.includes('inseto') || termosPesquisa.includes('lagarta') || termosPesquisa.includes('veneno') || termosPesquisa.includes('defensivo')) {
            respostaSistema = `🐞 **Dica Biológica, ${nomeUsuario}:** Em sistemas regenerativos, eliminamos defensivos químicos usando o **Manejo Integrado de Pragas (MIP)**. O plantio de faixas de biodiversidade (plantas companheiras e flores) atrai predadores benéficos como joaninhas, vespas parasitoides e pássaros, equilibrando o ecossistema naturalmente.`;
        } else if (termosPesquisa.includes('agua') || termosPesquisa.includes('seca') || termosPesquisa.includes('infiltracao') || termosPesquisa.includes('umidade')) {
            respostaSistema = `💧 **Entendido, ${nomeUsuario}!** A retenção hídrica está diretamente ligada à matéria orgânica. Cada 1% de matéria orgânica adicionada ao solo aumenta drasticamente a capacidade dele reter água como se fosse uma esponja, protegendo sua lavoura contra estiagens severas.`;
        } else if (termosPesquisa.includes('integracao') || termosPesquisa.includes('arvore') || termosPesquisa.includes('pecuaria') || termosPesquisa.includes('ilpf')) {
            respostaSistema = `🌳 **Excelente visão, ${nomeUsuario}!** A Integração Lavoura-Pecuária-Floresta (ILPF) une o gado, grãos e árvores na mesma área. As árvores fornecem conforto térmico (sombra) para os animais, que por sua vez adubam o solo com esterco, gerando diversificação extrema de renda e proteção ecológica.`;
        } else {
            respostaSistema = `🌾 **Dica Geral para ${nomeUsuario}:** O segredo do nosso plano está nos pequenos testes pilotos! Comece escolhendo uma área teste da propriedade, elimine as grades/arados, insira plantas de cobertura e observe a vida microscópica retornar à terra de forma econômica.`;
        }
    }

    // Dá uma leve pausa de meio segundo antes do robô responder para parecer mais humano
    setTimeout(() => {
        janelaConversa.innerHTML += `<div class="mensagem msg-bot">${respostaSistema}</div>`;
        janelaConversa.scrollTop = janelaConversa.scrollHeight; // Desce a barra de rolagem automaticamente
    }, 450);
}

// Lista contendo os emojis que vão aparecer dentro dos quadradinhos do jogo
const arrayElementos = ['🌱', '🌱', '🐝', '🐝', '💧', '💧', '🪱', '🪱', '🌳', '🌳', '🌻', '🌻', '🍎', '🍎', '🍄', '🍄'];
let blocosSelecionados = [];
let contadorParesCombinados = 0;

// Técnica matemática rápida para embaralhar a ordem da lista aleatoriamente
arrayElementos.sort(() => 0.5 - Math.random());

const elementoGridTabuleiro = document.getElementById('tabuleiro');

// Esse loop cria automaticamente os blocos das cartas no nosso HTML
arrayElementos.forEach((emoticon, idUnico) => {
    const blocoCarta = document.createElement('div');
    blocoCarta.classList.add('carta');
    blocoCarta.dataset.conteudo = emoticon; // Guarda o emoji escondido na memória da carta
    blocoCarta.dataset.posicao = idUnico;
    blocoCarta.innerText = emoticon;
    blocoCarta.addEventListener('click', executarGiroCarta);
    elementoGridTabuleiro.appendChild(blocoCarta);
});

function executarGiroCarta() {
    // Bloqueia o clique se a pessoa clicar na mesma carta ou tentar abrir mais de duas ao mesmo tempo
    if (blocosSelecionados.length === 2 || this.classList.contains('virada') || this.classList.contains('combinada')) return;

    this.classList.add('virada');
    blocosSelecionados.push(this);

    // Se duas cartas estiverem abertas, fazemos o teste de igualdade
    if (blocosSelecionados.length === 2) {
        verificarCompatibilidadePares();
    }
}

function verificarCompatibilidadePares() {
    const [primeiraInstancia, segundaInstancia] = blocosSelecionados;

    // Se os emojis guardados nas duas cartas forem idênticos, mantemos abertas
    if (primeiraInstancia.dataset.conteudo === segundaInstancia.dataset.conteudo) {
        primeiraInstancia.classList.add('combinada');
        segundaInstancia.classList.add('combinada');
        contadorParesCombinados += 2;
        blocosSelecionados = []; // Esvazia o gerenciador de turnos

        // Se o total de cartas combinadas atingir o tamanho total da lista, o jogador venceu
        if (contadorParesCombinados === arrayElementos.length) {
            document.getElementById('mensagemVitoria').style.display = 'block';
        }
    } else {
        // Se errou o par, espera quase um segundo para esconder os emojis novamente
        setTimeout(() => {
            primeiraInstancia.classList.remove('virada');
            segundaInstancia.classList.remove('virada');
            blocosSelecionados = [];
        }, 900);
    }
}