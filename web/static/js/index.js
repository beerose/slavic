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
import { sheet, spawnDraggableSword } from './common/sprites';
import { spawnHero } from './common/players';
import load from './common/loader';

const app = new pixi.Application();
const tink = new Tink(pixi, app.view);

document.querySelector('#game').appendChild(app.view);

let resources;
//

function preload() {
  load({
    sword: 'images/sword.png',
    sheet: 'images/sheet.png',
  }, (loader, res) => {
    console.log('Resources loaded.');
    window.resources = res; // DDEBUG:
    resources = res;
    sheet.load(res);
    create();
  });
}

function create() {
  heroSelection.show();

  spawnDraggableSword(resources, app, tink);
  update();
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

let time = performance.now();
function update() {
  const now = performance.now();
  const dt = now - time;
  time = now;

  requestAnimationFrame(update);
  tink.update();


  // console.log(dt);
}

function render() {

}

function shutdown() {

}

preload();


var heroSelection = {
  show() {
    const selection = new pixi.Container();
    heroSelection.container = selection;
    const coolScreenConstant = 12;
    selection.position.x = app.view.width / coolScreenConstant;
    selection.position.y = app.view.height / coolScreenConstant;
    app.stage.addChild(selection);

    for (let i = 0; i < 32; ++i) {
      spawnHero(app, tink, i,
                (((i / 6)|0) + 1) * 70, (i % 6 + 1) * 70,
                selection);
    }
  },
  hide() {
    heroSelection.container.destroy();
  },
};
