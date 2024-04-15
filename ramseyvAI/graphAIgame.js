let currentPlayer = 1;

/* currentGame: 
1 - Level1,   
2 - Level2,   
3 - Level3,    
4 - Level4,    
30 - Level3Hard,    
40 - Level4Hard */

let currentGame = 1;
let playerColors = ["blue", "red"];
let redEdges = new Set();
let blueEdges = new Set();
let gameEnded = false;

let edgeClickSound = new Audio('misc/click-sound.wav');
let winSound = new Audio('misc/game-win.wav');
let loseSound = new Audio('misc/game-lose.wav');


function playEdgeClickSound() {
    edgeClickSound.currentTime = 0; 
    edgeClickSound.play();
}

function playGameWinSound() {
    winSound.currentTime = 0; 
    winSound.play();
}

function playGameLoseSound() {
    loseSound.currentTime = 0; 
    loseSound.play();
}

function startGame() {
    document.getElementById("lobby").style.display = "none";
    document.getElementById("game").style.display = "block";
    updatePlayerTurn();
    createGraph();
}

function startGame2() {
    document.getElementById("lobby").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("changeMe").innerHTML = "Level 2 Aim - Create a blue K₃ before AI creates a red K₃";
    currentPlayer = 2;
    currentGame = 2;
    updatePlayerTurn();
    createGraph();
}

function startGame3() {
    document.getElementById("lobby").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("changeMe").innerHTML ="Level 3 Aim - Create a blue K₄ before AI creates a red K₃";
    currentGame = 3;
    updatePlayerTurn();
    createGraph();
}

function startGame30() {
    document.getElementById("lobby").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("changeMe").innerHTML ="Level 3 Challenge - Create a blue K₄ before AI creates a red K₃";
    currentGame = 30;
    updatePlayerTurn();
    createGraph();
}

function startGame4() {
    document.getElementById("lobby").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("changeMe").innerHTML = "Level 4 Aim - Create a blue K₄ before AI creates a red K₃";
    currentPlayer = 2;
    currentGame = 4;
    updatePlayerTurn();
    createGraph();
}

function startGame40() {
    document.getElementById("lobby").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("changeMe").innerHTML = "Level 4 Challenge - Create a blue K₄ before AI creates a red K₃";
    currentPlayer = 2;
    currentGame = 40;
    updatePlayerTurn();
    createGraph();
}

function homePage() {
    document.getElementById("lobby").style.display = "block";
    document.getElementById("game").style.display = "none";
    window.location.reload();
}

function createGraph() {
    const board = document.getElementById("game-board");
    const radius = 300;
    const centerX = 186;
    const centerY = 360;

    // Create vertices
    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const vertex = document.createElement("div");
        vertex.className = "vertex";
        vertex.textContent = i + 1;
        vertex.style.left = x + "px";
        vertex.style.top = y + "px";
        board.appendChild(vertex);
    }

    // Create edges
    const vertices = document.getElementsByClassName("vertex");
    for (let i = 0; i < 8; i++) {
        for (let j = i + 1; j < 8; j++) {
            const edge = document.createElement("div");
            edge.className = "edge";
            edge.dataset.edge = i + "" + j;
            edge.dataset.color = "white";
            edge.addEventListener("click", function () {
                if(currentGame == 1){
                    playerMove(edge);
                }
                else if (currentGame == 2){
                    playerMove2(edge);
                }
                else if (currentGame == 3){
                    playerMove3(edge);
                }
                else if (currentGame == 30){
                    playerMove30(edge);
                }
                else if (currentGame == 4){
                    playerMove4(edge);
                }
                else{
                    playerMove40(edge);
                }
            });
            edge.style.width = Math.sqrt(Math.pow(
                vertices[i].offsetLeft - vertices[j].offsetLeft, 2)
                + Math.pow(vertices[i].offsetTop - vertices[j].offsetTop, 2)) + "px";

            edge.style.transformOrigin = "top left";
            edge.style.transform = "rotate(" + Math.atan2(
                vertices[j].offsetTop - vertices[i].offsetTop,
                vertices[j].offsetLeft - vertices[i].offsetLeft) + "rad)";

            edge.style.top = vertices[i].offsetTop + 15 + "px";
            edge.style.left = vertices[i].offsetLeft + 15 + "px";
            board.appendChild(edge);
        }
    }
}

