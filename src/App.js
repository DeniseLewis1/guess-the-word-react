import React, { useState, useEffect } from 'react';
import './App.css';
import logo from "./img/logo.png"

const App = () => {
  const [guessedLettersElement, setGuessedLettersElement] = useState([]);
  const [letterInput, setLetterInput] = useState("");
  const [wordInProgress, setWordInProgress] = useState("");
  const [message, setMessage] = useState("");
  const [word, setWord] = useState("magnolia");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(8);
  const [wonGame, setWonGame] = useState(false);
  const [newGame, setNewGame] = useState(false);

  const getWord = async () => {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    setWord(wordArray[randomIndex].trim());
    placeholder(word);
  }
/*
  // Get a random word
  getWord = () => async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    this.setState({ word: wordArray[randomIndex].trim() });
    this.placeholder(this.state.word);
  };

  // Start game
//  getWord;
*/
  // Display placeholders
  const placeholder = word => {
    let placeholderLetters = [];
    for (let letter of word) {
      placeholderLetters.push("●");
    }
    
    setWordInProgress(placeholderLetters.join(""));
  };

  // Guess button clicked
  const guessButton = e => {
    e.preventDefault();
    const guess = letterInput;
    setLetterInput("");
    setMessage("");
    const guessChecked = inputCheck(guess);
    
    if (guessChecked) {
      makeGuess(guessChecked);
    }
  };

  const updateInput = e => {
    setLetterInput(e.target.value);
  };

  // Validate player input
  const inputCheck = input => {
    const acceptedLetter = /[a-zA-Z]/;

    if (input === "") {
      setMessage(`Please enter a letter.`);
    } else if (input.length > 1) {
      setMessage(`Please enter a single letter.`);
    } else if (!input.match(acceptedLetter)) {
      setMessage(`Please enter a letter from A to Z.`);
    } else {
      return input;
    }
  };

  // Check if letter has been guessed already
  const makeGuess = guess => {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        setMessage(`You've already guessed that letter, try again!`);
    } else {
        guessedLetters.push(guess);
        showGuesses();
        countRemainingGuesses(guess);
        updateWordInProgress(guessedLetters);
    }
  };

  // Display guessed letters
  const showGuesses = () => {
    setGuessedLettersElement([]);
    const guessedLettersList = guessedLetters.map((letter) => <li key={letter}>{letter}</li>);
    setGuessedLettersElement(guessedLettersList);
  };

  // Update word in progress with correct letters
  const updateWordInProgress = guessedLetters => {
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

    setWordInProgress(showWord.join(""));
    //checkWin(showWord.join(""));
    checkWin();
  };

  // Determine number of remaining guesses
  const countRemainingGuesses = guess => {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
      setMessage(`Good guess! The word has the letter ${guess}.`);
    } else {
      setMessage(`Sorry, the word has no ${guess}.`);
      setRemainingGuesses(remainingGuesses -= 1);
    }

    if (remainingGuesses === 0) {
      setMessage(`Game over! The word is <span className="highlight">${wordUpper}</span>.`);
      setNewGame(true);
//        this.startOver();
    }
  };

  // Check if player won
  //const checkWin = (word) => {
  const checkWin = () => {
    if (wordInProgress === word.toUpperCase()) {
      setWonGame(true);
      setMessage(`You guessed correct the word! Congrats!`);
      setNewGame(true);
//        message.classList.add("win");
//        this.startOver();
    }
  };
/*
  // Start game over
  startOver = () => {
//    guessButton.classList.add("hide");
//    remainingGuessesElement.classList.add("hide");
//    guessedLettersElement.classList.add("hide");
//    playAgainButton.classList.remove("hide");
  };
*/
  // Play Again button clicked
  const playAgainButton = () => {
/*
//    message.classList.remove("win");
//    guessButton.classList.remove("hide");
//    remainingGuessesElement.classList.remove("hide");
//    guessedLettersElement.classList.remove("hide");
//    playAgainButton.classList.add("hide");
//    this.getWord();
*/
    //this.componentDidMount();
    getWord();
    setWonGame(false);
    setMessage("");
    setGuessedLettersElement("");
    setRemainingGuesses(8);
    setGuessedLetters([]);
    setNewGame(false);
  };




  return (
    <div className="App">
      <div className="container">
        <h1>
          <img className="logo" src={logo} alt="Guess The Word" />
        </h1>
        {wonGame ? 
          <p className="message win"><p className="highlight">{message}</p></p> : 
          <p className="message">{message}</p>}
{/*          <p className={this.state.wonGame ? "message win" : "message"}>{this.state.message}</p> */}
        <p className="word-in-progress">{wordInProgress}</p>
        <p className={newGame ? "remaining hide" : "remaining"}>You have {remainingGuesses} {remainingGuesses === 1 ? "guess" : "guesses"} remaining.</p>
        <ul className={newGame ? "guessed-letters hide" : "guessed-letters"}>{guessedLettersElement}</ul>
        <form action="" className="guess-form">
          <label for="letter">Type one letter:</label>
          <input type="text" name="letter" className="letter" value={letterInput} onChange={updateInput} />
          <div className="form-element button-element">
            <button className={newGame ? "guess hide" : "guess"} onClick={guessButton}>Guess!</button>
          </div>
        </form>
        <button className={newGame ? "play-again" : "play-again hide"} onClick={playAgainButton}>Play Again!</button>
      </div>
    </div>
  );
}

export default App;