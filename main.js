  const emojiList = [
    "😢", "😄", "😕", "😂", "😍", "😎", "🤯", "😇", "😈", "👻", "💀", "👽", "🤖", "🔥", "💧", "🌈", "⭐", "🍀", "🎉",
    "🎬", "🎥", "🍿", "🦸", "🦸‍♂️", "🦸‍♀️", "🦹", "🦹‍♂️", "🦹‍♀️", "🧙", "🧙‍♂️", "🧙‍♀️", "🧛", "🧛‍♂️", "🧛‍♀️",
    "🧟", "🧟‍♂️", "🧟‍♀️", "🧞", "🧞‍♂️", "🧞‍♀️", "🐉", "🐲", "🦄", "🦖", "🦕", "🕷️", "🦇", "👸", "🤴", "👑",
    "🏴‍☠️", "👨‍🚀", "👩‍🚀", "🤠", "🎭", "📽️"
  ];

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const getRandomFrom = (source) => source[Math.floor(Math.random() * source.length)];

  function updateSliderValue(sliderId, outputId) {
    const value = document.getElementById(sliderId).value;
    document.getElementById(outputId).textContent = value;
  }

function toggleSlider(checkboxId, sliderId, relatedGroupId = null) {
  const checked = document.getElementById(checkboxId).checked;
  const slider = document.getElementById(sliderId);

  slider.disabled = !checked;
  slider.classList.toggle("disabled", !checked);

  // Auto-disable checkboxes in a group if a group ID is provided
  if (relatedGroupId) {
    const group = document.getElementById(relatedGroupId);
    const checkboxes = group.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
      cb.disabled = !checked;
      cb.parentElement.classList.toggle("disabled", !checked);
    });
  }
}

  function generateLetters(length) {
    const useLower = document.getElementById("useLowercase").checked;
    const useUpper = document.getElementById("useUppercase").checked;
    const useNumbers = document.getElementById("useNumbers").checked;

    let pool = "";
    if (useLower) pool += letters;
    if (useUpper) pool += letters.toUpperCase();
    if (useNumbers) pool += "0123456789";
    if (!pool.length) return "";

    let result = "";
    for (let i = 0; i < length; i++) {
      result += getRandomFrom(pool);
    }
    return result;
  }

  function generateSymbols(length) {
    if (!document.getElementById("useSymbols").checked) return "";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += getRandomFrom(symbols);
    }
    return result;
  }

  function generateEmojis(length) {
    if (!document.getElementById("useEmojis").checked) return "";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += getRandomFrom(emojiList);
    }
    return result;
  }

  function shuffleString(str) {
    return [...str].sort(() => Math.random() ).join('');
  }

  function generatePassword() {
    const emojiLength = +document.getElementById("emojiLength").value || 0;
    const symbolLength = +document.getElementById("symbolsLength").value || 0;
    const letterLength = +document.getElementById("letterLength").value || 0;

    const emojis = generateEmojis(emojiLength);
    const symbs = generateSymbols(symbolLength);
    const letters = generateLetters(letterLength);

    const finalPassword = shuffleString(symbs + emojis + letters);
    document.getElementById("output").textContent = finalPassword;
    document.getElementById("copiedMsg").textContent = "";
  }

  function copyToClipboard() {
    const password = document.getElementById("output").textContent;
    if (!password) return;
    navigator.clipboard.writeText(password)
      .then(() => document.getElementById("copiedMsg").textContent = "✅ Copied to clipboard!")
      .catch(() => document.getElementById("copiedMsg").textContent = "❌ Failed to copy.");
  }

  // Initial setup
// Initial setup
toggleSlider('useEmojis', 'emojiLength');
toggleSlider('useSymbols', 'symbolsLength');
toggleSlider('useLetters', 'letterLength', 'letterOptions');
