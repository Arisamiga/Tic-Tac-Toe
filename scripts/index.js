// Helper Functions
getElementById = (id) => document.getElementById(id);

getElementByClassName = (className) =>
  document.getElementsByClassName(className);

isArrayEqual = (arr) => arr.every((n) => n === arr[0]);

getInnerText = (selector) => selector.innerText;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Global variables
var playerOne = false;
var list = ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"];
var gameStarted = false;
var indicator = getElementById("indicator");
var reset = getElementById("reset");
var allowed = [false, false, false, false, false, false, false, false, false];

function setupPlayers() {
  playerOne = Boolean(Math.round(Math.random()));
  playerOne == false
    ? (indicator.innerText = "Its X's Turn")
    : (indicator.innerText = "Its O's Turn");
}

async function startGame() {
  gameStarted = true;
  getElementByClassName("StartGamebt")[0].style.display = "none";
  // Reseting the board
  for (let i of list) {
    getElementById(i).innerHTML = "\xA0";
    await sleep(200);
  }
  // Destroy StartGamebg
  getElementByClassName("StartGamebg")[0].style.display = "none";
  indicator.style.display = "block";
  setupPlayers();
}

function checkWin() {
  var win = false;
  var winner = "";

  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6], // Diagonal from top-right to bottom-left
  ];

  lines.forEach((line) => {
    // convert line into the actual game values

    let tempLine = [
      getInnerText(getElementById(list[line[0]])),
      getInnerText(getElementById(list[line[1]])),
      getInnerText(getElementById(list[line[2]])),
    ];

    // check if each line value is equal and not blank

    if (isArrayEqual(tempLine) && tempLine[0] != "\xa0") {
      win = true;
      winner = tempLine[0];
    }
  });

  // keep fallback case for a draw

  if (!win && allowed.every((val) => val === true)) {
    win = true;
    winner = "Nobody";
  }

  // finish game

  if (win && winner != "" && winner != " ") {
    finishGame(winner);
  }

  return win, winner;
}

function finishGame(winner) {
  gameStarted = false;
  reset.style.display = "block";
  winner == "Nobody"
    ? (indicator.innerText = "Nobody won! How sad...")
    : (indicator.innerText = "The winner is " + winner + "!");
}

function playerMove(element) {
  if (allowed[list.indexOf(element.id)] == false) {
    if (playerOne) {
      indicator.innerText = "Its X's Turn";
      element.innerText = "O";
      allowed[list.indexOf(element.id)] = true;
      playerOne = false;
      checkWin();
    } else {
      indicator.innerText = "Its O's Turn";
      element.innerText = "X";
      allowed[list.indexOf(element.id)] = true;
      playerOne = true;
      checkWin();
    }
  } else {
    indicator.innerText = "This spot is already taken";
  }
}

document.addEventListener("click", function (element) {
  if (element.target.className == "StartGamebt" && !gameStarted) {
    startGame();
  }
  if (
    element.target.id.startsWith("b") &&
    !element.target.disabled &&
    gameStarted
  ) {
    playerMove(element.target);
  }
  if (element.target.id == "reset") {
    location.reload();
  }
});
