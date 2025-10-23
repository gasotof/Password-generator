import EMOJI_LIST from "./EMOJI_LIST.js";

const getRandomEmoji = () => {
  const index = Math.floor(Math.random() * EMOJI_LIST.length);
  return EMOJI_LIST[index];
};

export default getRandomEmoji;
