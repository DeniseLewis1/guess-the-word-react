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
    this.setState({ word: wordArray[randomIndex].trim() });
    this.placeholder(this.state.word);
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
    
    this.setState({ wordInProgress: placeholderLetters.join("") });
  };

  // Guess button clicked
  const guessButton = e => {
    e.preventDefault();
    const guess = this.state.letterInput;
    this.setState({ letterInput: "", message: "" });
    const guessChecked = this.inputCheck(guess);
    
    if (guessChecked) {
        this.makeGuess(guessChecked);
    }
  };

  const updateInput = e => {
    this.setState({ letterInput: e.target.value });
  };

  // Validate player input
  const inputCheck = input => {
    const acceptedLetter = /[a-zA-Z]/;

    if (input === "") {
        this.setState({ message: `Please enter a letter.` });
    } else if (input.length > 1) {
        this.setState({ message: `Please enter a single letter.` });
    } else if (!input.match(acceptedLetter)) {
        this.setState({ message: `Please enter a letter from A to Z.` });
    } else {
        return input;
    }
  };

  // Check if letter has been guessed already
  const makeGuess = guess => {
    guess = guess.toUpperCase();
    if (this.state.guessedLetters.includes(guess)) {
        this.setState({ message: `You've already guessed that letter, try again!` });
    } else {
        this.state.guessedLetters.push(guess);
        this.showGuesses();
        this.countRemainingGuesses(guess);
        this.updateWordInProgress(this.state.guessedLetters);
    }
  };

  // Display guessed letters
  const showGuesses = () => {
    this.setState({ guessedLettersElement: [] });
    const guessedLettersList = this.state.guessedLetters.map((letter) => <li key={letter}>{letter}</li>);
    this.setState({ guessedLettersElement: guessedLettersList });
  };

  // Update word in progress with correct letters
  const updateWordInProgress = guessedLetters => {
    const wordUpper = this.state.word.toUpperCase();
    const wordArray = wordUpper.split("");
    let showWord = [];

    for (let letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter);
        } else {
            showWord.push("●");
        }
    }

    this.setState({ wordInProgress: showWord.join("") });
    this.checkWin(showWord.join(""));
  };

  // Determine number of remaining guesses
  const countRemainingGuesses = guess => {
    const wordUpper = this.state.word.toUpperCase();
    if (wordUpper.includes(guess)) {
        this.setState({ message: `Good guess! The word has the letter ${guess}.` });
    } else {
        this.setState({ message:  `Sorry, the word has no ${guess}.`, remainingGuesses: this.state.remainingGuesses -= 1 });
    }

    if (this.state.remainingGuesses === 0) {
        this.setState({ message: `Game over! The word is <span className="highlight">${wordUpper}</span>.`, newGame: true });
//        this.startOver();
    }
  };

  // Check if player won
  const checkWin = (word) => {
    if (word === this.state.word.toUpperCase()) {
      this.setState({ wonGame: true, message: `You guessed correct the word! Congrats!`, newGame: true });
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
    this.getWord();
    this.setState({ wonGame: false, message: "", guessedLettersElement: "", remainingGuesses: 8, guessedLetters: [], newGame: false });
  };




  //render() {
    return (
      <div className="App">
        <div className="container">
          <h1>
            <img className="logo" src={logo} alt="Guess The Word" />
          </h1>
          {this.state.wonGame ? 
            <p className="message win"><p className="highlight">{this.state.message}</p></p> : 
            <p className="message">{this.state.message}</p>}
{/*          <p className={this.state.wonGame ? "message win" : "message"}>{this.state.message}</p> */}
          <p className="word-in-progress">{this.state.wordInProgress}</p>
          <p className={this.state.newGame ? "remaining hide" : "remaining"}>You have {this.state.remainingGuesses} {this.state.remainingGuesses === 1 ? "guess" : "guesses"} remaining.</p>
          <ul className={this.state.newGame ? "guessed-letters hide" : "guessed-letters"}>{this.state.guessedLettersElement}</ul>
          <form action="" className="guess-form">
            <label for="letter">Type one letter:</label>
            <input type="text" name="letter" className="letter" value={this.state.letterInput} onChange={this.updateInput} />
            <div className="form-element button-element">
              <button className={this.state.newGame ? "guess hide" : "guess"} onClick={this.guessButton}>Guess!</button>
            </div>
          </form>
          <button className={this.state.newGame ? "play-again" : "play-again hide"} onClick={this.playAgainButton}>Play Again!</button>
        </div>
      </div>
    );
  //}
}

export default App;