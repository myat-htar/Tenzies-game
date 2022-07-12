export default function TimeScore({
  bestTimeScore,
  currentTimeScore,
  isgreaterThanBestScore,
}) {
  let bestScore;
  if (bestTimeScore.min !== 0 || bestTimeScore.sec !== 0) {
    bestScore = `${
      bestTimeScore.min < 10 ? `0${bestTimeScore.min}` : bestTimeScore.min
    }:${bestTimeScore.sec < 10 ? `0${bestTimeScore.sec}` : bestTimeScore.sec}`;
  } else {
    bestScore = "__:__";
  }
  return (
    <div className="time-score">
      <div className="text">
        <p>Best Time Score: </p>
        <p>Current Time Score: </p>
      </div>
      <div className="score">
        <p>{bestScore}</p>
        <p style={isgreaterThanBestScore ? { color: "#0cdf61" } : {}}>
          {currentTimeScore.min < 10
            ? `0${currentTimeScore.min}`
            : currentTimeScore.min}
          :
          {currentTimeScore.sec < 10
            ? `0${currentTimeScore.sec}`
            : currentTimeScore.sec}
        </p>
      </div>
    </div>
  );
}