// Game 1 logic begins

function playerMove(edge) {
    if (!gameEnded && edge.dataset.color === "white" && currentPlayer === 1) {
        edge.dataset.color = playerColors[currentPlayer - 1];
        edge.style.borderTopColor = playerColors[currentPlayer - 1];
        blueEdges.add(edge.dataset.edge);
        edge.classList.add("shine");
        playEdgeClickSound();
        if (checkSet(blueEdges)) {
            endGame("player");
        } else {
            currentPlayer = 2;
            updatePlayerTurn();
            setTimeout(computerMove, 3000);
        }
    }
}

function computerMove() {
    if (!gameEnded && currentPlayer === 2) {
        let validEdges = Array.from(document.getElementsByClassName("edge"))
            .filter(edge => edge.dataset.color === "white");
        if (validEdges.length > 0) {
            let closestEdge = validEdges[0];
            let closestDistance = Infinity;

            validEdges.forEach(edge => {
                let blueEdgesArray = Array.from(blueEdges);
                blueEdgesArray.forEach(blueEdge => {
                    let distance = calculateDistance(
                        edge.dataset.edge, blueEdge);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestEdge = edge;
                    }
                });
            });

            closestEdge.dataset.color = playerColors[currentPlayer - 1];
            closestEdge.style.borderTopColor = playerColors[currentPlayer - 1];
            redEdges.add(closestEdge.dataset.edge);
            closestEdge.classList.add("shine-cmp");
            playEdgeClickSound();
            if (checkSet(redEdges)) {
                endGame("computer");
            } else {
                currentPlayer = 1;
                updatePlayerTurn();
            }
        }
    }
}

// Game 2 logic begins

function playerMove2(edge) {
    if (currentPlayer == 2) {
        setTimeout(computerMove, 3000);
    }
    if (!gameEnded && edge.dataset.color === "white" && currentPlayer === 1) {
        edge.dataset.color = playerColors[currentPlayer - 1];
        edge.style.borderTopColor = playerColors[currentPlayer - 1];
        blueEdges.add(edge.dataset.edge);
        edge.classList.add("shine");
        playEdgeClickSound();
        if (checkSet(blueEdges)) {
            endGame("player");
        } else {
            currentPlayer = 2;
            updatePlayerTurn();
            setTimeout(computerMove, 3000);
        }
    }
}

function computerMove2() {
    if (!gameEnded && currentPlayer === 2) {
        let validEdges = Array.from(document.getElementsByClassName("edge")).filter(edge => edge.dataset.color === "white");
        let adjacentEdges = [];

        redEdges.forEach(redEdge => {
            let adjacent = validEdges.filter(edge => {
                let vertices = edge.dataset.edge.split("");
                return vertices.includes(redEdge[0]) || vertices.includes(redEdge[1]);
            });
            adjacentEdges.push(...adjacent);
        });

        let edgeToColor = null;
        if (adjacentEdges.length > 0) {
            edgeToColor = adjacentEdges[Math.floor(Math.random() * adjacentEdges.length)];
        } else if (validEdges.length > 0) {
            edgeToColor = validEdges[Math.floor(Math.random() * validEdges.length)];
        }

        if (edgeToColor) {
            edgeToColor.dataset.color = playerColors[currentPlayer - 1];
            edgeToColor.style.borderTopColor = playerColors[currentPlayer - 1];
            redEdges.add(edgeToColor.dataset.edge);
            edgeToColor.classList.add("shine-cmp");
            playEdgeClickSound();

            if (checkSet(redEdges)) {
                endGame("computer");
            } else {
                currentPlayer = 1;
                updatePlayerTurn();
            }
        }
    }
}

// Game 3 logic begins

function playerMove3(edge) {
    if (!gameEnded && edge.dataset.color === "white" && currentPlayer === 1) {
        edge.dataset.color = playerColors[currentPlayer - 1];
        edge.style.borderTopColor = playerColors[currentPlayer - 1];
        blueEdges.add(edge.dataset.edge);
        edge.classList.add("shine");
        playEdgeClickSound();
        if (checkSet2(blueEdges)) {
            endGame("player");
        } else {
            currentPlayer = 2;
            updatePlayerTurn();
            setTimeout(computerMove3, 3000);
        }
    }
}

