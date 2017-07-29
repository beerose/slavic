import { Socket } from 'phoenix';
import { updatePlayersList, initNewPlayer, handlePlayerLeft } from './login';
import { updateMessageBox, pushMessage, handleNewMessaged } from './chat';
import { changePosition } from './player';


let players = {};
// Start the connection to the socket and joins the channel
// Does initialization and key binding

function bindLeftKeys(channel, document) {
  var chatOpen = false;

  document.getElementById('leftButton').addEventListener('click', () => {
    channel.push('player:left', { });
  });

  document.getElementById('send-message').addEventListener('click', () => {
    pushMessage(channel);
  });

  document.addEventListener('keyup', function(event) {
    event.preventDefault();
    switch (event.keyCode) {
    case 13:
      chatOpen = handleNewMessaged(channel, chatOpen);

    // case 37: 
    // case 38:
    // case 39:
    // case 40:
    }
  });
}


function connectToSocket(player, document) {
  // connects to the socket endpoint
  const socket = new Socket('/socket', { params: { player_id: player } });
  socket.connect();
  const channel = socket.channel('lobby:init', {});
  var currentPlayer = player;

  // joins the channel
  channel.join()
  // on joining channel, we receive the current players list
    .receive('ok', initialPlayers => {
      players = initialPlayers.players;
      initNewPlayer(players, currentPlayer);
      console.log('Joined to channel');
      bindLeftKeys(channel, document);
      setupChannelMessageHandlers(channel);
    });
}


function setupChannelMessageHandlers(channel) {
  // New player joined the game
  channel.on('player:joined', ({ player: player }) => {
    console.log(player);
    players[player.id] = player;
    updatePlayersList(players);
  });
  // Player left the game
  channel.on('player:left', ({ player: players_updated }) => {
    updatePlayersList(players_updated);
    handlePlayerLeft();
  });

  channel.on('player:send_message', ( { player: { message: message, author: author } }) => {
    updateMessageBox(message, author);
  });
}


export { connectToSocket };
