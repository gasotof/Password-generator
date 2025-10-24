import getRandomEmoji from "./RANDOM_EMOJI.js";

// Export only the emoji password generator
export const getEmojiPassword = (length) => {
  const password = [];
  for (let i = 0; i < length; i++) {
    password.push(getRandomEmoji());
  }
  return password.join(' ');
};