function computerMove3() {
    if (!gameEnded && currentPlayer === 2) {
        let validEdges = Array.from(document.getElementsByClassName("edge")).filter(edge => edge.dataset.color === "white");
    
        if (validEdges.length > 0) {
            let edgeToColor = validEdges[Math.floor(Math.random() * validEdges.length)];
            edgeToColor.dataset.color = playerColors[currentPlayer - 1];
            edgeToColor.style.borderTopColor = playerColors[currentPlayer - 1];
            redEdges.add(edgeToColor.dataset.edge);
            edgeToColor.classList.add("shine-cmp");
            playEdgeClickSound();
            
            if (checkSet(redEdges)) {
                endGame("computer");
            } else {
                currentPlayer = 1;
                updatePlayerTurn();
            }
        }
    }
}

// Game 3 Hard logic begins:

function playerMove30(edge){
    if (!gameEnded && edge.dataset.color === "white" && currentPlayer === 1) {
        edge.dataset.color = playerColors[currentPlayer - 1];
        edge.style.borderTopColor = playerColors[currentPlayer - 1];
        blueEdges.add(edge.dataset.edge);
        edge.classList.add("shine");
        playEdgeClickSound();
        if (checkSet2(blueEdges)) {
            endGame("player");
        } else {
            currentPlayer = 2;
            updatePlayerTurn();
            setTimeout(computerMove30, 3000);
        }
    }
}

function computerMove30(){
    if (!gameEnded && currentPlayer === 2) {
        let validEdges = Array.from(document.getElementsByClassName("edge"))
            .filter(edge => edge.dataset.color === "white");
        if (validEdges.length > 0) {
            let closestEdge = validEdges[0];
            let closestDistance = Infinity;

            validEdges.forEach(edge => {
                let blueEdgesArray = Array.from(blueEdges);
                blueEdgesArray.forEach(blueEdge => {
                    let distance = calculateDistance(
                        edge.dataset.edge, blueEdge);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestEdge = edge;
                    }
                });
            });

            closestEdge.dataset.color = playerColors[currentPlayer - 1];
            closestEdge.style.borderTopColor = playerColors[currentPlayer - 1];
            redEdges.add(closestEdge.dataset.edge);
            closestEdge.classList.add("shine-cmp");
            playEdgeClickSound();

            if (checkSet(redEdges)) {
                endGame("computer");
            } else {
                currentPlayer = 1;
                updatePlayerTurn();
            }
        }
    }
}

// Game 4 logic begins

function playerMove4(edge) {
    if (currentPlayer == 2) {
        setTimeout(computerMove4, 3000);
    }
    if (!gameEnded && edge.dataset.color === "white" && currentPlayer === 1) {
        edge.dataset.color = playerColors[currentPlayer - 1];
        edge.style.borderTopColor = playerColors[currentPlayer - 1];
        blueEdges.add(edge.dataset.edge);
        edge.classList.add("shine");
        playEdgeClickSound();

        if (checkSet2(blueEdges)) {
            endGame("player");
        } else {
            currentPlayer = 2;
            updatePlayerTurn();
            setTimeout(computerMove4, 3000);
        }
    }
}

function computerMove4() {
    if (!gameEnded && currentPlayer === 2) {
        let validEdges = Array.from(document.getElementsByClassName("edge"))
            .filter(edge => edge.dataset.color === "white");
        
        if (validEdges.length > 0) {
            let edgeToColor = validEdges[Math.floor(Math.random() * validEdges.length)];
            edgeToColor.dataset.color = playerColors[currentPlayer - 1];
            edgeToColor.style.borderTopColor = playerColors[currentPlayer - 1];
            redEdges.add(edgeToColor.dataset.edge);
            edgeToColor.classList.add("shine-cmp");
            playEdgeClickSound();

            if (checkSet(redEdges)) {
                endGame("computer");
            } else {
                currentPlayer = 1;
                updatePlayerTurn();
            }
        }
    }
}

// Game 4 Hard Logic begins

