import charm from 'vendor/charm';
import pointer from '../controls/pointer';
import { pixi } from '../pix';

export function makeInteractive(sprite, tink, onClickCallback) {
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
    if (!sprite) return;

    disabled = false;
    if (sprite.transform && sprite.position
        && !pointer.hitTestSprite(sprite)
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
  sprite.tap = () => {
    onClickCallback(sprite);
  };
}

export function prepareLabel(str) {
  const style = new pixi.TextStyle({
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#ff9900'], // gradient
    fillGradientStops: [0.4, 1],
    stroke: '#4a1850',
    strokeThickness: 2,
    wordWrap: true,
    wordWrapWidth: 440,
  });

  const text = new pixi.Text(str, style);
  text.scale.x = 0.5;
  text.scale.y = 0.5;
  text.y += 8;
  text.x -= text.width / 2 - 1;
  return text;
}
