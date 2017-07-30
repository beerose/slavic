import 'phoenix_html';
import * as Matter from 'matter-js';

import charm from 'vendor/charm';

import { sheet, spawnDraggableSword } from './common/sprites';
import { spawnHero } from './players';
import heroSelection from './players/heroSelection';

import pointer from './controls/pointer';
import state from './state';
window.state = state;
import * as sync from './sync';

import { setupListeners } from './listeners';
import {
  pixi, load,
  app, tink,
  updateCanvasSize,
  logicalSize,
} from './pix';

document.querySelector('#game').appendChild(app.view);

state.playersContainer = new pixi.Container();
app.stage.addChild(state.playersContainer);

export function receivePlayers(received) {
  const players = state.players;
  for (const name in received) {
    if (!players[name]) {
      players[name] = {};
    }
    Object.assign(players[name], received[name]);
    if (!players[name].sprite) {
      players[name].sprite = spawnHero(
        app, tink, players[name].kind, players[name].x || 20, players[name].y || 20,
        { name: players[name].id,
          parent: state.playersContainer }, () => {} );
    }
  }
  console.log('received', players, state.players);
}

export function destroyInvalidHeroes() {
  for (const sprite of state.playersContainer.children) {
    console.log(sprite, ' <AEFA>');
    if (sprite.kind) {
      const playerFullInfo = state.players[sprite.name];
      if (!playerFullInfo || !playerFullInfo.sprite) {
        state.playersContainer.removeChild(sprite);
        delete state.players[sprite.name];
        sprite.destroy();
      }
    }
  }
}

export function updateHeroPositions() {
  for (const name in state.players) {
    if (name !== state.player.name) {
      const info = state.players[name];
      const sprite = info.sprite;

      if (sprite) {
        sprite.position.x = info.x || sprite.position.x;
        sprite.position.y = info.y || sprite.position.y;
      }
    }
  }
}

export function updateSprites() {
  destroyInvalidHeroes();
  updateHeroPositions();
}


let engine;
let mrender;

function preload() {
  engine = Matter.Engine.create();
  mrender = Matter.Render.create({
    element: app.view,
    engine: engine,
  });
  var ground = Matter.Bodies.rectangle(10, 10, 50, 50, { isStatic: true });
  Matter.World.add(engine.world, [ground]);
  Matter.Engine.run(engine);
  Matter.Render.run(mrender);
  console.log(ground);

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
  console.log('heroSelection', heroSelection);
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

  if (state.hero) {
    state.hero.x += state.hero.vx;
    state.hero.y += state.hero.vy;
  }

  updateSprites();
}

function render() {

}

function shutdown() {

}

function enterShrine(heroKind) {
  console.log('Enter shrine.');
  const room = new pixi.Container();


  app.stage.addChild(room);

  const name = state.player.name;
  spawnHero(
    app, tink, heroKind,
    logicalSize.x / 2 - 16, logicalSize.y / 2 - 16,
    { parent: room, name: name },
    player => {
      state.hero = player;

      // player.body = Matter.Bodies.rectangle(
      //  player.position.x,
      //  player.position.y,
      //  player.width,
      //  player.height
      // );


      player.vx = 0;
      player.vy = 0;

      state.players[name] =
        state.players[name] || {};
      state.players[name].sprite = player;

      sync.onHeroChosen(player.kind);
    });
}

setupListeners();
preload();
