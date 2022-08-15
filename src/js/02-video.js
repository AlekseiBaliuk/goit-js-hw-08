import Player from '@vimeo/player';
// const throttle = require('lodash.throttle');
import throttle from 'lodash.throttle';

const PLAY_TIME = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const onPlay = function (data) {
  const stringifyData = JSON.stringify(data);
  localStorage.setItem(PLAY_TIME, stringifyData);
};

player.on('timeupdate', throttle(onPlay, 1000));

function resumePlay() {
  if (JSON.parse(localStorage.getItem(PLAY_TIME)) === null) return;

  const currentTime = JSON.parse(localStorage.getItem(PLAY_TIME))['seconds'];

  player
    .setCurrentTime(currentTime)
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;

        default:
          break;
      }
    });
}

resumePlay();
