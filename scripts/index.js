const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper Functions
getById = (id) => document.getElementById(id);
getByClassName = (className) => document.getElementsByClassName(className);

// Global variables
var playerOne = false;
var list = ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"];
var gameStarted = false;
var indicator = getById("indicator");
var reset = getById("reset");
var allowed = [false, false, false, false, false, false, false, false, false];

function setupPlayers() {
  playerOne = Boolean(Math.round(Math.random()));
  playerOne == false
    ? (indicator.innerText = "Its X's Turn")
    : (indicator.innerText = "Its O's Turn");
}

async function startGame() {
  gameStarted = true;
  getByClassName("StartGamebt")[0].style.display = "none";
  // Reseting the board
  for (let i of list) {
    getById(i).innerHTML = "\xA0";
    await sleep(200);
  }
  // Destroy StartGamebg
  getByClassName("StartGamebg")[0].style.display = "none";
  indicator.style.display = "block";
  setupPlayers();
}

function checkWin() {
  var win = false;
  var winner = "";
  // Horizontal
  if (
    getById(list[0]).innerText == getById(list[1]).innerText &&
    getById(list[1]).innerText == getById(list[2]).innerText &&
    getById(list[0]).innerText != ""
  ) {
    win = true;
    winner = getById(list[0]).innerText;
  } else if (
    getById(list[3]).innerText == getById(list[4]).innerText &&
    getById(list[4]).innerText == getById(list[5]).innerText &&
    getById(list[3]).innerText != ""
  ) {
    win = true;
    winner = getById(list[3]).innerText;
  } else if (
    getById(list[6]).innerText == getById(list[7]).innerText &&
    getById(list[7]).innerText == getById(list[8]).innerText &&
    getById(list[6]).innerText != ""
  ) {
    win = true;
    winner = getById(list[6]).innerText;
  }
  // Vertical
  else if (
    getById(list[0]).innerText == getById(list[3]).innerText &&
    getById(list[3]).innerText == getById(list[6]).innerText &&
    getById(list[0]).innerText != ""
  ) {
    win = true;
    winner = getById(list[0]).innerText;
  } else if (
    getById(list[1]).innerText == getById(list[4]).innerText &&
    getById(list[4]).innerText == getById(list[7]).innerText &&
    getById(list[1]).innerText != ""
  ) {
    win = true;
    winner = getById(list[1]).innerText;
  } else if (
    getById(list[2]).innerText == getById(list[5]).innerText &&
    getById(list[5]).innerText == getById(list[8]).innerText &&
    getById(list[2]).innerText != ""
  ) {
    win = true;
    winner = getById(list[2]).innerText;
  }
  // Diagonal
  else if (
    getById(list[0]).innerText == getById(list[4]).innerText &&
    getById(list[4]).innerText == getById(list[8]).innerText &&
    getById(list[0]).innerText != ""
  ) {
    win = true;
    winner = getById(list[0]).innerText;
  } else if (
    getById(list[2]).innerText == getById(list[4]).innerText &&
    getById(list[4]).innerText == getById(list[6]).innerText &&
    getById(list[2]).innerText != ""
  ) {
    win = true;
    winner = getById(list[2]).innerText;
  }
  // Check if its filled
  else if (allowed.every((val, i, arr) => val === true)) {
    win = true;
    winner = "Nobody";
  }
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
