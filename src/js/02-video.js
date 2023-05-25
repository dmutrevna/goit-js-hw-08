import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime) {
  player.setCurrentTime(savedTime);
}

const saveCurrentTime = throttle(() => {
  player.getCurrentTime().then(time => {
    localStorage.setItem('videoplayer-current-time', time);
  });
}, 1000);

player.on('timeupdate', saveCurrentTime);

player.on('ended', () => {
  localStorage.removeItem('videoplayer-current-time');
});
