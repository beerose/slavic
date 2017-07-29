import * as pixi from 'pixi.js';

export const loader = pixi.loader;
export default function load(resources, afterLoad) {
  for (const k in resources) {
    loader.add(k, resources[k]);
  }
  loader.load(afterLoad);
  return loader;
}
