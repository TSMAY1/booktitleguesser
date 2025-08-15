let wordList = [];
let secretWord = "";
let attempts = 0;

let messageElement = document.getElementById("message");
let displayWord = document.getElementById("displayWord");
let guessInput = document.getElementById("guessInput");
let guessBtn = document.getElementById("guessBtn");
let resetBtn = document.getElementById("resetBtn");

guessBtn.disabled = true;

fetch("book_titles.json")
    .then(response => response.json())
    .then(data => {
        wordList = data;
        startGame();
        //secretWord = pickRandomTitle();
        //guessBtn.disabled = false;
    });

function startGame() {
    secretWord = pickRandomTitle();
    guessedWord = Array(secretWord.length).fill("_");
    attempts = 10;
    guessBtn.disabled = false;

        for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === " ") {
            guessedWord[i] = " ";
            updateDisplay();
        }
    }

    updateDisplay();
}

function pickRandomTitle() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function updateDisplay() {
    displayWord = guessedWord
        .map(char => char === " " ? "\u00A0\u00A0\u00A0" : char) // extra non-breaking spaces for actual spaces
        .join(" ");
    document.getElementById("displayWord").textContent = displayWord;
    messageElement.textContent = `Attempts left: ${attempts}`;
}

guessBtn.addEventListener("click", () => {
    let guess = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (guess.length !== 1) {
        messageElement.textContent = "Please enter a single letter.";
        return;
    }

    if (secretWord.toLowerCase().includes(guess)) {
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i].toLowerCase() === guess) {
                guessedWord[i] = secretWord[i];
                updateDisplay();
            }
        }
    } else {
        attempts--;
}

    if (!guessedWord.includes("_")) {
        messageElement.textContent = `🎉 You guessed it! The title was: ${secretWord}`;
        guessBtn.disabled = true;
    } else if (attempts <= 0) {
        messageElement.textContent = `😢 You've run out of attempts. The title was: ${secretWord}`;
        guessBtn.disabled = true;
    } else {
        updateDisplay();
    }
});

resetBtn.addEventListener("click", startGame);
