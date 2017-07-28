// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import 'phoenix_html';
// import Phaser from 'phaser-ce';
// 
// var game = new Phaser.Game();
// 
console.log('Hello.');
console.log('KK.');


import { connectToSocket } from './socket';

// handler for the join button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('joinButton').addEventListener('click', () => {
    var email = document.querySelector('#email')[0].innerHTML();
    if (/@/.test(email)) {
      console.log('click');
      connectToSocket(email.trim(), document);
    } else {
      alert('You should enter your email to join the game');
    }
  });
});
// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"


