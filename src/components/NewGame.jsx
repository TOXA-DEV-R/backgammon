/** @format */

import React from "react";
import { GrAddCircle } from "react-icons/all";
const NewGame = () => {
  return (
    <div className="backgammon-top">
      <button className="backgammon-top__btn">
        <span>
          <GrAddCircle />
        </span>
        new game
      </button>
    </div>
  );
};

export default NewGame;
