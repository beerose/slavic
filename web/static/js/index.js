// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
import 'phoenix_html';
import * as pixi from 'pixi.js';
pixi.settings.SCALE_MODE = pixi.SCALE_MODES.NEAREST;
import Tink from 'vendor/tink';

import socket from './socket';
import 'login';
import { joinChannel } from './common/channels';

const app = new pixi.Application();
const tink = new Tink(pixi, app.view);

document.querySelector('#game').appendChild(app.view);

//

function preload() {

}

function create() {
  pixi.loader
    .add('sword', 'images/sword.png')
    .load(function(loader, resources) {
      var sword = new pixi.Sprite(resources.sword.texture);
      sword.scale.x = 4;
      sword.scale.y = 4;
      // Setup the position of the bunny
      sword.x = app.renderer.width / 2;
      sword.y = app.renderer.height / 2;

      sword.anchor.x = 0.5;
      sword.anchor.y = 0.5;

      app.stage.addChild(sword);

      app.ticker.add(function() {
        sword.rotation += 0.01;
      });

      tink.makeDraggable(sword);
    });

  // socket.connect();
  // const channel = socket.channel('shrine', {});
  // joinChannel(channel, () => {
  //  console.log('Joined channel.');
  // });
}
console.log('Hello.');
console.log('KK.');

// Import local files
//
// socket.connect();
// const channel = socket.channel('shrine', {});
// joinChannel(channel, () => {
//  console.log('Joined channel.');
// });


function update() {
  tink.update();
  requestAnimationFrame(update);
  console.log('..');
}

function render() {

}

function shutdown() {

}

preload();
create();
update();
