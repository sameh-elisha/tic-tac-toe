const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".tile");
const display = document.querySelector(".display-player");
const resetBtn = document.querySelector("#reset");
const playerXResultElement = document.querySelector(".result-x");
const playerOResultElement = document.querySelector(".result-o");
const drawElement = document.querySelector(".result-draw");

let playerTurn = "X";
let playerXScore = 0;
let playerOScore = 0;
let draw = 0;
let playerXSelectedBoxes = {};
let playerOSelectedBoxes = {};
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinners = (player, playerTurn) => {
  for (let i = 0; i < winningConditions.length; i++) {
    let elm = winningConditions[i];
    if (player[elm[0]] === elm[0] && player[elm[1]] === elm[1] && player[elm[2]] === elm[2]) {
      document.getElementById(`${elm[0]}`).style.background = "rgb(20, 77, 24)";
      document.getElementById(`${elm[1]}`).style.background = "rgb(20, 77, 24)";
      document.getElementById(`${elm[2]}`).style.background = "rgb(20, 77, 24)";
      console.log(playerTurn);
      if (playerTurn === "X") {
        playerXScore++;
        playerXResultElement.innerHTML = playerXScore;
      } else {
        playerOScore++;
        playerOResultElement.innerHTML = playerOScore;
      }
      container.onclick = null;
    }
  }
  if (Object.keys(playerOSelectedBoxes).length + Object.keys(playerXSelectedBoxes).length == 9) {
    draw++;
    drawElement.innerHTML = draw;
  }
};

function actions(e) {
  if (e.target.innerHTML === "") {
    e.target.innerHTML = playerTurn;
    // Switch between X, O
    e.target.classList.add(`player${playerTurn}`);
    display.classList.remove(`player${playerTurn}`);
    let id = e.target.id;

    if (playerTurn === "X") {
      playerXSelectedBoxes[id] = parseInt(id);
      checkWinners(playerXSelectedBoxes, playerTurn);
      playerTurn = "O";
    } else {
      playerOSelectedBoxes[id] = parseInt(id);
      checkWinners(playerOSelectedBoxes, playerTurn);
      playerTurn = "X";
    }
    // Function Check any winners
    display.innerHTML = playerTurn;
    display.classList.add(`player${playerTurn}`);
  }
}

container.onclick = actions;
resetBtn.addEventListener("click", () => {
  container.onclick = actions;
  boxes.forEach((elm) => {
    elm.innerHTML = "";
    elm.style.background = "#12181b";
  });

  boxes.forEach((elm) => {
    elm.classList.remove(`player${playerTurn}`);
    elm.classList.add("playerX");
  });
  display.classList.remove(`player${playerTurn}`);
  display.classList.add("playerX");
  playerTurn = "X";
  display.innerHTML = playerTurn;
  playerXSelectedBoxes = {};
  playerOSelectedBoxes = {};
});
