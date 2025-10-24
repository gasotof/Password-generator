import { getEmojiPassword } from './script.js';

const generateButton = document.getElementById('generate-btn');
const emojiInput = document.getElementById('emoji-input');
const copyButton = document.getElementById('copy-btn');

const defaults = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
};

const shoot = () => {
  const conf = window.confetti || (typeof confetti !== 'undefined' ? confetti : null);
  if (!conf) return;

  conf({
    ...defaults,
    particleCount: 35,
    scalar: 2,
    shapes: ['emoji'],
  });
};

const onGenerateClick = () => {
  const checkedInput = document.querySelector('input[name="password-length"]:checked');
  const passwordLength = parseInt(checkedInput.value, 10);

  const newPassword = getEmojiPassword(passwordLength);
  emojiInput.value = newPassword;

  generateButton.classList.remove('blast');
  void generateButton.offsetWidth;
  generateButton.classList.add('blast');
  setTimeout(() => generateButton.classList.remove('blast'), 700);

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};

const onCopyClick = () => {
  const passwordToCopy = emojiInput.value;

  navigator.clipboard.writeText(passwordToCopy)
    .then(() => {
      copyButton.textContent = 'Copied!';
      setTimeout(() => { copyButton.textContent = 'Copy'; }, 1500);
    })
    .catch(() => {
      copyButton.textContent = 'Error ❌';
      setTimeout(() => { copyButton.textContent = 'Copy 📋'; }, 1500);
    });
};

generateButton.addEventListener('click', onGenerateClick);
copyButton.addEventListener('click', onCopyClick);

const initialCheckedInput = document.querySelector('input[name="password-length"]:checked');
const initialLength = parseInt(initialCheckedInput.value, 10);
emojiInput.value = getEmojiPassword(initialLength);
