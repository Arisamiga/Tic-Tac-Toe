sleep = (ms) => return new Promise((resolve) => setTimeout(resolve, ms));

// Global variables
var playerOne = false;
var list = ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"];
var gameStarted = false;
var indicator = document.getElementById("indicator");
var reset = document.getElementById("reset");
var allowed = [false, false, false, false, false, false, false, false, false];

function setupPlayers() {
  playerOne = Boolean(Math.round(Math.random()));
  playerOne == false ? indicator.innerText = "Its X's Turn" : indicator.innerText = "Its O's Turn";
}

async function startGame() {
  gameStarted = true;
  document.getElementsByClassName("StartGamebt")[0].style.display = "none";
  // Reseting the board
  for(let i of list){
    document.getElementById(i).innerHTML = "\xA0";
    await sleep(200);
  }
  // Destroy StartGamebg
  document.getElementsByClassName("StartGamebg")[0].style.display = "none";
  indicator.style.display = "block";
  setupPlayers();
}

function checkWin() {
  var win = false;
  var winner = "";
  // Horizontal
  if (
    document.getElementById(list[0]).innerText ==
      document.getElementById(list[1]).innerText &&
    document.getElementById(list[1]).innerText ==
      document.getElementById(list[2]).innerText &&
    document.getElementById(list[0]).innerText != ""
  ) {
    win = true;
    winner = document.getElementById(list[0]).innerText;
  } else if (
    document.getElementById(list[3]).innerText ==
      document.getElementById(list[4]).innerText &&
    document.getElementById(list[4]).innerText ==
      document.getElementById(list[5]).innerText &&
    document.getElementById(list[3]).innerText != ""
  ) {
    win = true;
    winner = document.getElementById(list[3]).innerText;
  } else if (
    document.getElementById(list[6]).innerText ==
      document.getElementById(list[7]).innerText &&
    document.getElementById(list[7]).innerText ==
      document.getElementById(list[8]).innerText &&
    document.getElementById(list[6]).innerText != ""
  ) {
    win = true;
    winner = document.getElementById(list[6]).innerText;
  }
  // Vertical
  else if (
    document.getElementById(list[0]).innerText ==
      document.getElementById(list[3]).innerText &&
    document.getElementById(list[3]).innerText ==
      document.getElementById(list[6]).innerText &&
    document.getElementById(list[0]).innerText != ""
  ) {
    win = true;
    winner = document.getElementById(list[0]).innerText;
  } else if (
    document.getElementById(list[1]).innerText ==
      document.getElementById(list[4]).innerText &&
    document.getElementById(list[4]).innerText ==
      document.getElementById(list[7]).innerText &&
    document.getElementById(list[1]).innerText != ""
  ) {
    win = true;
    winner = document.getElementById(list[1]).innerText;
  } else if (
    document.getElementById(list[2]).innerText ==
      document.getElementById(list[5]).innerText &&
    document.getElementById(list[5]).innerText ==
      document.getElementById(list[8]).innerText &&
    document.getElementById(list[2]).innerText != ""
  ) {
    win = true;
    winner = document.getElementById(list[2]).innerText;
  }
  // Diagonal
  else if (
    document.getElementById(list[0]).innerText ==
      document.getElementById(list[4]).innerText &&
    document.getElementById(list[4]).innerText ==
      document.getElementById(list[8]).innerText &&
    document.getElementById(list[0]).innerText != ""
  ) {
    win = true;
    winner = document.getElementById(list[0]).innerText;
  } else if (
    document.getElementById(list[2]).innerText ==
      document.getElementById(list[4]).innerText &&
    document.getElementById(list[4]).innerText ==
      document.getElementById(list[6]).innerText &&
    document.getElementById(list[2]).innerText != ""
  ) {
    win = true;
    winner = document.getElementById(list[2]).innerText;
  }
  // Check if its filled
  else if (allowed.every((val, i, arr) => val === true)) {
    win = true;
    winner = "Nobody";
  }
  if (win && winner != "" && winner != ' ') {
    finishGame(winner);
  }

  return win, winner;
}

function finishGame(winner) {
  gameStarted = false;
  reset.style.display = "block";
  winner == "Nobody" ? indicator.innerText = "Nobody won! How sad..." :  indicator.innerText = "The winner is " + winner + "!";
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
