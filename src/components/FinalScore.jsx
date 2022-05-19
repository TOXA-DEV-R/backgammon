/** @format */

import { useDispatch, useSelector } from "react-redux";
import { closeFinalScore } from "../features/finalScore/finalScoreSlice";

const FinalScore = () => {
  const {
    winnersBall: { firstPlayerBall, secondPlayerBall },
  } = useSelector((store) => store.player);
  const dispatch = useDispatch();
  return (
    <aside className="final-score">
      <div className="final-score-container">
        <div className="final-score-row">
          <h2 className="final-score__title active">
            First Player won <span> {firstPlayerBall} </span> time
          </h2>
          <h2 className="final-score__title">
            Second Player won <span> {secondPlayerBall} </span> time
          </h2>
        </div>
        <button
          className="final-score__btn"
          onClick={() => {
            dispatch(closeFinalScore());
          }}
        >
          Close
        </button>
      </div>
    </aside>
  );
};

export default FinalScore;
