const messageBox = document.getElementById('chat-box');

function updateMessageBox(message, author) {
  messageBox.innerHTML += author + ': ' + message + '</br>';
}

function pushMessage(channel) {
  var message = document.getElementById('chat-inputarea').value;
  channel.push('player:send_message', { message: message });
}

function handleNewMessaged(channel, chatOpen) {
  if (chatOpen) {
    pushMessage(channel);
    setTimeout(1000);
    var chat = document.getElementById('chat-box');
    chat.scrollTop = chat.scrollHeight;
    document.getElementById('chat-inputarea').value = '';
    document.getElementById('chat-input').classList.add('hidden');
    chatOpen = false;
  } else {
    document.getElementById('chat-input').classList.remove('hidden');
    document.getElementById('chat-inputarea').focus();
    chatOpen = true;
  }
  return chatOpen;
}

export { updateMessageBox, pushMessage, handleNewMessaged };

