/** @format */

import React, { Fragment } from "react";
import "./styles/main.scss";
import Backgammon from "./container/Backgammon";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";
import FinalScore from "./components/FinalScore";
import ModalWinner from "./components/ModalWinner";

const App = () => {
  const { isModal } = useSelector((store) => store.modal);
  const { isFinalScore } = useSelector((store) => store.finalScore);
  const {
    winnersBall: { BallwinnersBall },
  } = useSelector((store) => store.player);

  return (
    <Fragment>
      {isModal && <Modal />}
      {isFinalScore && <FinalScore />}
      {BallwinnersBall === 3 ? <ModalWinner /> : null}
      <Backgammon />
    </Fragment>
  );
};

export default App;
