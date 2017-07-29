// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
import 'phoenix_html';
import * as pixi from 'pixi.js';
pixi.settings.SCALE_MODE = pixi.SCALE_MODES.NEAREST;

import Tink from 'vendor/tink';
import charm from 'vendor/charm';

import socket from './socket';
import 'login';
import { joinChannel } from './common/channels';
import { sheet, spawnDraggableSword } from './common/sprites';
import { spawnHero } from './common/players';
import load from './common/loader';
import shuffle from './common/shuffle';
import pointer from './common/pointer';

const app = new pixi.Application();
const tink = new Tink(pixi, app.view);

document.querySelector('#game').appendChild(app.view);

let resources;
const logicalSize = {
  x: 512,
  y: 256,
};
function updateCanvasSize() {
  let scaleFactor = Math.min(
    window.innerWidth / logicalSize.x,
    window.innerHeight / logicalSize.y
  );

  scaleFactor = Math.min(scaleFactor, 3.2); // cap to constant?
  const newWidth = logicalSize.x * scaleFactor;
  const newHeight = logicalSize.y * scaleFactor;

  app.renderer.resize(newWidth, newHeight);
  console.log('scale factor', scaleFactor);
  app.stage.scale.set(scaleFactor);
}


function preload() {
  pointer.init(tink);

  updateCanvasSize();
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


let time = performance.now();
function update() {
  const now = performance.now();
  const dt = now - time;
  time = now;

  requestAnimationFrame(update);
  tink.update();
  charm.update();


  // console.log(dt);
}

function render() {

}

function shutdown() {

}

preload();


var heroSelection = {
  choose(hero) {
    console.log(hero, 'clicked!');
  },
  show() {
    const selection = new pixi.Container();
    heroSelection.container = selection;
    const coolScreenConstant = 80;


    app.stage.addChild(selection);

    shuffle([...Array(32).keys()]).forEach((kind, i) => {
      spawnHero(
        app, tink, kind,
        (((i / 4)|0) + 1) * 35, (i % 4 + 1) * 35,
        {
          parent: selection,
          interactive: [true, heroSelection.choose],
        });
    });

    selection.position.x = logicalSize.x / 2 - selection.width / 2 - 16;
    console.log('selection pos', selection.position.x);
    selection.position.y = app.view.height / coolScreenConstant;
  },
  hide() {
    heroSelection.container.destroy();
  },
};

window.addEventListener('resize', updateCanvasSize, false);
window.addEventListener('orientationchange', updateCanvasSize, false);
