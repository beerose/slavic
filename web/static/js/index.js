// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
import 'phoenix_html';
// import Phaser from 'phaser-ce';
// 
// var game = new Phaser.Game();
// 
console.log('Hello.');
console.log('KK.');


import { connectToSocket, leftTheSocket } from './socket';

// handler for the join button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('joinButton').addEventListener('click', () => {
    var email = document.getElementById('email').value;
    // if (/@/.test(email)) {
    console.log(email);
    connectToSocket(email.trim(), document);
    // } else {
    //  alert('You should enter your email to join the game');
    // }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('leftButton').addEventListener('click', () => {
    var email = document.getElementById('email').value;
    leftTheSocket(email, document);
  });
});

// Import local files
//
// socket.connect();
// const channel = socket.channel('shrine', {});
// joinChannel(channel, () => {
//  console.log('Joined channel.');
// });


function update() {

}

function render() {

}

function shutdown() {

}

