import { Modal } from './modal.js';
import { Alert } from './alert.js';
import { notNumber, calculateIMC } from './utils.js';

// Variaveis
const form = document.querySelector('form');
const inputWeight = document.querySelector('#weight');
const inputHeight = document.querySelector('#height');

form.onsubmit = (e) => {
  e.preventDefault();

  const weight = inputWeight.value;
  const height = inputHeight.value;
  const weighOrHeightIsNotANumber = notNumber(weight) || notNumber(height);

  if (weighOrHeightIsNotANumber) {
    Alert.open();
    return;
  }

  const message = calculateIMC(weight, height);
  Modal.displayResultMessage(message);
}

