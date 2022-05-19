/** @format */

import NewGame from "../components/NewGame";
import Player from "../components/Player";
import Hold from "../components/Hold";
import Dice from "../components/Dice";
import { useDispatch, useSelector } from "react-redux";
import { randomDice } from "../features/player/playerSlice";
import PlayerBall from "../components/PlayerBall";
import { SECOND_PLAYER, FIRST_PLAYER } from "../consts/index";

const Backgammon = () => {
  const {
    firstPlayer,
    secondPlayer,
    controlPlayer,
    winnersResult,
    winnersBall: { counterGame },
  } = useSelector((store) => store.player);
  const dispatch = useDispatch();
  const soundDice = new Audio("src/assets/sound/Roll-dice.mp3");

  const firstRandomPlayer = (randomNumber) => {
    if (controlPlayer === SECOND_PLAYER) return;
    else if (controlPlayer === "") return;

    soundDice.play();
    dispatch(
      randomDice({ player: FIRST_PLAYER, random: randomNumber, counterGame })
    );
  };

  const secondRandomPlayer = (randomNumber) => {
    if (controlPlayer === FIRST_PLAYER) return;
    else if (controlPlayer === "") return;

    soundDice.play();
    dispatch(
      randomDice({ player: SECOND_PLAYER, random: randomNumber, counterGame })
    );
  };

  console.log(counterGame);

  return (
    <main className="backgammon">
      <div className="backgammon-container">
        <PlayerBall />
        <NewGame />
        <Dice />
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
