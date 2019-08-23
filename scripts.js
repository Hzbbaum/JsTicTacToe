// #region variables

const myboard = document.querySelector(".board")
const cells = document.getElementsByClassName("cell")
const myMessage = document.querySelector(".messageBox")
let newGameButton = document.querySelector(".btn")
let myElement
let X = 0
let Y = 0

// #endregion


// #region Objects

gameState = {
    turn: 0,
    gameOver: false,
    // true = X's turn, false = O's turn
    whosTurn: true,
}

// #endregion


// #region events

myboard.addEventListener("click", doTurn)
newGameButton.addEventListener("click", clearBoard)

// #endregion

// #region functions

function doTurn(e) {
    if (gameState.gameOver) {
        return
    } else {
        X = e.clientX
        Y = e.clientY
        myElement = document.elementsFromPoint(X, Y)[0]
        if (myElement.textContent == "" && myElement.classList.contains("cell")) {
            if (gameState.whosTurn) {
                myElement.textContent = "X"
                myMessage.textContent = "O's Turn!"
            } else {
                myElement.textContent = "O"
                myMessage.textContent = "X's Turn!"
            }
            gameState.turn++
        }
        if (gameState.turn == 9) {
            gameState.gameOver = true
            myMessage.textContent = "This Game is a draw!"
        }
        if (checkWin()) {
            gameState.gameOver = true
            if (gameState.whosTurn) { myMessage.textContent = "X's Won" }
            else { myMessage.textContent = "O's Won" }
        }
        gameState.whosTurn = !gameState.whosTurn
    }
}

function clearBoard() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = ""
        gameState.turn = 0
        gameState.whosTurn = true
        gameState.gameOver = false
        myMessage.textContent = "X's Turn!"
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = ""
        }
    }
}

function checkWin() {
    if (winRows()) { return true }
    if (winCols()) { return true }
    if (winDiag()) { return true }
    return false
}

// #endregion

// #region helper function

function winRows() {
    if (
        (cells[0].textContent == cells[1].textContent &&
            cells[0].textContent == cells[2].textContent &&
            cells[0].textContent != "") ||
        (cells[3].textContent == cells[4].textContent &&
            cells[3].textContent == cells[5].textContent &&
            cells[3].textContent != "") ||
        (cells[6].textContent == cells[7].textContent &&
            cells[6].textContent == cells[8].textContent &&
            cells[6].textContent != "")
    ) { return true }
    return false
}

function winCols() {
    if (
        (cells[0].textContent == cells[3].textContent &&
            cells[0].textContent == cells[6].textContent &&
            cells[0].textContent != "") ||
        (cells[1].textContent == cells[4].textContent &&
            cells[1].textContent == cells[7].textContent &&
            cells[1].textContent != "") ||
        (cells[2].textContent == cells[5].textContent &&
            cells[2].textContent == cells[8].textContent &&
            cells[2].textContent != "")
    ) { return true }
    return false
}

function winDiag() {
    if (
        (cells[0].textContent == cells[4].textContent &&
            cells[0].textContent == cells[8].textContent &&
            cells[0].textContent != "") ||
        (cells[2].textContent == cells[4].textContent &&
            cells[2].textContent == cells[6].textContent &&
            cells[2].textContent != "")
    ) { return true }
    return false
}

// #endregion