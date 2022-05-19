/** @format */
import { memo } from "react";
import { GrAddCircle } from "react-icons/all";
import { useDispatch } from "react-redux";
import { openModal } from "../features/modal/modalSlice";

const NewGame = () => {
  const dispatch = useDispatch();

  return (
    <div className="backgammon-top">
      <button
        className="backgammon-top__btn"
        onClick={() => {
          dispatch(openModal());
        }}
      >
        <span>
          <GrAddCircle />
        </span>
        new game
      </button>
    </div>
  );
};

export default memo(NewGame);
