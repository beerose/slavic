import { pixi, app, tink, logicalSize } from '../pix';
import { spawnHero } from './index';
import shuffle from '../common/shuffle';

export const heroSelection = {
  choose(hero) {
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

export default heroSelection;
