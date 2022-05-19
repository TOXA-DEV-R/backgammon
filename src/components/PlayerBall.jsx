/** @format */

import { memo } from "react";
import { useSelector } from "react-redux";

const PlayerBall = () => {
  const { firstPlayerBall, secondPlayerBall } = useSelector(
    (store) => store.player.winnersBall
  );

  return (
    <h1 className="backgammon-ball">
      <span>{firstPlayerBall}</span> : <span>{secondPlayerBall}</span>
    </h1>
  );
};

export default memo(PlayerBall);
