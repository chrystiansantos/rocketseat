import {
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonSet,
  buttonSoundOn,
  buttonSoundOff,
} from '../js/elements.js'

export function Events({
  play,
  countdown,
  pressButton,
  pause,
  hold,
  timerTimeOut,
  clearTimeout,
  reset,
  resetTimer,
  getMinutes,
  updateTimerDisplay,
  updateMinutes,
  bgAudio,
}) {
  buttonPlay.addEventListener('click', function () {
    play();
    countdown();
    pressButton();
  });

  buttonPause.addEventListener('click', function () {
    pause();
    hold();
    clearTimeout(timerTimeOut);
    pressButton();
  });

  buttonStop.addEventListener('click', function () {
    reset();
    resetTimer();
    pressButton();
  });

  buttonSoundOff.addEventListener('click', function () {
    buttonSoundOn.classList.remove('hide');
    buttonSoundOff.classList.add('hide');
    bgAudio.play();
  });

  buttonSoundOn.addEventListener('click', function () {
    buttonSoundOff.classList.remove('hide');
    buttonSoundOn.classList.add('hide');
    bgAudio.pause();
  });

  buttonSet.addEventListener('click', function () {
    let newMinutes = getMinutes();
    if (!newMinutes) {
      resetTimer();
      return;
    }

    updateTimerDisplay(newMinutes, 0);
    updateMinutes(newMinutes);
  });
}