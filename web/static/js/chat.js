const messageBox = document.getElementById('chat-box');

function updateMessageBox(message, author) {
  messageBox.innerHTML += author + ': ' + message + '</br>';
}

function pushMessage(channel) {
  var message = document.getElementById('chat-textarea').value;
  channel.push('player:send_message', { message: message });
}

export { updateMessageBox, pushMessage };


