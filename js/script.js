const guessedLetters = document.querySelector(".guessed-letters");
//list where the player’s guessed letters will appear
const guessButton = document.querySelector(".guess");
//button with the text “Guess!”
const textInput = document.querySelector(".letter");
//text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress");
//where the word in progress will appear
const remaining = document.querySelector(".remaining");
//where the remaining guesses will display
const remainingSpan = document.querySelector(".remaining span");
//span in remaining guesses paragraph
const message = document.querySelector(".message");
//where messages appear after player guesses a letter
const playAgain = document.querySelector(".play-again");
//hidden play again button

const word = "magnolia";

const progressUpdate = function (word) {
    const letterPlaceholder = [];
    for (const letter of word) {
        console.log(letter);
        letterPlaceholder.push("●");
    }
    wordInProgress.innerText = letterPlaceholder.join("");
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = textInput.value;
    console.log(guess);
    textInput.value = "";
});

progressUpdate(word);

console.log(progressUpdate);