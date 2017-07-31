import playerController from '../players/controller';
console.log('Player Controller', playerController);
export const keyboard = {};
export default keyboard;

keyboard.notifyButtonDown = event => {
  const keyCode = event.keyCode;
  switch (keyCode) {
  case 37: /* ArrowLeft */
    playerController.moveLeft();
    break;

  case 38: /* ArrowUp */
    playerController.moveUp();
    break;

  case 39: /* ArrowRight */
    playerController.moveRight();
    break;

  case 40: /* ArrowDown */
    playerController.moveDown();
    break;

  default:
    console.log(keyCode);
    break;
  }
};
