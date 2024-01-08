let randomNumber = generateRandomNumber();
let userLogAttempts = [];
let attempts = 0;
const easyAttempts = 10;
const hardAttempts = 5;
let maxAttempts = 0;

const userInput = document.querySelector('.user-input');
const guessFeedback = document.querySelector('.guess-feedback');
const userAttempts = document.querySelector('.user-attempts');
const newGame = document.querySelector('.button-new-game');
newGame.hidden = true;
userInput.disabled = true;

function enableUserInput() {
  userInput.disabled = false;
}

// Generare număr random
function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Eveniment pentru modul Easy
document.querySelector('.button-easy').addEventListener('click', function () {
  maxAttempts = easyAttempts;
  document.querySelector('.button-hard').hidden = true;
  newGame.hidden = false;
  enableUserInput();
  resetGame();
});

// Eveniment pentru modul Hard
document.querySelector('.button-hard').addEventListener('click', function () {
  maxAttempts = hardAttempts;
  document.querySelector('.button-easy').hidden = true;
  newGame.hidden = false;
  enableUserInput();
  resetGame();
});

// Funcție pentru verificarea input-ului utilizatorului
function checkUserInput() {
  const enteredNumber = Number(userInput.value);

  if (enteredNumber === randomNumber) {
    guessFeedback.innerHTML = 'Great! You got it right.';
    setGameOver();
  } else if (enteredNumber < randomNumber) {
    guessFeedback.innerHTML = "That's too low. Try Again!";
  } else if (enteredNumber > randomNumber) {
    guessFeedback.innerHTML = "That's too high. Try Again!";
  }

  userLogAttempts.push(enteredNumber);
  updateAttemptsDisplay();
  attempts++;
  document.querySelector('.number-attempts').innerHTML = attempts;

  if (attempts === maxAttempts && enteredNumber !== randomNumber) {
    guessFeedback.innerHTML = `Game over. The correct number was ${randomNumber}`;
    setGameOver();
  }
}

// Funcție pentru afișarea log-ului de încercări anterioare
function updateAttemptsDisplay() {
  userAttempts.innerHTML = userLogAttempts.join(', ');
}

// Eveniment pentru tastarea Enter
userInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    checkUserInput();
    userInput.value = '';
  }
});

// Funcție pentru setarea stării de final de joc
function setGameOver() {
  userInput.disabled = true;
  newGame.hidden = false;
}

// Eveniment pentru butonul "New game"
newGame.addEventListener('click', function () {
  document.querySelector('.button-hard').hidden = false;
  document.querySelector('.button-easy').hidden = false;
  newGame.hidden = true;
  resetGame();
  enableUserInput();
});

// Funcție pentru resetarea jocului
function resetGame() {
  randomNumber = generateRandomNumber();
  userLogAttempts = [];
  updateAttemptsDisplay();
  attempts = 0;
  document.querySelector('.number-attempts').innerHTML = attempts;
  guessFeedback.innerHTML = 'Enter your guess below and press Enter';
  userInput.disabled = false;
  userInput.value = '';
}
