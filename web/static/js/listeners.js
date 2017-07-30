import { updateCanvasSize } from './pix';
import { keyboard } from './controls';

export function setupListeners() {
  window.addEventListener('resize', updateCanvasSize, false);
  window.addEventListener('orientationchange', updateCanvasSize, false);
  window.onbeforeunload = () => {
    console.log('Player left!');
  // send stuff to server
  };
}

document.addEventListener('keydown', function(event) {
  keyboard.notifyButtonDown(event);
}, false);
