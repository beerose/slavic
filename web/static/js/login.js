import { connectToSocket } from './socket';

const playersDiv = document.getElementById('players');
const activePlayersList = playersDiv.querySelector('ul');
const currentPlayerDiv = document.getElementById('currentPlayer');
const login = document.getElementById('login');
const leftButton = document.getElementById('leftButton');
const joinButton = document.getElementById('joinButton');

// const game = document.getElementById('game');
const chatEnabledInfo = document.getElementById('enable-chat');

let userCreated = false;

export function executeLogin() {
  var username = document.getElementById('username').value;
  connectToSocket(username.trim(), document);
}

// handler for the join button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('joinButton').addEventListener('click', executeLogin);
});


function updatePlayersList(players) {
  playersDiv.classList.remove('hidden');
  activePlayersList.innerHTML = Object.keys(players).join('<br />');
}

function initNewPlayer(players, currentPlayer) {
  currentPlayerDiv.innerHTML += 'Hello ' + currentPlayer + '!';
  console.log('cokolwiek');
  // game.classList.remove('hidden');
  login.classList.add('hidden');
  leftButton.classList.remove('hidden');
  chatEnabledInfo.classList.remove('hidden');
  document.querySelector('section#userPanel')
    .classList.add('hidden');
}

function handlePlayerLeft() {
  joinButton.classList.remove('hidden');
  currentPlayerDiv.innerHTML = 'Bye!';
  leftButton.classList.add('hidden');
  playersDiv.classList.add('hidden');
  login.classList.remove('hidden');
}

document.addEventListener('keyup', function(event) {
  if (!userCreated
      && (event.keyCode === 13)) {
    event.preventDefault();
  }
  userCreated = true;
  executeLogin();
  // case 37: 
  // case 38:
  // case 39:
  // case 40:
});

export { updatePlayersList, initNewPlayer, handlePlayerLeft };
