// js/RANDOM_EMOJI.js
window.getRandomEmoji = function() {
  const index = Math.floor(Math.random() * window.EMOJI_LIST.length);
  return window.EMOJI_LIST[index];
};
