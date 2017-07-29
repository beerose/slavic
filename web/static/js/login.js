import { connectToSocket } from './socket';

const messagesContainer = document.getElementById('messages');
const playersDiv = document.getElementById('players');
const currentPlayerDiv = document.getElementById('currentPlayer');
const login = document.getElementById('login');
const leftButton = document.getElementById('leftButton');
const joinButton = document.getElementById('joinButton');


// handler for the join button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('joinButton').addEventListener('click', () => {
    var email = document.getElementById('email').value;
    connectToSocket(email.trim(), document);
  });
});


function updatePlayersList(players) {
  playersDiv.style.display = 'inline';
  messagesContainer.innerHTML = Object.keys(players).join('<br />');
}

function initNewPlayer(players, currentPlayer) {
  currentPlayerDiv.innerHTML += 'Hello ' + currentPlayer + '!';
  console.log('cokolwiek');
  login.style.display = 'none';
  leftButton.style.display = 'inline';
}

function handlePlayerLeft() {
  login.style.display = 'inline';
  joinButton.style.display = 'inline';
  currentPlayerDiv.innerHTML = 'Bye!';
  leftButton.style.display = 'none';
  playersDiv.style.display = 'none';
}

export { updatePlayersList, initNewPlayer, handlePlayerLeft }
;
