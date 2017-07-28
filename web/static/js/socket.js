import { Socket } from 'phoenix';

let me;
let players = {};
const messagesContainer = document.getElementById('messages').innerHTML;

// Start the connection to the socket and joins the channel
// Does initialization and key binding
function connectToSocket(player_id, document) {
  // connects to the socket endpoint
  const socket = new Socket('/socket', { params: { player_id: player_id } });
  socket.connect();
  const channel = socket.channel('lobby:init', {});
  me = player_id;

  // joins the channel
  channel.join()
    .receive('ok', initialPlayers => { // on joining channel, we receive the current players list
      console.log('Joined to channel');
      players = initialPlayers.players;
      console.log(players);
      setupChannelMessageHandlers(channel);
    });
}

function setupChannelMessageHandlers(channel) {
  // New player joined the game
  channel.on('player:joined', ({ player: player }) => {
    messagesContainer.append(`<br/>${player.id} joined`);
    messagesContainer.scrollTop( messagesContainer.prop('scrollHeight'));
    players[player.id] = player;
  });

  // Player changed position in board
  channel.on('player:position', ({ player: player }) => {
    players[player.id] = player;
  });
}

export { connectToSocket };
