export const playersDiv = document.getElementById('players');
export const activePlayersList = playersDiv.querySelector('ul');
export const currentPlayerDiv = document.getElementById('currentPlayer');
export const login = document.getElementById('login');
export const leftButton = document.getElementById('leftButton');
export const joinButton = document.getElementById('joinButton');

const chatEnabledInfo = document.getElementById('enable-chat');


export function helloNewPlayer(player) {
  currentPlayerDiv.innerHTML = '<p>Hello ' + player + '</p>';
  setTimeout(() => currentPlayerDiv.style.display = 'none', 1800);
}

export function changeLoginView() {
  login.classList.add('hidden');
  leftButton.classList.remove('hidden');
  document.querySelector('section#userPanel')
    .classList.add('hidden');
}

export function updatePlayersList(players) {
  playersDiv.classList.remove('hidden');
  activePlayersList.innerHTML = Object.keys(players).join('<br />');
}

export function changeViewAfterLogout() {
  joinButton.classList.remove('hidden');
  currentPlayerDiv.innerHTML = 'Bye!';
  leftButton.classList.add('hidden');
  playersDiv.classList.add('hidden');
  login.classList.remove('hidden');
}
