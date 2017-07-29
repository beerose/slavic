import {
  focusChat,
  showInput,
  hideInput,
  clearTextArea,
  textarea,
} from './ui';

function pushMessage(channel) {
  var message = textarea.value;
  if (message.trim() !== '') {
    channel.push('player:send_message', { message: message });
  }
}

function handleNewMessaged(channel, chatOpen) {
  if (chatOpen) {
    pushMessage(channel);
    hideInput();
    clearTextArea();
    chatOpen = false;
  } else {
    showInput();
    focusChat();
    chatOpen = true;
  }
  return chatOpen;
}

export { pushMessage, handleNewMessaged };

