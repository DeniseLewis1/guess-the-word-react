import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/***** 
// List of guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");
// Guess button
const guessButton = document.querySelector(".guess");
// Input letter
const letterInput = document.querySelector(".letter");
// Word in progress
const wordInProgress = document.querySelector(".word-in-progress");
// Remaining guesses
const remainingGuessesElement = document.querySelector(".remaining");
// Span where remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
// Message when player guesses
const message = document.querySelector(".message");
// Play again button
const playAgainButton = document.querySelector(".play-again");

// Starting word
let word = "magnolia";
// Player guesses
let guessedLetters = [];
// Number of guesses remaining
let remainingGuesses = 8;

// Get a random word
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

// Start game
getWord();

// Display placeholders
const placeholder = function (word) {
    let placeholderLetters = [];
    for (let letter of word) {
        placeholderLetters.push("●");
    }
    
    wordInProgress.innerText = placeholderLetters.join("");
};

// Guess button clicked
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    letterInput.value = "";
    message.innerText = "";
    const guessChecked = inputCheck(guess);
    
    if (guessChecked) {
        makeGuess(guessChecked);
    }
});

// Validate player input
const inputCheck = function (input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input === "") {
        message.innerText = `Please enter a letter.`;
    } else if (input.length > 1) {
        message.innerText = `Please enter a single letter.`;
    } else if (!input.match(acceptedLetter)) {
        message.innerText = `Please enter a letter from A to Z.`;
    } else {
        return input;
    }
};

// Check if letter has been guessed already
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `You've already guessed that letter, try again!`;
    } else {
        guessedLetters.push(guess);
        showGuesses();
        countRemainingGuesses(guess);
        updateWordInProgress(guessedLetters);
    }
};

// Display guessed letters
const showGuesses = function () {
    guessedLettersElement.innerHTML = "";
    for (let letter of guessedLetters) {
        let listItem = document.createElement("li");
        listItem.innerText = letter;
        guessedLettersElement.append(listItem); 
    }
};

// Update word in progress with correct letters
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    let showWord = [];

    for (let letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter);
        } else {
            showWord.push("●");
        }
    }
    
    wordInProgress.innerText = showWord.join("");
    checkWin();
};

// Determine number of remaining guesses
const countRemainingGuesses = function(guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    } else {
        message.innerText =  `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word is <span class="highlight">${wordUpper}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

// Check if player won
const checkWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
};

// Start game over
const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

// Play Again button clicked
playAgainButton.addEventListener ("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
});
*****/