import { Controls } from "./controls.js";
import { Timer } from "./timer.js";
import { Sound } from './sounds.js';
import { Events } from './events.js';
import {
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonSet,
  minutesDisplay,
  secondsDisplay
} from '../js/elements.js';

let timerTimeOut;

const { play, pause, getMinutes, reset } = Controls({
  buttonPlay,
  buttonPause,
  buttonSet,
  buttonStop
});

const { countdown, reset: resetTimer, updateTimerDisplay, updateMinutes, hold } = Timer({
  minutesDisplay,
  secondsDisplay,
  resetControls: reset,
});

const { pressButton, bgAudio } = Sound();

Events({
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
  bgAudio
});