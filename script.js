// Atualiza painel de detalhes quando usuário clica em um guerreiro
function initSelecao() {
    const guerreiros = document.querySelectorAll(".guerreiro");
    const nomeEl = document.querySelector(".detalhe-nome");
    const poderEl = document.querySelector(".detalhe-poder");
    const textoEl = document.querySelector(".detalhe-texto");
    let atual = null;
  
    guerreiros.forEach((card) => {
      card.addEventListener("click", () => {
        const nome = card.dataset.nome || "Desconhecido";
        const poder = card.dataset.poder || "?";
  
        if (atual) atual.classList.remove("selecionado");
        atual = card;
        card.classList.add("selecionado");
  
        nomeEl.textContent = nome;
        poderEl.textContent = "Nível de poder: " + poder;
        textoEl.textContent =
          "Um guerreiro pronto para a batalha. Escolha outro para comparar os poderes!";
      });
    });
  }
  
  // Pequeno som de espada usando Web Audio API (opcional, leve)
  function criarSomEspada() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
  
    const ctx = new AudioCtx();
  
    function tocar() {
      const agora = ctx.currentTime;
      const osc = ctx.createOscillator();
      const ganho = ctx.createGain();
  
      osc.type = "triangle";
      osc.frequency.setValueAtTime(700, agora);
      osc.frequency.exponentialRampToValueAtTime(1800, agora + 0.08);
      osc.frequency.exponentialRampToValueAtTime(200, agora + 0.22);
  
      ganho.gain.setValueAtTime(0.0, agora);
      ganho.gain.linearRampToValueAtTime(0.9, agora + 0.02);
      ganho.gain.exponentialRampToValueAtTime(0.001, agora + 0.28);
  
      osc.connect(ganho);
      ganho.connect(ctx.destination);
  
      osc.start(agora);
      osc.stop(agora + 0.32);
    }
  
    return { tocar };
  }
  
  const somEspada = criarSomEspada();
  
  // Ao passar o mouse, além da animação de CSS, tocamos um som leve
  function initHoverSom() {
    const guerreiros = document.querySelectorAll(".guerreiro");
    guerreiros.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        if (somEspada && typeof somEspada.tocar === "function") {
          somEspada.tocar();
        }
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    initSelecao();
    initHoverSom();
  });
