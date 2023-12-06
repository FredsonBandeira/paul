const penaltyCircles = document.querySelectorAll(".penalty-circle");

penaltyCircles.forEach(circle => {
    circle.addEventListener("click", function () {
        togglePenaltyColor(circle);
    });
});

function togglePenaltyColor(circle) {
    if (circle.classList.contains("green")) {
        circle.classList.remove("green");
        circle.classList.add("red");
    } else {
        circle.classList.add("green");
        circle.classList.remove("red");
    }
}



// Função para atualizar os nomes e emblemas em penalties.html
function updateNamesAndEmblems() {
    const namesAndEmblems = JSON.parse(localStorage.getItem("namesAndEmblems"));

    if (namesAndEmblems) {
        document.getElementById("penaltiesTeamAName").textContent = namesAndEmblems.teamAName;
        document.getElementById("penaltiesTeamAEmblem").src = namesAndEmblems.teamAEmblemSrc;
        document.getElementById("penaltiesTeamBName").textContent = namesAndEmblems.teamBName;
        document.getElementById("penaltiesTeamBEmblem").src = namesAndEmblems.teamBEmblemSrc;
    }
}

// Chame a função para atualizar nomes e emblemas quando a página carregar
window.addEventListener("load", updateNamesAndEmblems);

