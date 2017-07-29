export const chat = document.getElementById('chat');
export const messages = chat.querySelector('ul');
export const input = chat.querySelector('section');
export const textarea = input.querySelector('textarea');
export const sendButton = input.querySelector('button');

export function focusChat() {
  textarea.focus();
}

export function showInput() {
  input.classList.remove('hidden');
}

export function hideInput() {
  input.classList.add('hidden');
}

export function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight;
}

export function clearTextArea() {
  textarea.value = '';
}

export function updateMessageBox(message, author) {
  messages.appendChild(renderMessage(message, author));
  scrollToBottom();
}

function renderMessage(msg, author) {
  const li = document.createElement('li');
  li.innerHTML = `
  <strong>${author}:</strong>
  <p>${msg}</p>`;
  return li;
}
