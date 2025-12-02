//perguntas
const perguntas = [
    {
        enunciado: "Qual cidade-estado era conhecida por seu foco extremo na vida militar?",  //a pergunta
        alternativas: [
            {
                texto: "esparta", //primeira alternativa
                afirmacao: [
                    "você acertou", //comentário para a resposta
                    "parabens"        //segundo comentário
                ],
                proxima: 1,
            },
            {
                texto: "atenas",
                afirmacao: [
                    "você errou",
                    "você pode tentar novamente"
                ],
                proxima: 1,
            }
        ]
    },
    {
        enunciado: "Pai da filosofia ocidental?",
        alternativas: [
            {
                texto: "Socrates",
                afirmacao: [
                    "você acertou",
                    "parabens"
                ],
                proxima: 2,
            },
            {
                texto: "Platão",
                afirmacao: [
                    "você errou",
                    "você pode tentar novamente "
                ],
                proxima: 2,
            }
        ]
    },
    {
        enunciado: "O que era pólis?",
        alternativas: [
            {
                texto: "Cidades-estados gregas",
                afirmacao: [
                    "você acertou",
                    "parabens"
                ],
                proxima: 3,
            },
            {
                texto: "Mercado de artesanato",
                afirmacao: [
                    "você errou",
                    "você pode tentar novamente "
                ],
                proxima: 3,
            }
        ]
    },
    {
        enunciado: "Os jogos Olímpicos antigos eram realizados em homenagem a qual Deus?",
        alternativas: [
            {
                texto: "Zeus",
                afirmacao: [
                    "você acertou",
                    "parabens"
                ],
                proxima: 4,
            },
            {
                texto: "Apolo",
                afirmacao: [
                    "você errou",
                    "você pode tentar novamente"
                ],
                proxima: 4,
            }
        ]
    },
    {
        enunciado: "O Partenon, famoso templo de Atenas, era dedicado a qual deusa?",
        alternativas: [
            {
                texto: "Atena",
                afirmacao: [
                    "você acertou",
                    "parabens"
                ],
            },
            {
                texto: "Ártemis",
                afirmacao: [
                    "você errou",
                    "você pode tentar novamente "
                ],
            }
        ]
    }
]

//aleatorio
const nomes = ["João", "Maria", "Paula", "Carla", "Pedro", "Julia"];

function aleatorio (lista){
    const posicao = Math.floor(Math.random()* lista.length);
    return lista[posicao];
}

const nome = aleatorio(nomes)

//script principal

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn"); 
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

let atual = 0; 
let perguntaAtual;
let historiaFinal = "";

botaoIniciar.addEventListener('click', iniciaJogo);

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    telaInicial.style.display = 'none';
    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");
    caixaResultado.classList.remove("mostrar");
    mostraPergunta();
}

function mostraPergunta() {
    if(atual >= perguntas.length){
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas(){
    for(const alternativa of perguntaAtual.alternativas){
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada){
    const afirmacoes = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacoes + " ";
   if(opcaoSelecionada.proxima !== undefined) {
       atual = opcaoSelecionada.proxima;
   }else {
       mostraResultado();
       return;
   }
    mostraPergunta();
}

function mostraResultado(){
    caixaPerguntas.textContent = `Após os estudos, ${nome} descobriu que`;
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
    caixaResultado.classList.add("mostrar"); 
    botaoJogarNovamente.addEventListener("click", jogarNovamente); 
}

function jogarNovamente(){
    atual = 0;
    historiaFinal = "";
    caixaResultado.classList.remove("mostrar"); 
    mostraPergunta();
}

function substituiNome() {
    for(const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);
    }
}
substituiNome();