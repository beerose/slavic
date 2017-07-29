import * as pixi from 'pixi.js';
import { sheet } from './sprites';
import charm from 'vendor/charm';
import pointer from './pointer';

export function spawnHero(
  app, tink, heroKind = 0,
  x = undefined,
  y = undefined,
  { parent, interactive }) {
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
}

function makeInteractive(sprite, tink, onClickCallback) {
  const scale = 1.4;
  const yShift = 4;
  const originalScaleX = sprite.scale.x;
  const originalScaleY = sprite.scale.y;
  const originalY = sprite.position.y;
  const originalX = sprite.position.x;
  let disabled = false;
  const resetChange = () => {
    if (disabled) return;
    charm.scale(
      sprite,
      originalScaleX,
      originalScaleY,
      6
    );
    disable();
  };
  function recover() {
    disabled = false;
    if (!pointer.hitTestSprite(sprite)
        && sprite.scale.x !== originalScaleX) {
      resetChange();
    } else {
      setTimeout(recover, 100);
    }
  }
  const disable = () => {
    disabled = true;
    setTimeout(recover, 100);
  };

  tink.makeInteractive(sprite);
  sprite.out = resetChange;
  sprite.over = () => {
    if (disabled) return;
    console.log('over');
    charm.scale(
      sprite,
      originalScaleY * scale,
      originalScaleY * scale,
      6
    );
    // sprite.position.y = originalY - yShift;
    disable();
  };
  sprite.release = () => {

  };
  sprite.press = () => {
    onClickCallback(sprite);
  };
}

