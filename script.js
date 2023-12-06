let timeoutInterval; // Variável para armazenar o intervalo do tempo morto
let timeoutTime = 60000; // Tempo morto inicial: 01:00:00 (em milissegundos)
let timeoutIsRunning = false;
let timerInterval; // Variável para armazenar o intervalo do cronômetro
let time = 20 * 60 * 1000; // 20 minutos em milissegundos
let isRunning = false; // Flag para rastrear se o cronômetro está em execução

function updateTimeoutDisplay() {
    const timeoutDisplay = document.getElementById("timeoutTimer");
    const minutes = Math.floor(timeoutTime / 60000);
    const seconds = Math.floor((timeoutTime % 60000) / 1000);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timeoutDisplay.textContent = formattedTime;
}
function updateTimerDisplay() {
    const timerDisplay = document.getElementById("timer");
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = formattedTime;
}
// function updateTimerDisplay() {
//     const timerDisplay = document.getElementById("timer");
//     const minutes = Math.floor(time / 60000);
//     const seconds = Math.floor((time % 60000) / 1000);
//     const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     timerDisplay.textContent = formattedTime;
// }

function toggleStartPause() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        document.getElementById("startPause").textContent = "INICIAR";
    } else {
        startTimer();
        document.getElementById("startPause").textContent = "PAUSAR";
    }
}
function startTimer() {
    if (!isRunning) {
        timerInterval = setInterval(function() {
            if (time === 0) {
                clearInterval(timerInterval);
                playSound();
            } else {
                time -= 1000; // Subtrai 1 segundo a cada iteração
                updateTimerDisplay();
            }
        }, 1000);
        isRunning = true;
    }
}
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    time = 20 * 60 * 1000;
    updateTimerDisplay();
    document.getElementById("startPause").textContent = "INICIAR";
}

document.getElementById("startPause").addEventListener("click", function() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    } else {
        startTimer();
    }
});
// Adicione um evento de escuta para a barra de espaço para alternar o cronômetro
document.body.addEventListener("keydown", function(event) {
    if (event.keyCode === 32) { // Barra de espaço
        toggleStartPause();
        event.preventDefault(); // Evitar o comportamento padrão da barra de espaço na página
    }
});

// Adicione um evento de escuta para o botão "Iniciar/Pausar" para alternar o cronômetro
document.getElementById("startPause").addEventListener("click", toggleStartPause);

// Event listener para o botão "Reiniciar"
document.getElementById("reset").addEventListener("click", resetTimer)






function startTimeout() {
    if (!timeoutIsRunning) {
        timeoutInterval = setInterval(function () {
            if (timeoutTime === 0) {
                clearInterval(timeoutInterval);
                playSound(); // Reproduz um som quando o tempo morto atinge 0:00
            } else {
                timeoutTime -= 1000; // Subtrai 1 segundo a cada iteração
                updateTimeoutDisplay();
            }
        }, 1000);
        timeoutIsRunning = true;
        document.getElementById("startkillerTime").disabled = true;
        document.getElementById("startkillerTime").textContent = "TEMPO MORTO";
    }
}

function playSound() {
    const audio = new Audio('som.mp3'); // Substitua 'som.mp3' pelo seu arquivo de som
    audio.play();
}

function startExtraTime() {
    if (!isRunning) {
        time = 5 * 60 * 1000; // Altere o tempo para 5 minutos (em milissegundos)
        updateTimerDisplay();
    }
}

function showTimeoutModal() {
    const modal = document.getElementById("timeoutModal");
    modal.style.display = "block";
}

function closeTimeoutModal() {
    const modal = document.getElementById("timeoutModal");
    modal.style.display = "none";

    // Reinicie o cronômetro de tempo morto
    if (timeoutIsRunning) {
        clearInterval(timeoutInterval);
        timeoutIsRunning = false;
        timeoutTime = 60000; // Defina o tempo morto de volta para 01:00:00 (em milissegundos)
        updateTimeoutDisplay();
        document.getElementById("startkillerTime").textContent = "TEMPO MORTO";
        document.getElementById("startkillerTime").disabled = false;
    }
}


