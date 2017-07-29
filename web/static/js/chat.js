const messageBox = document.getElementById('chat-box');

function updateMessageBox(message, author) {
  messageBox.innerHTML += author + ': ' + message + '</br>';
}

export { updateMessageBox };


