import { connectToSocket } from './socket';

const messagesContainer = document.getElementById('messages');
const playersDiv = document.getElementById('players');
const currentPlayerDiv = document.getElementById('currentPlayer');
const login = document.getElementById('login');
const leftButton = document.getElementById('leftButton');
const joinButton = document.getElementById('joinButton');
const game = document.getElementById('game');
const chatEnabledInfo = document.getElementById('enable-chat');

// handler for the join button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('joinButton').addEventListener('click', () => {
    var username = document.getElementById('username').value;
    connectToSocket(username.trim(), document);
  });
});


function updatePlayersList(players) {
  playersDiv.classList.remove('hidden');
  messagesContainer.innerHTML = Object.keys(players).join('<br />');
}

function initNewPlayer(players, currentPlayer) {
  // currentPlayerDiv.innerHTML += 'Hello ' + currentPlayer + '!';
  console.log('cokolwiek');
  game.classList.remove('hidden');
  login.classList.add('hidden');
  leftButton.classList.remove('hidden');
  chatEnabledInfo.classList.remove('hidden');
}

function handlePlayerLeft() {
  joinButton.classList.remove('hidden');
  currentPlayerDiv.innerHTML = 'Bye!';
  leftButton.classList.add('hidden');
  playersDiv.classList.add('hidden');
  login.classList.remove('hidden');
}


export { updatePlayersList, initNewPlayer, handlePlayerLeft }
;
