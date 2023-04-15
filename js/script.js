const guessedList = document.querySelector(".guessed-letters");
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

let word = "magnolia";
guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const wordList = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await wordList.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholders(word);
};

getWord();

const placeholders = function (word) {
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
    message.innerText = "";
    const goodGuess = validateText(guess);

    if (goodGuess) {
        makeGuesses(guess);
    }
});

const validateText = function (input) {
    const acceptedLetter = /[a-zA-Z]/

    if (input.length === 0) {
        message.innerText = "Submit a letter in the box.";
    } else if (input.length > 1) {
        message.innerText = "Only one letter can be guessed at a time.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "This word contains only letters from A to Z.";
    } else {
        return input;
    }
};

const makeGuesses = function (guess) {
    guess = guess.toUpperCase();

    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        countGuess(guess);
        showGuessedLetters();
        progressUpdate(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedList.innerHTML = "";

    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedList.append(li);
    }
};

const progressUpdate = function (guessedLetters) {

    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");

    const revealWord = [];
        for (const letter of wordArray) {
            if (guessedLetters.includes(letter)) {
                revealWord.push(letter.toUpperCase());
            } else {
                revealWord.push("●");
            }
        }
    wordInProgress.innerText = revealWord.join("");
    ifWin();
};

const countGuess = function (guess) {
    const upperWord = word.toUpperCase();

    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, there's no ${guess}`;
        console.log(remainingGuesses -= 1);
    } else { 
        message.innerText = `Nice guess! The word includes ${guess}`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const ifWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add(".win");
        message.innerHTML = '<p class="highlight">You guessed right! Congrats!</p>';
    }
};



