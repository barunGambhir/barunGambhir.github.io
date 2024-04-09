let currentPlayer = 1;
let playerColors = ["blue", "red"];
let redEdges = new Set();
let blueEdges = new Set();
let gameEnded = false;

function startGame() {
    document.getElementById("lobby").style.display = "none";
    // document.getElementById("game2").style.display = "none";
    document.getElementById("game").style.display = "block";
    updatePlayerTurn();
    createGraph();
}

function startGame2() {
    document.getElementById("lobby").style.display = "none";
    // document.getElementById("game2").style.display = "block";
    document.getElementById("game").style.display = "block";
    currentPlayer = 2;
    updatePlayerTurn();
    createGraph();
}

function homePage() {
    document.getElementById("lobby").style.display = "block";
    document.getElementById("game").style.display = "none";
    // document.getElementById("game2").style.display = "none";
    window.location.reload();
}

function createGraph() {
    const board = document.getElementById("game-board");
    const radius = 300;
    const centerX = 190;
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
                if (currentPlayer == 2) {
                    playerMove2(edge);
                }
                else {
                    playerMove(edge);
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
        if (checkSet(blueEdges)) {
            endGame("player");
        } else {
            currentPlayer = 2;
            updatePlayerTurn();
            setTimeout(computerMove, 1000);
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
            if (checkSet(redEdges)) {
                endGame("computer");
            } else {
                currentPlayer = 1;
                updatePlayerTurn();
            }
        }
    }
}

function calculateDistance(edge1, edge2) {
    let vertex1 = edge1.split("");
    let vertex2 = edge2.split("");
    let x1 = parseInt(vertex1[0]);
    let y1 = parseInt(vertex1[1]);
    let x2 = parseInt(vertex2[0]);
    let y2 = parseInt(vertex2[1]);
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Game 2 logic begins

function playerMove2(edge) {
    if (currentPlayer == 2){
        setTimeout(computerMove, 1000);
    }
    if (!gameEnded && edge.dataset.color === "white" && currentPlayer === 1) {
        edge.dataset.color = playerColors[currentPlayer - 1];
        edge.style.borderTopColor = playerColors[currentPlayer - 1];
        blueEdges.add(edge.dataset.edge);
        if (checkSet(blueEdges)) {
            endGame("player");
        } else {
            currentPlayer = 2;
            updatePlayerTurn();
            setTimeout(computerMove, 1000);
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
            if (checkSet(redEdges)) {
                endGame("computer");
            } else {
                currentPlayer = 1;
                updatePlayerTurn();
            }
        }
    }
}


// function computerMove2() {
//     if (!gameEnded && currentPlayer === 2) {
//         let validEdges = Array.from(document.getElementsByClassName("edge"))
//             .filter(edge => edge.dataset.color === "white");
//         let closeEdges = [];
//         redEdges.forEach(redEdge => {
//             validEdges.forEach(edge => {
//                 let [firstVertex, secondVertex] = edge.dataset.edge.split("");
//                 if (redEdge.includes(firstVertex) || redEdge.includes(secondVertex)) {
//                     closeEdges.push(edge);
//                 }
//             });
//         });

//         let selectedEdge;
//         if (closeEdges.length > 0) {
//             selectedEdge = closeEdges[Math.floor(Math.random() * closeEdges.length)];
//         } else if (validEdges.length > 0) {
//             selectedEdge = validEdges[Math.floor(Math.random() * validEdges.length)];
//         }

//         if (selectedEdge) {
//             selectedEdge.dataset.color = playerColors[currentPlayer - 1];
//             selectedEdge.style.borderTopColor = playerColors[currentPlayer - 1];
//             redEdges.add(selectedEdge.dataset.edge);
//             if (checkSet(redEdges)) {
//                 endGame("computer");
//             } else {
//                 currentPlayer = 1;
//                 updatePlayerTurn();
//             }
//         }
//     }
// }

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

function endGame(winner) {
    gameEnded = true;
    if (winner === "player") {
        document.getElementById("player-turn").textContent =
            "You have won the game";
    } else {
        document.getElementById("player-turn").textContent =
            "Computer has won the game";
    }
    document.getElementById("home-page-button").innerHTML = "Play Again!";
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