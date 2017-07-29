import { Socket } from 'phoenix';

let me;
let players = {};
const messagesContainer = document.getElementById('messages');
let socket;
let channel;
// Start the connection to the socket and joins the channel
// Does initialization and key binding

function bindLeftKeys(channel, document) {
  document.getElementById('leftButton').addEventListener('click', () => {
    console.log('button');
    console.log(channel);
    channel.push('player:left', { });
  });
}

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
      document.getElementById('root').innerHTML = me;
      players = initialPlayers.players;
      document.getElementById('login').style.display = 'none';
      document.getElementById('leftButton').style.display = 'inline';
      bindLeftKeys(channel, document);
      setupChannelMessageHandlers(channel);
    });
}


function setupChannelMessageHandlers(channel) {
  // New player joined the game
  channel.on('player:joined', ({ player: player }) => {
    players[player.id] = player;
    document.getElementById('active_players').style.display = 'inline';
    messagesContainer.innerHTML = Object.keys(players).join('<br />');
  });
  channel.on('player:left', ({ player: players_updated }) => {
    console.log('cokolwiek');
    console.log(players_updated, 'left1');
    document.getElementById('messages').style.display = 'none';
    console.log(document.getElementById('messages'));
    // messagesContainer.innerHTML = Object.keys(players_updated).join('<br />');
  });
}


export { connectToSocket };
