/** @format */

import React, { useEffect, useState } from "react";
import NewGame from "../components/NewGame";
import Player from "../components/Player";
import Hold from "../components/Hold";
import Dice from "../components/Dice";
import { useDispatch, useSelector } from "react-redux";
import { randomDice } from "../features/player/playerSlice";

const Backgammon = () => {
  const { firstPlayer, secondPlayer, controlPlayer, winnersResult } =
    useSelector((store) => store.player);
  const state = useSelector((state) => state.player);

  const dispatch = useDispatch();
  const FIRST_PLAYER = "FIRST_PLAYER";
  const SECOND_PLAYER = "SECOND_PLAYER";

  const firstRandomPlayer = (randomNumber) => {
    if (controlPlayer === SECOND_PLAYER) {
      return;
    }
    dispatch(randomDice({ player: FIRST_PLAYER, random: randomNumber }));
  };

  const secondRandomPlayer = (randomNumber) => {
    if (controlPlayer === FIRST_PLAYER) {
      return;
    }
    dispatch(randomDice({ player: SECOND_PLAYER, random: randomNumber }));
  };

  return (
    <main className="backgammon">
      <div className="backgammon-container">
        <NewGame />
        {firstPlayer.randomNumber <= 1 &&
        secondPlayer.randomNumber <= 1 ? null : (
          <Dice />
        )}
        <section className="backgammon-section">
          <Player
            isClass={controlPlayer === FIRST_PLAYER}
            playerNumber={1}
            randomPlayer={firstRandomPlayer}
            {...firstPlayer}
            winnersResult={winnersResult.firstValue}
          />
          <Player
            isClass={controlPlayer === SECOND_PLAYER}
            playerNumber={2}
            randomPlayer={secondRandomPlayer}
            {...secondPlayer}
            winnersResult={winnersResult.secondValue}
          />
        </section>
        <Hold />
      </div>
    </main>
  );
};

export default Backgammon;
