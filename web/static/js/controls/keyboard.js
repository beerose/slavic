export const keyboard = {};
export default keyboard;

keyboard.notifyButtonDown = event => {
  const keyCode = event.keyCode;
  switch (keyCode) {
  case 38:
    break;
  default:
    console.log(keyCode);
    break;
  }
};
