/** @format */

import { useDispatch, useSelector } from "react-redux";
import { newGame } from "../features/player/playerSlice";

const ModalWinner = () => {
  const { firstPlayer, secondPlyaer } = useSelector((store) => store.player);
  const dispatch = useDispatch();

  return (
    <aside className="modal-winner" onClick={() => dispatch(newGame())}>
      <div className="modal-winner-container">
        <h2 className="modal-winner__title">
          First player absolutely won in this game.
          <br />
          <span>
            First player's ball is <b>{2}</b>
          </span>
        </h2>
        <h2 className="modal-winner__title">
          Second player absolutely didn't win in this game.
          <br />
          <span>
            Second player's ball is <b>{2}</b>
          </span>
        </h2>
      </div>
    </aside>
  );
};

export default ModalWinner;
