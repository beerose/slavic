import { connectToSocket, leftTheSocket } from './socket';

// handler for the join button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('joinButton').addEventListener('click', () => {
    var email = document.getElementById('email').value;
    console.log(email);
    connectToSocket(email.trim(), document);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('leftButton').addEventListener('click', () => {
    var email = document.getElementById('email').value;
    leftTheSocket(email, document);
  });
});
