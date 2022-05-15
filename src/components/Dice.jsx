/** @format */

import React from "react";
import { useSelector } from "react-redux";

const Dice = () => {
  const dices = [
    { path: "dice-1.png", id: 1 },
    { path: "dice-2.png", id: 2 },
    { path: "dice-3.png", id: 3 },
    { path: "dice-4.png", id: 4 },
    { path: "dice-5.png", id: 5 },
    { path: "dice-6.png", id: 6 },
  ];

  const { firstPlayer, secondPlayer, controlPlayer } = useSelector(
    (store) => store.player
  );

  return (
    <div className="backgammon-dice">
      {dices.map(({ path, id }) => {
        if (controlPlayer === "FIRST_PLAYER") {
          if (firstPlayer.randomNumber === id) {
            return <img src={`src/assets/img/${path}`} key={id} alt="Dice" />;
          }
        } else {
          if (secondPlayer.randomNumber === id) {
            return <img src={`src/assets/img/${path}`} key={id} alt="Dice" />;
          }
        }
      })}
    </div>
  );
};

export default Dice;
