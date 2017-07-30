import { helloNewPlayer,
  changeLoginView,
  changeViewAfterLogout } from './ui';

import { connectToSocket } from '../socket';


var userCreated = false;


export function initNewPlayer(players, currentPlayer) {
  helloNewPlayer(currentPlayer);
  changeLoginView();
}

export function executeLogin() {
  var username = document.getElementById('username').value;
  connectToSocket(username.trim(), document);
}

export function handlePlayerLeft() {
  changeViewAfterLogout();
}

// handler for the join button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('joinButton').addEventListener('click', executeLogin);
});

document.addEventListener('keyup', function(event) {
  if (!userCreated
      && (event.keyCode === 13)) {
    event.preventDefault();
    executeLogin();
    userCreated = true;
  }
  // case 37: 
  // case 38:
  // case 39:
  // case 40:
});
