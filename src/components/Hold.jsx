/** @format */

import React from "react";
import { ImLoop2 } from "react-icons/all";
import { IoDownloadOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { finalScore, holdDice, rollDice } from "../features/player/playerSlice";

const Hold = () => {
  const dispatch = useDispatch();

  return (
    <div className="backgammon-bottom">
      <button
        className="backgammon-bottom__roll"
        onClick={() => {
          dispatch(rollDice());
        }}
      >
        <ImLoop2 color="red" /> roll dice
      </button>
      <button
        className="backgammon-bottom__hold"
        onClick={() => {
          dispatch(holdDice());
        }}
      >
        <IoDownloadOutline /> hold
      </button>
      <button
        className="backgammon-bottom__final"
        onClick={() => {
          dispatch(finalScore());
        }}
      >
        final score
      </button>
    </div>
  );
};

export default Hold;
