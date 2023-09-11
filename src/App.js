import './App.css';
import logo from "./img/logo.png"

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>
          <img className="logo" src={logo} alt="Guess The Word" />
        </h1>
        <p className="message"></p>
        <p className="word-in-progress"></p>
        <p className="remaining">You have <span>8 guesses</span> remaining.</p>
        <ul className="guessed-letters"></ul>
        <form action="" className="guess-form">
          <label for="letter">Type one letter:</label>
          <input type="text" name="letter" className="letter" />
          <div className="form-element button-element">
            <button className="guess">Guess!</button>
          </div>
        </form>
        <button className="play-again hide">Play Again!</button>
      </div>
    </div>
  );
}

export default App;
