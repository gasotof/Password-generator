import getRandomEmoji from "./RANDOM_EMOJI.js";

const getEmojiPassword = (length) => {
  let password = [];
  for (let i = 0; i < length; i++) {
    password.push(getRandomEmoji()); 
  }
  return password.join('');
}

console.log(getEmojiPassword(11));
