const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper Functions
getElementById = (id) => document.getElementById(id);
getElementByClassName = (className) =>
  document.getElementsByClassName(className);

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
  // Horizontal
  if (
    getElementById(list[0]).innerText == getElementById(list[1]).innerText &&
    getElementById(list[1]).innerText == getElementById(list[2]).innerText &&
    getElementById(list[0]).innerText != ""
  ) {
    win = true;
    winner = getElementById(list[0]).innerText;
  } else if (
    getElementById(list[3]).innerText == getElementById(list[4]).innerText &&
    getElementById(list[4]).innerText == getElementById(list[5]).innerText &&
    getElementById(list[3]).innerText != ""
  ) {
    win = true;
    winner = getElementById(list[3]).innerText;
  } else if (
    getElementById(list[6]).innerText == getElementById(list[7]).innerText &&
    getElementById(list[7]).innerText == getElementById(list[8]).innerText &&
    getElementById(list[6]).innerText != ""
  ) {
    win = true;
    winner = getElementById(list[6]).innerText;
  }
  // Vertical
  else if (
    getElementById(list[0]).innerText == getElementById(list[3]).innerText &&
    getElementById(list[3]).innerText == getElementById(list[6]).innerText &&
    getElementById(list[0]).innerText != ""
  ) {
    win = true;
    winner = getElementById(list[0]).innerText;
  } else if (
    getElementById(list[1]).innerText == getElementById(list[4]).innerText &&
    getElementById(list[4]).innerText == getElementById(list[7]).innerText &&
    getElementById(list[1]).innerText != ""
  ) {
    win = true;
    winner = getElementById(list[1]).innerText;
  } else if (
    getElementById(list[2]).innerText == getElementById(list[5]).innerText &&
    getElementById(list[5]).innerText == getElementById(list[8]).innerText &&
    getElementById(list[2]).innerText != ""
  ) {
    win = true;
    winner = getElementById(list[2]).innerText;
  }
  // Diagonal
  else if (
    getElementById(list[0]).innerText == getElementById(list[4]).innerText &&
    getElementById(list[4]).innerText == getElementById(list[8]).innerText &&
    getElementById(list[0]).innerText != ""
  ) {
    win = true;
    winner = getElementById(list[0]).innerText;
  } else if (
    getElementById(list[2]).innerText == getElementById(list[4]).innerText &&
    getElementById(list[4]).innerText == getElementById(list[6]).innerText &&
    getElementById(list[2]).innerText != ""
  ) {
    win = true;
    winner = getElementById(list[2]).innerText;
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
