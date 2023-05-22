let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
    "--winning-block"
);

const startgame = () => {
    boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
    const id = e.target.id;

    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    winner = playerHasWon();

    if (winner) {
        winner.map(
            (box) => (boxes[box].style.backgroundColor = winnerIndicator)
        );
        playerText.innerHTML = `<h2>${currentPlayer}</h2>  has Won!`;
        boxes.forEach((box) => box.removeEventListener("click", boxClicked));

        return;
    }
    count = 0;
    spaces.forEach((space) => {
        if (space) count += 1;
    });
    console.log(count);

    if (count == 9) {
        gameover();
    }
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
}

function restart() {
    spaces.fill(null);
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.backgroundColor = "";
    });
    currentPlayer = X_TEXT;
    playerText.innerHTML = "Tic tac toe";
    startgame();
}

function gameover() {
    boxes.forEach((box) => box.removeEventListener("click", boxClicked));

    playerText.innerHTML = "Gameover";
}

let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
            return [a, b, c];
        }
    }

    return false;
}

restartBtn.addEventListener("click", restart);
startgame();
