// ELEMENTOS
// =======================
const loginBtn = document.getElementById("login-btn");
const passwordInput = document.getElementById("password");
const loginScreen = document.getElementById("login-screen");
const mainScreen = document.getElementById("main-screen");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const bellBtn = document.getElementById("bell-btn");
const bellSound = document.getElementById("bell-sound");
const messageInput = document.getElementById("message");
const userLabel = document.getElementById("user-label");
const logoutBtn = document.getElementById("logout-btn");
const userInfo = document.getElementById("user-info");

let utterance;

// =======================
// LOGIN DE USUÁRIOS
// =======================

// Senhas e nomes de usuários (pode editar aqui)
const users = {
  "admin123": "Desenvolvedor",
  "capi01": "informatica01",
  "capi02": "informatica02",
  "12345": "None"
};

let currentUser = null;

loginBtn.addEventListener("click", () => {
  const senha = passwordInput.value.trim();

  if (users[senha]) {
    currentUser = users[senha];

    // Mostra a tela principal
    loginScreen.classList.remove("active");
    mainScreen.classList.add("active");

    // Mostra o nome do usuário logado
    userLabel.style.display = "block";
    userLabel.textContent = `Logado como: ${currentUser}`;

    // Mostra o botão de sair
    logoutBtn.style.display = "block";

    // Limpa campo de senha
    passwordInput.value = "";

  } else {
    alert("Senha incorreta!");
  }
});

// Botão de sair
logoutBtn.addEventListener("click", () => {
  mainScreen.classList.remove("active");
  loginScreen.classList.add("active");

  // Esconde info do usuário
  userLabel.style.display = "none";
  logoutBtn.style.display = "none";
  userLabel.textContent = "";
  currentUser = null;
});

// ---- SOMENTE CAMPANHA ----
bellBtn.addEventListener("click", () => {
  bellSound.currentTime = 0;
  bellSound.play();
});

// ---- SEGUNDA CAIXA DE TEXTO (sem campainha) ----
const message2 = document.getElementById("message2");
const play2Btn = document.getElementById("play2-btn");
const pause2Btn = document.getElementById("pause2-btn");

let utterance2;

play2Btn.addEventListener("click", () => {
  const text = message2.value.trim();
  if (!text) {
    alert("Digite um texto para ler!");
    return;
  }

  // Cancela qualquer fala anterior
  if (speechSynthesis.speaking) speechSynthesis.cancel();

  utterance2 = new SpeechSynthesisUtterance(text);
  utterance2.lang = "pt-BR";
  utterance2.rate = 0.95;   // velocidade
  utterance2.pitch = 5.0;   // tom
  utterance2.volume = 1.0;  // volume
  speechSynthesis.speak(utterance2);
});

pause2Btn.addEventListener("click", () => {
  if (speechSynthesis.speaking) {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      speechSynthesis.pause();
    }
  }
});


// ---- LEITURA DE TEXTO COM CAMPANHA ----
playBtn.addEventListener("click", () => {
  const text = messageInput.value.trim();
  if (!text) {
    alert("Digite um texto para ler!");
    return;
  }

  // Toca a campainha primeiro
  bellSound.currentTime = 0;
  bellSound.play();

  // Depois de 1.2s, fala o texto
  setTimeout(() => {
    speakText(text);
  }, 1200);
});

// ---- PAUSAR LEITURA ----
pauseBtn.addEventListener("click", () => {
  window.speechSynthesis.cancel();
});

function speakText(text) {
  // Cancela qualquer fala anterior
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

const message2 = document.getElementById("message2");
const play2Btn = document.getElementById("play2-btn");
const pause2Btn = document.getElementById("pause2-btn");

let utterance2;

play2Btn.addEventListener("click", () => {
  const text = message2.value.trim();
  if (!text) return;

  // Se já estiver falando, para primeiro
  if (speechSynthesis.speaking) speechSynthesis.cancel();

  utterance2 = new SpeechSynthesisUtterance(text);
  utterance2.lang = "pt-BR";
  utterance2.rate = 0.95;   // velocidade
  utterance2.pitch = 1.1;   // tom (1.0 = neutro)
  utterance2.volume = 1.0;  // volume máximo
  speechSynthesis.speak(utterance2);
});

pause2Btn.addEventListener("click", () => {
  if (speechSynthesis.speaking) {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      speechSynthesis.pause();
    }
  }
});


  // 🔊 Procura uma voz masculina de PT-BR (Google ou Microsoft)
  const naturalVoice =
    voices.find(v => v.name.includes("Google português (Brasil)")) ||
    voices.find(v => v.name.includes("Microsoft Daniel")) ||
    voices.find(v => v.lang.startsWith("pt-BR")) ||
    voices[0];

  if (naturalVoice) utterance.voice = naturalVoice;

  // 🎶 Ajustes para timbre “homem soprano”
  utterance.pitch = 9.0;   // tom mais agudo
  utterance.rate = 1.5;   // levemente mais devagar (para dar naturalidade)
  utterance.volume = 1.0;  // volume máximo
  utterance.lang = "pt-BR";

  // 🔈 Pequeno delay antes de falar (pra parecer mais natural)
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 300);
}

// ⚙️ Necessário para carregar as vozes (Chrome especialmente)
window.speechSynthesis.onvoiceschanged = () => {
  window.speechSynthesis.getVoices();
};