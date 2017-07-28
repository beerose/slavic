// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
import 'phoenix_html';
import * as pixi from 'pixi.js';

import socket from './socket';
import { joinChannel } from './common/channels';

const app = new pixi.Application();

document.querySelector('#game').appendChild(app.view);

//

function preload() {

}

function create() {
  pixi.loader
    .add('bunny', 'assets/phoenix4.png')
    .load(function(loader, resources) {
    // This creates a texture from a 'bunny.png' image.
      var bunny = new pixi.Sprite(resources.bunny.texture);

      // Setup the position of the bunny
      bunny.x = app.renderer.width / 2;
      bunny.y = app.renderer.height / 2;

      // Rotate around the center
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;

      // Add the bunny to the scene we are building.
      app.stage.addChild(bunny);

      // Listen for frame updates
      app.ticker.add(function() {
      // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
      });
    });

  socket.connect();
  const channel = socket.channel('shrine', {});
  joinChannel(channel, () => {
    console.log('Joined channel.');
  });
}

function update() {

}

function render() {

}

function shutdown() {

}

preload();
create();