function startGame() {
    
    // Capturar os nomes das equipes e os emblemas
    const teamName = document.getElementById("1team").value;
    const team1Name2 = document.getElementById("team1").value;

    const team1Name = teamName + ' ' + team1Name2;

    const team1Emblem = document.getElementById("team1-badge").files[0];

    const team2Name_2 = document.getElementById("2team").value;
    const team2Name2 = document.getElementById("team2").value;
    const team2Name = team2Name_2 + ' ' + team2Name2;
    const team2Emblem = document.getElementById("team2-badge").files[0];

    // Validar se ambos os nomes das equipes foram inseridos
    if (!team1Name || !team2Name) {
        alert("Por favor, insira nomes para ambas as equipes.");
        return;
    }

    // Validar se ambos os emblemas foram selecionados
    if (!team1Emblem || !team2Emblem) {
        alert("Por favor, selecione emblemas para ambas as equipes.");
        return;
    }

    // Atualizar os emblemas e nomes das equipes no placar
    document.getElementById("teamAEmblem").src = URL.createObjectURL(team1Emblem);
    document.getElementById("teamAName").textContent = team1Name;

    document.getElementById("teamBEmblem").src = URL.createObjectURL(team2Emblem);
    document.getElementById("teamBName").textContent = team2Name;

    // Ocultar a seção de seleção de equipes
    const teamSelectionSection = document.querySelector(".team-selection");
    teamSelectionSection.style.display = "none";

    // Exibir o placar e os controles
    const scoreboard = document.querySelector(".scoreboard");
    scoreboard.style.display = "flex";

    const controls = document.querySelector(".controls");
    controls.style.display = "block";

    // Iniciar o cronômetro
    //startTimer();

    // Aqui você pode adicionar outras lógicas relevantes para iniciar o jogo, como ações de inicialização de jogadores, etc.
}


// Event listeners
document.getElementById("startPause").addEventListener("click", startTimer);
document.getElementById("startkillerTime").addEventListener("click", showTimeoutModal);
document.querySelector("#timeoutModal button").addEventListener("click", closeTimeoutModal);
document.getElementById("startExtraTime").addEventListener("click", startExtraTime);
document.getElementById("startkillerTime").addEventListener("click", startTimeout);

// Chame as funções de atualização de display inicial
updateTimerDisplay();
updateTimeoutDisplay();
// Event listener para o botão "Adicionar Gol Equipe A"
document.getElementById("addTeamAGoal").addEventListener("click", function() {
    const teamAScoreDisplay = document.getElementById("teamAScoreDisplay");
    let currentScore = parseInt(teamAScoreDisplay.textContent, 10);
    currentScore++;
    teamAScoreDisplay.textContent = currentScore;

    // Verifique se a equipe com cartão vermelho (se houver) é a Equipe A
    if (teamWithRedCard === "B") {
        clearRedCard(); // Limpe o cartão vermelho
    }
});

// Event listener para o botão "Adicionar Gol Equipe B"
document.getElementById("addTeamBGoal").addEventListener("click", function() {
    const teamBScoreDisplay = document.getElementById("teamBScoreDisplay");
    let currentScore = parseInt(teamBScoreDisplay.textContent, 10);
    currentScore++;
    teamBScoreDisplay.textContent = currentScore;

    // Verifique se a equipe com cartão vermelho (se houver) é a Equipe B
    if (teamWithRedCard === "A") {
        clearRedCard(); // Limpe o cartão vermelho
    }
});



// Event listener para o elemento que exibe o número de gols da Equipe B
document.getElementById("teamAScoreDisplay").addEventListener("click", function() {
    const teamAScoreDisplay = document.getElementById("teamAScoreDisplay");
    let currentScore = parseInt(teamAScoreDisplay.textContent, 10);
    if (currentScore > 0) {
        currentScore--;
        teamAScoreDisplay.textContent = currentScore;
    }
});
// Event listener para o elemento que exibe o número de gols da Equipe B
document.getElementById("teamBScoreDisplay").addEventListener("click", function() {
    const teamBScoreDisplay = document.getElementById("teamBScoreDisplay");
    let currentScore = parseInt(teamBScoreDisplay.textContent, 10);
    if (currentScore > 0) {
        currentScore--;
        teamBScoreDisplay.textContent = currentScore;
    }
});
// Event listener para adicionar falta à equipe A
document.getElementById("addTeamAFoul").addEventListener("click", function() {
    const teamAFoulCount = document.getElementById("teamAFoulCount");
    let currentFoulCount = parseInt(teamAFoulCount.textContent, 10);
    currentFoulCount++;
    teamAFoulCount.textContent = currentFoulCount;
});

// Event listener para remover falta da equipe A
document.getElementById("removeTeamAFoul").addEventListener("click", function() {
    const teamAFoulCount = document.getElementById("teamAFoulCount");
    let currentFoulCount = parseInt(teamAFoulCount.textContent, 10);
    if (currentFoulCount > 0) {
        currentFoulCount--;
        teamAFoulCount.textContent = currentFoulCount;
    }
});
// Event listener para adicionar falta à equipe B
document.getElementById("addTeamBFoul").addEventListener("click", function() {
    const teamBFoulCount = document.getElementById("teamBFoulCount");
    let currentFoulCount = parseInt(teamBFoulCount.textContent, 10);
    currentFoulCount++;
    teamBFoulCount.textContent = currentFoulCount;
});

// Event listener para remover falta da equipe B
document.getElementById("removeTeamBFoul").addEventListener("click", function() {
    const teamBFoulCount = document.getElementById("teamBFoulCount");
    let currentFoulCount = parseInt(teamBFoulCount.textContent, 10);
    if (currentFoulCount > 0) {
        currentFoulCount--;
        teamBFoulCount.textContent = currentFoulCount;
    }
});

