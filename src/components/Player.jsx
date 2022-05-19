/** @format */

import React, { Fragment, memo, useRef } from "react";
import { GoPrimitiveDot, FaRegSmileBeam, CgSmileSad } from "react-icons/all";
import { useSelector } from "react-redux";
import { SUCCESS } from "../consts/index";

const Player = ({
  isClass,
  playerNumber,
  randomPlayer,
  total,
  current,
  iswinner,
  winnersResult,
}) => {
  const MAX = 7;
  const MIN = 1;
  const random = Math.floor(Math.random() * (MAX - MIN) + MIN);
  const { firstPlayer, secondPlayer } = useSelector((store) => store.player);
  const plyerRef = useRef(null);

  return (
    <div
      className={`backgammon-player ${isClass ? "active" : ""}`}
      onClick={() => {
        if (
          firstPlayer.iswinner === SUCCESS ||
          secondPlayer.iswinner === SUCCESS
        ) {
          plyerRef.current.disabled = true;
          return;
        } else {
          plyerRef.current.disabled = false;
        }
        randomPlayer(random);
      }}
      ref={plyerRef}
    >
      <h1
        className={`backgammon-player__iswinner ${
          iswinner === SUCCESS ? "winner" : "nowinner"
        }`}
      >
        {iswinner.length === 0 ? null : iswinner === SUCCESS ? (
          <Fragment>
            <span className="icon">
              <FaRegSmileBeam size={30} />
            </span>
            you are winner <b className="result">{winnersResult}</b>
          </Fragment>
        ) : (
          <Fragment>
            <span className="icon">
              <CgSmileSad size={30} color="red" />
            </span>
            you aren't winner <b className="result">{winnersResult}</b>
          </Fragment>
        )}
      </h1>
      <div className="backgammon-player__top">
        <div className="backgammon-player__header">
          player {playerNumber}
          <span className={isClass ? "active" : ""}>
            <GoPrimitiveDot />
          </span>
        </div>
        <div className="backgammon-player__total">
          <span>{total}</span>
        </div>
      </div>
      <div className="backgammon-player__current">
        <span>current</span>
        <span>{current}</span>
      </div>
    </div>
  );
};

export default memo(Player);
