import { Sound } from './sounds.js';

export function Timer({
  minutesDisplay,
  secondsDisplay,
  resetControls,
}) {
  let timerTimeOut;
  let minutes = Number(minutesDisplay.textContent);

  function updateTimerDisplay(newMinutes, seconds) {
    newMinutes = newMinutes ?? minutes;
    seconds = seconds ?? 0;
    minutesDisplay.textContent = String(newMinutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
  }

  function reset() {
    updateTimerDisplay(minutes, 0)
    clearTimeout(timerTimeOut)
  }

  function countdown() {
    timerTimeOut = setTimeout(() => {
      let seconds = Number(secondsDisplay.textContent);
      let minutes = Number(minutesDisplay.textContent);
      let isFinished = minutes <= 0 && seconds <= 0;
      updateTimerDisplay(minutes, 0);

      if (isFinished) {
        resetControls();
        updateTimerDisplay();
        Sound().timeEnd();
        return;
      }

      if (seconds <= 0) {
        seconds = 60;
        --minutes;
      }

      updateTimerDisplay(minutes, String(seconds - 1))
      countdown();
    }, 1000);
  }

  function updateMinutes(newMinutes) {
    minutes = newMinutes;
  }

  function hold() {
    clearTimeout(timerTimeOut)
  }

  return {
    updateTimerDisplay,
    reset,
    countdown,
    updateMinutes,
    hold
  }
}

