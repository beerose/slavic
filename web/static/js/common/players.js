import * as pixi from 'pixi.js';
import { sheet } from './sprites';

export function spawnHero(
  app, tink, heroKind = 0,
  x = undefined, y = undefined,
  parent = undefined) {
  const hero = new pixi.Sprite(
    sheet.characters[heroKind]
  );
  hero.scale.x = 4;
  hero.scale.y = 4;
  hero.x = x || app.renderer.width / 2;
  hero.y = y || app.renderer.height / 2;

  hero.anchor.x = 0.5;
  hero.anchor.y = 0.5;

  if (parent) {
    parent.addChild(hero);
  } else {
    app.stage.addChild(hero);
  }
}
