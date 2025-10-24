import getRandomEmoji from "./RANDOM_EMOJI.js";

export const getEmojiPassword = (length) => {
  const password = [];
  for (let i = 0; i < length; i++) {
    password.push(getRandomEmoji());
  }
  return password.join(' ');
};
