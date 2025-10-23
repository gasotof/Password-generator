// Lista de emojis x4
const EMOJI_FACE_LIST = ['😀','😃','😄','😁','😆'];
const EMOJI_FRUITS_LIST = ['🍇','🍈','🍉','🍊','🍋'];
const EMOJI_WEATHER_LIST = ['⛅', '☔' ,'🌈', '🌂' ,'⛄'];
const EMOJI_CELEBRATIONS_LIST = ['🎁', '🎃' ,'🎈' ,'🎓', '🎂'];

// Seleccionar aleatoriamente 
const getRandomEmojiFace = () => {
  const index = Math.floor(Math.random() * EMOJI_FACE_LIST.length);
  return EMOJI_FACE_LIST[index];
}

const getRandomFruits = () => {
  const index = Math.floor(Math.random() * EMOJI_FRUITS_LIST.length);
  return EMOJI_FRUITS_LIST[index];
}

const getRandomWeather = () => {
  const index = Math.floor(Math.random() * EMOJI_WEATHER_LIST.length);
  return EMOJI_WEATHER_LIST[index];
}

const getRandomCelebration = () => {
  const index = Math.floor(Math.random() * EMOJI_CELEBRATIONS_LIST.length);
  return EMOJI_CELEBRATIONS_LIST[index];
}

// Combinar los seleccionados (4 emojis)
const getEmojiPassword = () => {
  const randomFace = getRandomEmojiFace();
  const randomCelebration = getRandomCelebration();
  const randomFruit = getRandomFruits();
  const randomWeather = getRandomWeather();
  return `${randomFace} ${randomFruit} ${randomWeather} ${randomCelebration}`;
}

// Largo de la contraseña
const getLengthPassword = (length) => {
  if (length === 1) {
    return getRandomEmojiFace();
  }
  
  if (length === 2) {
    return `${getRandomCelebration()} ${getRandomFruits()}`;
  }
  
  if (length === 3) {
    return `${getRandomEmojiFace()} ${getRandomWeather()} ${getRandomCelebration()}`;
  }
  
  if (length === 4) {
    return `${getRandomFruits()} ${getRandomWeather()} ${getRandomEmojiFace()} ${getRandomCelebration()}`;
  }
  
  return '';
};

console.log(getLengthPassword(1));  // 1 emoji: 😄
console.log(getLengthPassword(2));  // 2 emojis: 🎈 🍉
console.log(getLengthPassword(3));  // 3 emojis: 😁 ⛄ 🎓
console.log(getLengthPassword(4));  // 4 emojis: 🍊 🌂 😀 🎁
