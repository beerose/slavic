import { Socket } from 'phoenix';
import { updatePlayersList, initNewPlayer, handlePlayerLeft } from './login';
import { updateMessageBox } from './chat';

let players = {};
// Start the connection to the socket and joins the channel
// Does initialization and key binding

function bindLeftKeys(channel, document) {
  document.getElementById('leftButton').addEventListener('click', () => {
    channel.push('player:left', { });
  });

  document.getElementById('send-message').addEventListener('click', () => {
    var message = document.getElementById('chat-textarea').value;
    channel.push('player:send_message', { message: message });
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
