let currentPlayer = 1;
let playerColors = ["blue", "red"];
let redEdges = new Set();
let blueEdges = new Set();
let gameEnded = false;

function startGame() {
    document.getElementById("lobby").style.display = "none";
    document.getElementById("game").style.display = "block";
    updatePlayerTurn();
    createGraph();
}

function startNewGame() {
    currentPlayer = 1;
    redEdges.clear();
    blueEdges.clear();
    gameEnded = false;
    document.getElementById("new-game-button").style.display = "none";
    document.getElementById("message").textContent = "";
    updatePlayerTurn();
    createGraph();
}

function createGraph() {
    const board = document.getElementById("game-board");
    const radius = 330;
    const centerX = 200;
    const centerY = 310;

    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const vertex = document.createElement("div");
        vertex.className = "vertex";
        vertex.textContent = i + 1;
        vertex.style.left = x + "px";
        vertex.style.top = y + "px";
        board.appendChild(vertex);
    }

    const vertices = document.getElementsByClassName("vertex");
    for (let i = 0; i < 6; i++) {
        for (let j = i + 1; j < 6; j++) {
            const edge = document.createElement("div");
            edge.className = "edge";
            edge.dataset.edge = i + "" + j;
            edge.dataset.color = "black";
            edge.addEventListener("click", function () {
                if (!gameEnded && edge.dataset.color === "black") {
                    edge.dataset.color = playerColors[currentPlayer - 1];
                    edge.style.borderTopColor = playerColors[currentPlayer - 1];
                    if (currentPlayer === 1) {
                        blueEdges.add(edge.dataset.edge);
                        if (checkSet(blueEdges)) {
                            const messageElement = document.getElementById("message");
                            messageElement.textContent = "Player 1 has won the game";
                            endGame();
                        }
                    } else {
                        redEdges.add(edge.dataset.edge);
                        if (checkSet(redEdges)) {
                            const messageElement = document.getElementById("message");
                            messageElement.textContent = "Player 2 has won the game";
                            endGame();
                        }
                    }
                    currentPlayer = currentPlayer === 1 ? 2 : 1;
                    updatePlayerTurn();
                }
            });
            edge.style.width = Math.sqrt(Math.pow(vertices[i].offsetLeft - vertices[j].offsetLeft, 2) + Math.pow(vertices[i].offsetTop - vertices[j].offsetTop, 2)) + "px";
            edge.style.transformOrigin = "top left";
            edge.style.transform = "rotate(" + Math.atan2(vertices[j].offsetTop - vertices[i].offsetTop, vertices[j].offsetLeft - vertices[i].offsetLeft) + "rad)";
            edge.style.top = vertices[i].offsetTop + 15 + "px";
            edge.style.left = vertices[i].offsetLeft + 15 + "px";
            board.appendChild(edge);
        }
    }
}

function checkSet(edgesSet) {
    if (edgesSet.size < 3) {
        return false;
    }
    const edgesArray = Array.from(edgesSet);
    for (let i = 0; i < edgesArray.length - 2; i++) {
        for (let j = i + 1; j < edgesArray.length - 1; j++) {
            for (let k = j + 1; k < edgesArray.length; k++) {
                const vertices = new Set([
                    edgesArray[i].charAt(0),
                    edgesArray[i].charAt(1),
                    edgesArray[j].charAt(0),
                    edgesArray[j].charAt(1),
                    edgesArray[k].charAt(0),
                    edgesArray[k].charAt(1)
                ]);
                if (vertices.size === 3) {
                    return true;
                }
            }
        }
    }
    return false;
}

function endGame() {
    gameEnded = true;
    document.getElementById("new-game-button").style.display = "block";
}

function updatePlayerTurn() {
    const playerTurnElement = document.getElementById("player-turn");
    playerTurnElement.textContent = "Player " + currentPlayer + "'s turn";
}
