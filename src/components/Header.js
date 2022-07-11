export default function Header() {
  return (
    <header>
      <h1 className="title">Tenzies</h1>
      <details className="instructions">
        <summary>How to play?</summary>
        <p>
          Roll until all dice's values are the same. Click each die to hold its
          current value between rolls.
        </p>
      </details>
      {/* <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p> */}
    </header>
  );
}
