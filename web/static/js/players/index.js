import { pixi } from '../pix';
import { sheet } from '../common/sprites';
import {
  makeInteractive,
  prepareLabel,
} from './optional';

export function spawnHero(
  app, tink, heroKind = 0,
  x = undefined,
  y = undefined,
  { parent, interactive, name },
  callback
) {
  const hero = new pixi.Sprite(
    sheet.characters[heroKind]
  );
  hero.kind = heroKind;
  hero.scale.x = 2;
  hero.scale.y = 2;
  hero.x = x || app.renderer.width / 2;
  hero.y = y || app.renderer.height / 2;
  if (interactive && interactive[0]) {
    makeInteractive(hero, tink, interactive[1]);
  }

  hero.anchor.x = 0.5;
  hero.anchor.y = 0.5;

  if (parent) {
    parent.addChild(hero);
  } else {
    app.stage.addChild(hero);
  }

  if (name) {
    hero.name = name;
    hero.addChild(prepareLabel(name));
  }

  if (callback) callback(hero);
}


