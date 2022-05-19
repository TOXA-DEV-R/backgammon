/** @format */
import { useDispatch } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import { newGame } from "../features/player/playerSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const soundStart = new Audio("src/assets/sound/start_game.mp3");

  return (
    <aside className="modal">
      <div className="modal-container">
        <button
          className="modal__btn"
          onClick={() => {
            dispatch(newGame());
            soundStart.play();
            dispatch(closeModal());
          }}
        >
          confirm
        </button>
        <button
          className="modal__btn"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          cancel
        </button>
      </div>
    </aside>
  );
};

export default Modal;
