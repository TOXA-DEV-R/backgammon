/** @format */

import React, { useEffect, useRef } from "react";
import { ImLoop2 } from "react-icons/all";
import { IoDownloadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { openFinalScore } from "../features/finalScore/finalScoreSlice";
import { finalScore, holdDice, rollDice } from "../features/player/playerSlice";
import { SUCCESS } from "../consts/index";

const Hold = () => {
  const dispatch = useDispatch();
  const {
    firstPlayer,
    secondPlayer,
    controlPlayer,
    winnersBall: { counterGame },
  } = useSelector((store) => store.player);
  const holdRef = useRef(null);
  const finalScoreRef = useRef(null);

  const soundHold = new Audio("src/assets/sound/catch.mp3");
  const soundSuccess = new Audio(
    "src/assets/sound/cartoon_success_fanfair.mp3"
  );
  const soundLevel = new Audio("src/assets/sound/level_up.mp3");

  useEffect(() => {
    if (firstPlayer.iswinner === SUCCESS || secondPlayer.iswinner === SUCCESS) {
      holdRef.current.disabled = true;
      finalScoreRef.current.disabled = true;
    } else {
      holdRef.current.disabled = false;
      finalScoreRef.current.disabled = false;
    }
  }, [firstPlayer.iswinner, secondPlayer.iswinner]);

  useEffect(() => {
    if (firstPlayer.iswinner === SUCCESS || secondPlayer.iswinner === SUCCESS) {
      soundSuccess.play();
    }
  }, [firstPlayer.iswinner, secondPlayer.iswinner]);

  return (
    <div className="backgammon-bottom">
      <button
        className="backgammon-bottom__roll"
        onClick={() => {
          dispatch(
            rollDice({
              controlPlayer,
              isFirstWinner: firstPlayer.iswinner,
              isSecondWinner: secondPlayer.iswinner,
              counterGame,
            })
          );
          if (
            firstPlayer.iswinner === SUCCESS ||
            secondPlayer.iswinner === SUCCESS
          ) {
            soundLevel.play();
          }
        }}
      >
        <ImLoop2 color="red" /> roll dice
      </button>
      <button
        className="backgammon-bottom__hold"
        onClick={() => {
          dispatch(holdDice());
          soundHold.play();
        }}
        ref={holdRef}
      >
        <IoDownloadOutline /> hold
      </button>
      <button
        className="backgammon-bottom__final"
        onClick={() => {
          dispatch(openFinalScore());
        }}
        ref={finalScoreRef}
      >
        final score
      </button>
    </div>
  );
};

export default Hold;
