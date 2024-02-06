// Vars
let randomNumber = Math.round(Math.random() * 10);
let xAttempts = 0;

// Refs
const screen1 = document.querySelector('.screen1')
const screen2 = document.querySelector('.screen2')
const inputNumber = document.querySelector('#inputNumber');
const btnTry = document.querySelector('#btnTry');
const btnReset = document.querySelector('#btnReset');
document.addEventListener('keypress', resetGame)

// Function
function handleTryClick(event) {
  event.preventDefault();
  if (Number(inputNumber.value) === 0) {
    inputNumber.classList.add('invalid');
    return;
  }

  if (Number(inputNumber.value) === randomNumber) {
    toggleScreen();
    document.querySelector('.screen2 h2')
      .innerText = `Acertou em ${xAttempts} tentativas.`;
  }

  inputNumber.classList.remove('invalid');
  xAttempts++;
}

function handleResetClick() {
  randomNumber = Math.round(Math.random() * 10);
  xAttempts = 0;
  toggleScreen();
  inputNumber.value = "";
}

function resetGame(e) {
  if (e.key == 'Enter' && randomNumber === Number(inputNumber.value)) {
    handleResetClick();
  }
}

function toggleScreen() {
  screen1.classList.toggle('hide');
  screen2.classList.toggle('hide');
}

// Events
btnTry.addEventListener('click', handleTryClick)
btnReset.addEventListener('click', handleResetClick)