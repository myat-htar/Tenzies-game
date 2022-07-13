export default function Die(props) {
  return (
    <>
      <p
        className={`die-face ${props.isHold ? "hold" : ""}`}
        onClick={props.handleClick}
      >
        {props.value}
      </p>
    </>
  );
}