function playerMove40(edge){
    if (currentPlayer == 2) {
        setTimeout(computerMove40, 3000);
    }
    if (!gameEnded && edge.dataset.color === "white" && currentPlayer === 1) {
        edge.dataset.color = playerColors[currentPlayer - 1];
        edge.style.borderTopColor = playerColors[currentPlayer - 1];
        blueEdges.add(edge.dataset.edge);
        edge.classList.add("shine");
        playEdgeClickSound();
        if (checkSet2(blueEdges)) {
            endGame("player");
        } else {
            currentPlayer = 2;
            updatePlayerTurn();
            setTimeout(computerMove40, 3000);
        }
    }
}

function computerMove40(){
    if (!gameEnded && currentPlayer === 2) {
        let validEdges = Array.from(document.getElementsByClassName("edge"))
            .filter(edge => edge.dataset.color === "white");
        if (validEdges.length > 0) {
            let closestEdge = validEdges[0];
            let closestDistance = Infinity;

            validEdges.forEach(edge => {
                let blueEdgesArray = Array.from(blueEdges);
                blueEdgesArray.forEach(blueEdge => {
                    let distance = calculateDistance(
                        edge.dataset.edge, blueEdge);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestEdge = edge;
                    }
                });
            });

            closestEdge.dataset.color = playerColors[currentPlayer - 1];
            closestEdge.style.borderTopColor = playerColors[currentPlayer - 1];
            redEdges.add(closestEdge.dataset.edge);
            closestEdge.classList.add("shine-cmp");
            playEdgeClickSound();

            if (checkSet(redEdges)) {
                endGame("computer");
            } else {
                currentPlayer = 1;
                updatePlayerTurn();
            }
        }
    }
}


/* Common Helper function begins */

// function to calculate nodal distance between two edges
function calculateDistance(edge1, edge2) {
    let vertex1 = edge1.split("");
    let vertex2 = edge2.split("");
    let x1 = parseInt(vertex1[0]);
    let y1 = parseInt(vertex1[1]);
    let x2 = parseInt(vertex2[0]);
    let y2 = parseInt(vertex2[1]);
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// check for a monochromatic K_3
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

// check for a monochromatic K_4
function checkSet2(edgesSet){
    if (edgesSet.size < 6) {
        return false;
    }
    const edgesArray = Array.from(edgesSet); // {[v1, v2], [v2, v3] .... ++}
    for (let i = 0; i < edgesArray.length - 5; i++) {
        for (let j = i + 1; j < edgesArray.length - 4; j++) {
            for (let k = j + 1; k < edgesArray.length - 3; k++) {
                for (let l = k + 1; l < edgesArray.length - 2; l++){
                    for (let m = l + 1; m < edgesArray.length - 1; m++){
                        for(let n = m + 1; n < edgesArray.length; n++){
                            // 6 pairs of [vi, vj]
                            const vertices = new Set([
                                edgesArray[i].charAt(0),
                                edgesArray[i].charAt(1),
                                edgesArray[j].charAt(0),
                                edgesArray[j].charAt(1),
                                edgesArray[k].charAt(0),
                                edgesArray[k].charAt(1),
                                edgesArray[l].charAt(0),
                                edgesArray[l].charAt(1),
                                edgesArray[m].charAt(0),
                                edgesArray[m].charAt(1),
                                edgesArray[n].charAt(0),
                                edgesArray[n].charAt(1)
                            ]);
                            if (vertices.size === 4) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

function endGame(winner) {
    gameEnded = true;
    if (winner === "player") {
        playGameWinSound();
        document.getElementById("player-turn").style.color = "blue";
        document.getElementById("player-turn").textContent =
            "You have won the game 😊";
    } else {
        playGameLoseSound();
        document.getElementById("player-turn").style.color = "red";
        document.getElementById("player-turn").textContent = 
            "You have lost the game 😔";

    }
    document.getElementById("home-page-button").innerHTML = "Play Again!";
    document.getElementById("home-page-button").className = "btn btn-primary";

}

function updatePlayerTurn() {
    const playerTurnElement = document.getElementById("player-turn");
    if (!gameEnded) {
        if (currentPlayer == 2) {
            playerTurnElement.textContent = "Computer's turn";
        }
        else {
            playerTurnElement.textContent = "Your turn";
        }
    }
}