let redCardPenaltyTime = 2 * 60 * 1000; // 2 minutos em milissegundos
let redCardPenaltyTimer; // Variável para controlar o tempo de penalização
let teamWithRedCard = null; // Variável para rastrear a equipe com cartão vermelho

// Função para adicionar um cartão vermelho a uma equipe
function addRedCard(team) {
    // Verifique se já existe uma equipe com cartão vermelho
    if (teamWithRedCard === null) {
        teamWithRedCard = team;

        // Atualize a exibição dos cartões vermelhos
        const cartCircle = document.querySelector(`.cart-circle[data-team="${team}"]`);
        cartCircle.style.backgroundColor = "red";
        // Inicie o tempo de penalização
        redCardPenaltyTimer = setTimeout(clearRedCard, redCardPenaltyTime);
    }
}

// Função para limpar o cartão vermelho
function clearRedCard() {
    if (teamWithRedCard !== null) {
        // Limpe a exibição do cartão vermelho
        const cartCircle = document.querySelector(`.cart-circle[data-team="${teamWithRedCard}"]`);
        cartCircle.style.backgroundColor = "transparent";

        // Pare o tempo de penalização
        clearTimeout(redCardPenaltyTimer);

        // Redefina a equipe com cartão vermelho
        teamWithRedCard = null;
    }
}


// Função para adicionar um cartão vermelho à equipe A
function addTeamARedCard() {
    if (teamWithRedCard !== "A") {
        addRedCard("A");
    }
}

// Função para adicionar um cartão vermelho à equipe B
function addTeamBRedCard() {
    if (teamWithRedCard !== "B") {
        addRedCard("B");
    }
}

// Event listener para o emblema da Equipe A
document.getElementById("teamAEmblem").addEventListener("click", function() {
    const teamAScoreDisplay = document.getElementById("teamAScoreDisplay");
    let currentScore = parseInt(teamAScoreDisplay.textContent, 10);
    currentScore++;
    teamAScoreDisplay.textContent = currentScore;

    if (teamWithRedCard === "B" && currentScore > 0) {
        clearRedCard(); // Limpe o cartão vermelho da equipe A
    }
});

// Event listener para o emblema da Equipe B
document.getElementById("teamBEmblem").addEventListener("click", function() {
    const teamBScoreDisplay = document.getElementById("teamBScoreDisplay");
    let currentScore = parseInt(teamBScoreDisplay.textContent, 10);
    currentScore++;
    teamBScoreDisplay.textContent = currentScore;

    if (teamWithRedCard === "A" && currentScore > 0) {
        clearRedCard(); // Limpe o cartão vermelho da equipe B
    }
});

// Event listener para o botão de adicionar cartão vermelho à equipe A
document.getElementById("addTeamARedCard").addEventListener("click", addTeamARedCard);

// Event listener para o botão de adicionar cartão vermelho à equipe B
document.getElementById("addTeamBRedCard").addEventListener("click", addTeamBRedCard);

// Função para reiniciar o jogo e permitir a seleção de novas equipes e emblemas
function resetGame() {
    // Pare o cronômetro, se estiver em execução
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }

    // Limpe as pontuações, emblemas e nomes das equipes
    document.getElementById("teamAName").textContent = "Equipe A";
    document.getElementById("teamAScoreDisplay").textContent = "0";
    document.getElementById("teamAEmblem").src = "default_emblem_A.png";

    document.getElementById("teamBName").textContent = "Equipe B";
    document.getElementById("teamBScoreDisplay").textContent = "0";
    document.getElementById("teamBEmblem").src = "default_emblem_B.png";

    // Reinicie o tempo para o valor inicial (20 minutos em milissegundos)
    time = 20 * 60 * 1000;

    // Atualize a exibição do cronômetro
    updateTimerDisplay();

    // Limpe o cartão vermelho (se houver)
    clearRedCard();

    // Restaure outras configurações ou elementos, se necessário

    // Exiba a seção de seleção de equipes novamente
    const teamSelectionSection = document.querySelector(".team-selection");
    teamSelectionSection.style.display = "block";

    // Oculte o placar e os controles
    const scoreboard = document.querySelector(".scoreboard");
    scoreboard.style.display = "none";

    const controls = document.querySelector(".controls");
    controls.style.display = "none";
}

// Event listener para o botão "Reiniciar Jogo"
document.getElementById("resetGame").addEventListener("click", resetGame);
// Obtém o elemento de parágrafo pelo ID
const partToggle = document.getElementById("partToggle");

// Define uma variável para rastrear o estado
let isPart1 = true;

// Adiciona um ouvinte de clique ao elemento de parágrafo
partToggle.addEventListener("click", function () {
    if (isPart1) {
        partToggle.textContent = "2º PARTE";
    } else {
        partToggle.textContent = "1º PARTE";
    }

    // Inverte o estado
    isPart1 = !isPart1;
});
