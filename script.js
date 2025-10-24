// js/script.js
window.getEmojiPassword = function(length) {
  const password = [];
  for (let i = 0; i < length; i++) {
    password.push(window.getRandomEmoji());
  }
  return password.join(' ');
};
