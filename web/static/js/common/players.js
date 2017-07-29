import * as pixi from 'pixi.js';
import { sheet } from './sprites';

export function spawnHero(
  app, tink, heroKind = 0,
  x = undefined, y = undefined) {
  pixi.loader
    .load(function(loader, resources) {
      const hero = new pixi.Sprite(
        sheet.characters[heroKind]
      );
      hero.scale.x = 4;
      hero.scale.y = 4;
      hero.x = x || app.renderer.width / 2;
      hero.y = y || app.renderer.height / 2;

      hero.anchor.x = 0.5;
      hero.anchor.y = 0.5;

      app.stage.addChild(hero);

      // setInterval(() => {
      //   heroKind = (heroKind + 1) % 32;
      //   hero.texture = sheet.characters[heroKind];
      // }, 250);
      app.ticker.add(function() {
        hero.rotation += 0.01;
      });
    });
}
