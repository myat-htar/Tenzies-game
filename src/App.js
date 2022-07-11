import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [dice, setDice] = useState(getDice());
  const [tenzies, setTenzies] = useState(false);
  function getDice() {
    let randomNumberArray = [];
    for (let i = 0; i <= 9; i++) {
      randomNumberArray.push(generateDiceObject());
    }
    return randomNumberArray;
  }
  function generateDiceObject() {
    let random = Math.floor(Math.random() * 6 + 1);
    return {
      id: nanoid(),
      value: random,
      isHold: false,
    };
  }
  function rollDice() {
    setDice(prevDice => {
      return prevDice.map(die => {
        if (!die.isHold) {
          return generateDiceObject();
        }
        return die;
      });
    });
    if (tenzies) {
      setDice(getDice());
      setTenzies(false);
    }
  }
  function handleClick(id) {
    setDice(prevDice => {
      return prevDice.map(die =>
        die.id == id ? { ...die, isHold: !die.isHold } : die
      );
    });
  }
  function changeWindowWidth() {
    setWindowWidth(window.innerWidth - 20);
  }
  useEffect(() => {
    if (dice.every(die => die.isHold && die.value === dice[0].value)) {
      setTenzies(true);
    }
  }, [dice]);
  useEffect(() => {
    window.addEventListener("resize", changeWindowWidth);
  }, [tenzies]);
  return (
    <>
      {tenzies && <Confetti width={windowWidth} />}
      <main>
        <Header></Header>
        <div className="die-container">
          {dice.map(die => (
            <Die
              value={die.value}
              key={die.id}
              handleClick={() => handleClick(die.id)}
              isHold={die.isHold}
            />
          ))}
        </div>
        <button onClick={rollDice} className="roll-btn">
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
      <footer className="attribution">
        <p>
          Coded by <a href="">Myat Htar</a>
        </p>
      </footer>
    </>
  );
}
export default App;
