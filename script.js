let wordList = [];
let secretWord = "";
let attempts = 0;

let messageElement = document.getElementById("message");
let displayWordElement = document.getElementById("displayWord");
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

    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === " ") {
            guessedWord[i] = " ";
        }
    }

    attempts = 10;
    updateDisplay();
    guessBtn.disabled = false;
}

function pickRandomTitle() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function updateDisplay() {
    displayWordElement.textContent = guessedWord.join(" ");
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
            }
        }
    } else {
        attempts--;
}

    if (!guessedWord.includes("_")) {
        messageEl.textContent = `🎉 You guessed it! The title was: ${secretWord}`;
        guessBtn.disabled = true;
    } else if (attempts <= 0) {
        messageElement.textContent = `😢 You've run out of attempts. The title was: ${secretWord}`;
        guessBtn.disabled = true;
    } else {
        updateDisplay();
    }
});

resetBtn.addEventListener("click", startGame);
