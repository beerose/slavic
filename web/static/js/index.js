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

const app = new pixi.Application();
const tink = new Tink(pixi, app.view);

document.querySelector('#game').appendChild(app.view);

//

function preload() {
  sheet.load();
}

function create() {
  for (let i = 0; i < 32; ++i) {
    spawnHero(app, tink, i, ((i / 6)|0) * 48 + 32, (i % 6) * 48 + 32);
  }
}


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
create();
update();
