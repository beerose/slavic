import * as pix from 'pixi.js';
import Tink from 'vendor/tink';


export const pixi = pix;
pixi.settings.SCALE_MODE = pixi.SCALE_MODES.NEAREST;

export const app = new pixi.Application();
export const tink = new Tink(pixi, app.view);
export const logicalSize = {
  x: 512,
  y: 256,
};

export function updateCanvasSize() {
  let scaleFactor = Math.min(
    window.innerWidth / logicalSize.x,
    window.innerHeight / logicalSize.y
  );

  scaleFactor = Math.min(scaleFactor, 3.2); // cap to constant?
  const newWidth = logicalSize.x * scaleFactor;
  const newHeight = logicalSize.y * scaleFactor;

  app.renderer.resize(newWidth, newHeight);
  // console.log('scale factor', scaleFactor);
  app.stage.scale.set(scaleFactor);
}

export const loader = pixi.loader;
export function load(resources, afterLoad) {
  for (const k in resources) {
    loader.add(k, resources[k]);
  }
  loader.load(afterLoad);
  return loader;
}
