let perguntas = [
  {
    pergunta: "Qual é a capital da França?",
    opcoes: ["Madrid", "Roma", "Paris", "Berlim"],
    resposta: 2,
    foto: "franca.jpg"
  },
  {
    pergunta: "Quem pintou a Mona Lisa?",
    opcoes: ["Picasso", "Andy Warhol", "Van Gogh", "Leonardo da Vinci"],
    resposta: 3,
    foto: "monalisa.jpg"
  },
  {
    pergunta: "Em que ano ocorreu a independência do Brasil?",
    opcoes: ["1822", "1492", "1776", "1889"],
    resposta: 0,
    foto: "independencia.jpg"
  },
  {
    pergunta: "Qual é o maior planeta do sistema solar?",
    opcoes: ["Vênus", "Marte", "Júpiter", "Urano"],
    resposta: 2,
    foto: "jupiter.jpg"
  },
  {
    pergunta: "Qual é o famoso físico que desenvolveu a teoria da relatividade?",
    opcoes: ["Isaac Newton", "Albert Einstein", "Galileu Galilei", "Stephen Hawking"],
    resposta: 1,
    foto: "einstein.jpg"
  },
  {
          pergunta:'Quantas posições existem na dança clássica(Balé)?',
          opcoes: ['5', '7','27', '13'],
          resposta: 0,
  },
  {
          pergunta:'',
          opcoes:['','','',''],
          resposta: ,
  },
  // Adicione mais perguntas com fotos aqui
];

const TEMPO_TOTAL = 60;  // Tempo total do jogo em segundos
const TEMPO_ACRESCENTO = 5;  // Tempo em segundos acrescentado por resposta correta
const TEMPO_REDUCAO = 10;  // Tempo em segundos reduzido por resposta errada
let questionIndex = 0;  // Índice da pergunta atual
let score = 0;  // Pontuação do jogador
let time = TEMPO_TOTAL;  // Tempo restante
let timer;  // Referência para o intervalo do temporizador
if (TEMPO_TOTAL > 60){
  TEMPO_TOTAL = 60;
}
/**
 * Função que inicia o temporizador.
 */
function startTimer() {
  const timeElement = document.getElementById("time");
  const timeRemainingElement = document.getElementById("time-remaining");

  timeElement.innerText = "Tempo Restante: " + formatTime(time);

  timer = setInterval(updateTime, 1000);
}

/**
 * Função que atualiza o tempo restante a cada segundo.
 */
function updateTime() {
  const timeElement = document.getElementById("time");
  const timeRemainingElement = document.getElementById("time-remaining");

  time--;

  if (time < 10) {
    timeElement.style.color = "red";
    timeRemainingElement.classList.add("red");
  }

  timeElement.innerText = "Tempo Restante: " + formatTime(time);

  if (time === 0) {
    stopTimer();
    showFinalResult("Tempo esgotado!");
  }

  timeRemainingElement.style.transform = `scaleX(${time / TEMPO_TOTAL})`;
}

/**
 * Função que formata o tempo para mm:ss.
 * @param {number} seconds - O tempo em segundos.
 * @returns {string} - O tempo formatado.
 */
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return formattedMinutes + ":" + formattedSeconds;
}

/**
 * Função que para o temporizador.
 */
function stopTimer() {
  clearInterval(timer);
}

/**
 * Função que embaralha as perguntas.
 */
function randomizeQuestions() {
  for (let i = perguntas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perguntas[i], perguntas[j]] = [perguntas[j], perguntas[i]];
  }
}

/**
 * Função que verifica a resposta selecionada pelo usuário.
 * @param {number} selectedOption - O número da opção selecionada.
 */
function checkAnswer(selectedOption) {
  const fota = document.getElementById('fot');
  const result = document.getElementById("result");
  const optionsDiv = document.getElementById("options");
  const selectedButton = optionsDiv.children[selectedOption];
  const currentQuestion = perguntas[questionIndex];

  if (selectedOption === currentQuestion.resposta) {
    result.innerText = "Resposta Correta!";
    result.classList.remove("wrong");
    result.classList.add("correct");
    selectedButton.classList.add("correct");
    score += 100;
    time += TEMPO_ACRESCENTO;

    const imageContainer = document.getElementById("image-container");
    const image = document.getElementById("image");
    image.src =  "/files/photos/ok.png";
    image.alt = "Imagem da resposta correta";

    imageContainer.classList.remove("hide");
  } else {
    result.innerText = "Resposta Incorreta!";
    result.classList.remove("correct");
    result.classList.add("wrong");
    selectedButton.classList.add("wrong");
    optionsDiv.children[currentQuestion.resposta].classList.add("correct");
    time -= TEMPO_REDUCAO;
    
    
var ok ='/files/photos/hyprmx_close_button.png';
fota.innerHTML = ok;

    const imageContainer = document.getElementById("image-container");
    const image = document.getElementById("image");
    image.src = "/files/photos/g-.png";
    image.alt = "Imagem da resposta incorreta";

    imageContainer.classList.remove("hide");
  }

  stopTimer();

  if (questionIndex < perguntas.length - 1) {
    questionIndex++;
    setTimeout(() => {
      nextQuestion();
      result.innerText = "";
      optionsDiv.children[currentQuestion.resposta].classList.remove("correct");
      //_____$_______$_______$_______
      startTimer();
    }, 2000);
  } else {
    setTimeout(() => {
      showFinalResult("Parabéns, você concluiu o quiz! Pontuação: " + score);
    }, 2000);
  }
}

/**
 * Função que exibe a próxima pergunta.
 */
function nextQuestion() {
  const question = document.getElementById("question");
  const optionsDiv = document.getElementById("options");

  optionsDiv.innerHTML = "";

  if (questionIndex < perguntas.length) {
    const currentQuestion = perguntas[questionIndex];

    question.innerText = "Pergunta " + (questionIndex + 1) + ": " + currentQuestion.pergunta;

    for (let i = 0; i < currentQuestion.opcoes.length; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.classList.add("option-btn");
      btn.innerText = currentQuestion.opcoes[i];
      btn.value = i;
      btn.onclick = function() {
        checkAnswer(parseInt(btn.value));
      };
      optionsDiv.appendChild(btn);
    }
  }
}

/**
 * Função que exibe o resultado final.
 * @param {string} message - A mensagem de resultado final.
 */
function showFinalResult(message) {
  const container = document.querySelector(".container");
  const questionDiv = document.querySelector(".question-div");
  const restartBtn = document.getElementById("restart-btn");

  container.removeChild(questionDiv);

  const finalResult = document.getElementById("final-result");
  finalResult.innerText = message;

  container.appendChild(finalResult);
  container.appendChild(restartBtn);

  restartBtn.style.display = "block";

  document.getElementById("image-container").classList.add("hide");
}

/**
 * Função que reinicia o jogo.
 */
function restartGame() {
  questionIndex = 0;
  score = 0;
  time = TEMPO_TOTAL;

  randomizeQuestions();
  nextQuestion();

  const result = document.getElementById("result");
  result.innerText = "";

  const finalResult = document.getElementById("final-result");
  finalResult.innerText = "";

  const restartBtn = document.getElementById("restart-btn");
  restartBtn.style.display = "none";

  startTimer();
}

randomizeQuestions();
nextQuestion();
startTimer();


//Certifique-se de ter as imagens correspondentes e ajuste os nomes dos arquivos de imagem nas propriedades `foto` de cada pergunta.

//Espero que esteja tudo correto agora. Por favor, teste novamente e deixe-me saber se está funcionando conforme desejado. Estou aqui para ajudar com qualquer outra dúvida que você possa ter.