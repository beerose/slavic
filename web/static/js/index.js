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
// import 'login';
import { joinChannel } from './common/channels';
import { sheet, spawnDraggableSword } from './common/sprites';
import { spawnHero } from './common/players';
import load from './common/loader';
import shuffle from './common/shuffle';
import pointer from './common/pointer';
import playerChooseHero from './fetch';
import { channel } from './socket';

const app = new pixi.Application();
const tink = new Tink(pixi, app.view);

export var playerState = {};
// playerState.hero.kind

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
  heroSelection.show(enterShrine);

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

function enterShrine(heroKind) {
  console.log('Enter shrine.');
  const room = new pixi.Container();
  app.stage.addChild(room);
  const player = spawnHero(
    app, tink, heroKind,
    logicalSize.x / 2 - 16, logicalSize.y / 2 - 16,
    { parent: room, name: playerState.name }, px => {
      playerState.hero = px;
      console.log(playerState);
    });
}

var heroSelection = {
  choose(hero) {
    console.log(hero, 'clicked!');
    heroSelection.hide();
    if (heroSelection.callback) {
      heroSelection.callback(hero.kind);
    }
  },
  show(callback) {
    heroSelection.callback = callback;
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
    // heroSelection.container.children.forEach(x => {
    //  x.position.x = -1000;
    //  x.position.y = -1000;
    //  x.over = null;
    //  x.press = null;
    //  x.out = null;
    //  x.enabled = false;
    //  x.destroy();
    // });
    heroSelection.container.destroy();
    tink.buttons = [];
  },
};

window.addEventListener('resize', updateCanvasSize, false);
window.addEventListener('orientationchange', updateCanvasSize, false);
preload();
