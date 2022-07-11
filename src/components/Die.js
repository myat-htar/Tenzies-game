export default function Die(props) {
  const styles = {
    backgroundColor: props.isHold ? "#59e391" : "#ffffff",
  };
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
