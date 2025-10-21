        const lengthSlider = document.getElementById('length-slider');
        const lengthValue = document.getElementById('length-value');
        const uppercaseSlider = document.getElementById('uppercase-slider');
        const uppercaseValue = document.getElementById('uppercase-value');
        const numbersSlider = document.getElementById('numbers-slider');
        const numbersValue = document.getElementById('numbers-value');
        const specialSlider = document.getElementById('special-slider');
        const specialValue = document.getElementById('special-value');
        const emojiSlider = document.getElementById('emoji-slider');
        const emojiValue = document.getElementById('emoji-value');
        const passwordDisplay = document.getElementById('password-display');
        const generateButton = document.getElementById('generate-button');
        const copyButton = document.getElementById('copy-button');
        const judgementDialog = document.getElementById('judgement-dialog');
        const judgementTitle = document.getElementById('judgement-title');
        const judgementMessage = document.getElementById('judgement-message');
        const closeDialogButton = document.getElementById('close-dialog-button');

        // --- Character Sets ---
        // These are the building blocks for our passwords. Each is an array of strings.
        const charSets = {
            lowercase: 'abcdefghijklmnopqrstuvwxyz'.split(''),
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            numbers: '0123456789'.split(''),
            special: '!@#$%^&*()_+-=[]{}|;:,.<>?'.split(''),
            emojis: ['😀', '😎', '🚀', '💻', '❤️', '🎉', '🔥', '👍', '🤔', '😂', '🤯', 'Secure', '🔑', '🔒', '🛡️']
        };

        // --- Utility Functions ---

        /**
         * A function to get a random item from any given array.
         * @param {Array} arr - The array to pick from.
         * @returns {*} A random element from the array.
         */
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

        /**
         * A function to shuffle an array using the Fisher-Yates algorithm.
         * This ensures the final password characters are in a truly random order.
         * @param {Array} arr - The array to be shuffled.
         * @returns {Array} The shuffled array.
         */
        const shuffleArray = (arr) => {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
            }
            return arr;
        };

        // --- Core Logic ---

        /**
         * The main function to generate the password.
         */
        const generatePassword = () => {
            // 1. Get current values from sliders
            const passwordLength = parseInt(lengthSlider.value);
            const uppercaseCount = parseInt(uppercaseSlider.value);
            const numberCount = parseInt(numbersSlider.value);
            const specialCount = parseInt(specialSlider.value);
            const emojiCount = parseInt(emojiSlider.value);

            let passwordChars = [];

            // 2. Use .map() to generate arrays of required characters
            // For each count (e.g., uppercaseCount), we create an array of that many random uppercase letters.
            const uppercaseChars = Array.from({ length: uppercaseCount }).map(() => getRandomElement(charSets.uppercase));
            const numberChars = Array.from({ length: numberCount }).map(() => getRandomElement(charSets.numbers));
            const specialChars = Array.from({ length: specialCount }).map(() => getRandomElement(charSets.special));
            const emojiChars = Array.from({ length: emojiCount }).map(() => getRandomElement(charSets.emojis));

            // 3. Combine all the specifically requested characters
            passwordChars = [...uppercaseChars, ...numberChars, ...specialChars, ...emojiChars];

            // 4. Calculate how many more characters we need to meet the total length
            const remainingLength = passwordLength - passwordChars.length;

            // 5. Fill the rest of the password with random lowercase letters
            // This ensures the password always meets the desired length.
            const lowercaseChars = Array.from({ length: Math.max(0, remainingLength) }).map(() => getRandomElement(charSets.lowercase));
            passwordChars = [...passwordChars, ...lowercaseChars];

            // 6. Shuffle the combined array and convert it to a string using .reduce()
            // .reduce() iterates over the array, building up a single string result.
            const finalPassword = shuffleArray(passwordChars).reduce((acc, char) => acc + char, '');

            // 7. Display the result
            passwordDisplay.textContent = finalPassword;
            
            // 8. Judge the password and show the dialog
            judgePassword(passwordLength);
        };
        
        /**
         * Shows a dialog with feedback based on the password's length.
         * @param {number} length - The length of the generated password.
         */
        const judgePassword = (length) => {
            let title = '';
            let message = '';
            
            if (length < 12) {
                title = "That's a bit short!";
                message = "This password is okay, but longer is always stronger. Try aiming for 12+ characters.";
            }
            if (length >= 12 && length < 18) {
                title = "A solid choice!";
                message = "Great length! This password offers a good balance of security and memorability.";
            }
            if (length >= 18 && length < 26) {
                title = "Fort Knox level!";
                message = "Excellent! This is a very strong password that would be tough for anyone to crack.";
            }
            if (length >= 26) {
                title = "Impossible to remember!";
                message = "This is incredibly secure. Perfect for a password manager, but good luck typing it!";
            }
            
            judgementTitle.textContent = title;
            judgementMessage.textContent = message;
            judgementDialog.classList.remove('hidden');
        };

        /**
         * Copies the generated password to the user's clipboard.
         */
        const copyPassword = () => {
            const password = passwordDisplay.textContent;
            if (!password || password === 'Click Generate!') return;
            
            // Using a temporary textarea is a robust way to copy text.
            const textarea = document.createElement('textarea');
            textarea.value = password;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            // Provide visual feedback
            copyButton.textContent = 'Copied!';
            copyButton.classList.replace('bg-blue-500', 'bg-green-500');
            setTimeout(() => {
                copyButton.textContent = 'Copy';
                copyButton.classList.replace('bg-green-500', 'bg-blue-500');
            }, 2000);
        };
        
        // --- Event Listeners Setup ---
        
        // This function connects our JavaScript logic to the HTML elements.
        const setupEventListeners = () => {
            // Update the displayed value whenever a slider is moved.
            const sliders = [
                { slider: lengthSlider, valueEl: lengthValue },
                { slider: uppercaseSlider, valueEl: uppercaseValue },
                { slider: numbersSlider, valueEl: numbersValue },
                { slider: specialSlider, valueEl: specialValue },
                { slider: emojiSlider, valueEl: emojiValue },
            ];
            
            // We can use .map here to add an event listener to each slider config.
            sliders.map(item => {
                item.slider.addEventListener('input', (e) => {
                    item.valueEl.textContent = e.target.value;
                });
            });

            // Connect functions to button clicks.
            generateButton.addEventListener('click', generatePassword);
            copyButton.addEventListener('click', copyPassword);
            closeDialogButton.addEventListener('click', () => {
                judgementDialog.classList.add('hidden');
            });
        };

        // --- Initialization ---
        // Run our setup function once the page has loaded.
        document.addEventListener('DOMContentLoaded', () => {
            setupEventListeners();
            // Generate a password on page load to get things started.
            generatePassword();
        });