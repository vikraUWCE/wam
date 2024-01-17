//Game Mode 1

const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const highScoreDisplay = document.querySelector("#high-score");

let result = 0;
let hitPosition;
let currentTime = 15;
let timerId = null;
let highScore = localStorage.getItem("highScore") || 0;

let countDownTimerId; // Declare countDownTimerId here

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add("mole");

  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result++;
    }
    score.textContent = result;

    if (result > highScore) {
      highScore = result;
      localStorage.setItem("highScore", highScore);
      highScoreDisplay.textContent = highScore;
    }

    hitPosition = null;
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 1000);
}

moveMole();

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert("Game Over! Your final score is:" + result);
  }
}

function clearHighScore() {
  localStorage.setItem("highScore", 0);
  alert("High score cleared! Try clicking reload again.");
}

countDownTimerId = setInterval(countDown, 1000); // Set countDownTimerId here

highScoreDisplay.textContent = highScore;
