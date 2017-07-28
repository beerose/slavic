// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
import 'phoenix_html';
import Phaser from 'phaser-ce';

import socket from './socket';
import { joinChannel } from './common/channels';

new Phaser.Game(800, 600, Phaser.CANVAS);
// /
// /console.log('Starting game.');
// /const game = new Phaser.Game({
// /  // width: 800,
// /  // height: 600,
// /  // renderer: Phaser.AUTO,
// /  // antialias: false,
// /  // parent: 'game',
// /  // state: {
// /  //  preload: preload,
// /  //  create: create,
// /  //  update: update,
// /  //  render: render,
// /  //  shutdown: shutdown,
// /  // },
// /});
// /
// /window.game = game;

console.log('... <>');

function preload() {

}

function create() {
  // console.log('create game');
//
  // socket.connect();
  // const channel = socket.channel('shrine', {});
  // joinChannel(channel, () => {
  //  console.log('Joined channel.');
  // });
}

function update() {

}

function render() {

}

function shutdown() {

}

