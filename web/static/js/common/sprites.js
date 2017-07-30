import * as pixi from 'pixi.js';

export function spawnDraggableSword(resources, app, tink) {
  var sword = new pixi.Sprite(resources.sword.texture);
  sword.scale.x = 2;
  sword.scale.y = 2;
  sword.x = app.renderer.width / 2;
  sword.y = app.renderer.height / 2;

  sword.anchor.x = 0.5;
  sword.anchor.y = 0.5;

  app.stage.addChild(sword);

  app.ticker.add(function() {
    sword.rotation += 0.01;
  });

  tink.makeDraggable(sword);
}

export const sheet = (() => {
  let _tileSize;
  const characters = [];

  const loadCharacters = resources => {
    for (let i = 0; i < 32; ++i) {
      // console.log(i % 6, (i / 6 | 0) + 9);

      characters[i] = newTexture(
        resources,
        i % 6, ((i / 6) | 0) + 9,
        1, 1
      );
    }
  };

  const newTexture = (resources, x, y, width, height) => {
    return new pixi.Texture(
      resources.sheet.texture,
      new pixi.Rectangle(
        _tileSize * x,
        _tileSize * y,
        _tileSize * width,
        _tileSize * height
      )
    );
  };

  const load = (res, tileSize = 16) => {
    _tileSize = tileSize;
    loadCharacters(res);
  };

  return {
    load: load,
    newTexture: newTexture,
    characters: characters,
  };
})();
