//Game Mode 3

const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const highScoreDisplay = document.querySelector("#high-score");

let result = 0;
let hitPosition;
let currentTime = 15;
let timerId = null;
let highScore3 = localStorage.getItem("highScore") || 0; //learned how to store as local data from chatGPT
let missClick = 0;

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add("mole");

  // Set a random background image for the mole
  let moleImages = ["mole.jpg", "arnav.jpeg", "ken.jpeg"]; // Add more image URLs as needed
  let randomImage = moleImages[Math.floor(Math.random() * moleImages.length)];

  // Update the background image property
  randomSquare.style.backgroundImage = `url(${randomImage})`;

  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result += 1 + result;
      if (hitPosition == "ken.jpeg") {
        alert("You Lost. DON'T HIT KEN!!");
        location.reload();
      }
    } else {
      result -= 1 + result;
      missClick++;
    }
    result = Math.max(result, 0);

    score.textContent = result;

    if (result > highScore3) {
      highScore3 = result;
      localStorage.setItem("highScore", highScore3);
      highScoreDisplay.textContent = highScore3;
    }

    // Reset background image of the clicked square
    square.style.backgroundImage = "";

    if (missClick >= 3) {
      alert("YOU LOST! YOU MISSED THE MOLE 3 TIMES. TRY AGAIN!!");
      location.reload();
    }
    hitPosition = null;
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 650);
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

let countDownTimerId = setInterval(countDown, 500);

highScoreDisplay.textContent = highScore;
