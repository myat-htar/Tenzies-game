import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Die from "./components/Die";
import TimeScore from "./components/TimeScore";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth - 25,
    height: window.innerHeight,
  });
  const [dice, setDice] = useState(generateDice());
  const [startTimer, setStartTimer] = useState(false);
  const [tenzies, setTenzies] = useState(false);
  const [isgreaterThanBestScore, setIsgreaterThanBestScore] = useState(false);
  const [bestTimeScore, setBestTimeScore] = useState(
    () =>
      JSON.parse(localStorage.getItem("timeScore")) || {
        min: 0,
        sec: 0,
      }
  );
  const [currentTimeScore, setCurrentTimeScore] = useState({
    min: 0,
    sec: 0,
  });
  function generateDice() {
    let newDice = [];
    for (let i = 0; i <= 9; i++) {
      newDice.push(generateDiceObject());
    }
    return newDice;
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
      setDice(generateDice());
      setTenzies(false);
      setCurrentTimeScore({
        min: 0,
        sec: 0,
      });
      setIsgreaterThanBestScore(false);
    }
  }
  function handleClick(id) {
    setDice(prevDice => {
      return prevDice.map(die =>
        die.id == id ? { ...die, isHold: !die.isHold } : die
      );
    });
  }
  function changeWindowSize() {
    setWindowSize({
      width: window.innerWidth - 25,
      height: window.innerHeight,
    });
  }
  function updateBestTimeScore() {
    setBestTimeScore(currentTimeScore);
    localStorage.setItem("timeScore", JSON.stringify(currentTimeScore));
  }

  useEffect(() => {
    let timer;
    if (startTimer) {
      let { min, sec } = currentTimeScore;
      timer = setInterval(() => {
        sec = sec + 1;
        if (sec >= 60) {
          min = min + sec / 60;
          sec = sec % 60;
        }
        setCurrentTimeScore({ min: min, sec: sec });
      }, 1000);
    }
    if (tenzies) {
      clearInterval(timer);
      if (bestTimeScore.min || bestTimeScore.sec) {
        if (
          bestTimeScore.min > currentTimeScore.min ||
          bestTimeScore.sec > currentTimeScore.sec
        ) {
          updateBestTimeScore();
          setIsgreaterThanBestScore(true);
        }
      } else {
        updateBestTimeScore();
        setIsgreaterThanBestScore(true);
      }
    }
    return () => clearInterval(timer);
  }, [startTimer]);

  useEffect(() => {
    setStartTimer(true);
    if (dice.every(die => die.isHold && die.value === dice[0].value)) {
      setTenzies(true);
    }
  }, [dice]);

  useEffect(() => {
    setStartTimer(false);
    window.addEventListener("resize", changeWindowSize);
  }, [tenzies]);

  return (
    <>
      {tenzies && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}
      <main>
        <Header></Header>
        <TimeScore
          bestTimeScore={bestTimeScore}
          currentTimeScore={currentTimeScore}
          isgreaterThanBestScore={isgreaterThanBestScore}
        />
        <details className="instructions">
          <summary>How to play?</summary>
          <p>
            Roll until all dice's values are the same. Click each die to hold
            its current value between rolls.
          </p>
        </details>
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
        <button
          onClick={() => {
            rollDice();
          }}
          className="roll-btn"
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
      <footer className="attribution">
        <p>
          Coded by{" "}
          <a href="https://github.com/myat-htar" target="_blank">
            Myat Htar
          </a>
        </p>
      </footer>
    </>
  );
}
export default App;
