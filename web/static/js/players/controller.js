let player;
export const controller = {
  possess(whom) {
    player = whom;
  },
  moveRight() {
    player.position.x += 32;
  },
  moveLeft() {
    player.position.x -= 32;
  },
  moveUp() {
    player.position.y -= 32;
  },
  moveDown() {
    player.position.y += 32;
  },
};


export default controller;
