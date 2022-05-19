/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { SECOND_PLAYER, FIRST_PLAYER, SUCCESS, FAIL } from "../../consts/index";

const initialState = {
  controlPlayer: FIRST_PLAYER,
  firstPlayer: {
    total: 0,
    randomNumber: 1,
    current: 0,
    iswinner: "",
  },
  secondPlayer: {
    total: 0,
    randomNumber: 1,
    current: 0,
    iswinner: "",
  },
  winnersResult: {
    firstValue: 0,
    secondValue: 0,
  },
  winnersBall: {
    counterGame: 0,
    firstPlayerBall: 0,
    secondPlayerBall: 0,
  },
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    randomDice: (state, { payload: { player, random, counterGame } }) => {
      const { firstPlayer, secondPlayer } = state;
      const controlRandom = random === 1 ? 0 : random;

      let firstStateRes = firstPlayer.current + firstPlayer.total;
      let secondStateRes = secondPlayer.current + secondPlayer.total;

      if (player === FIRST_PLAYER) {
        state.controlPlayer = player;
        state.firstPlayer.total = firstPlayer.total + controlRandom;
        state.firstPlayer.randomNumber = random;

        if (random <= 1) {
          let stateRes = firstPlayer.current + firstPlayer.total;
          state.controlPlayer = SECOND_PLAYER;
          state.firstPlayer.current = stateRes;
          state.firstPlayer.total = 0;
        }

        if (
          firstStateRes >= 100 ||
          firstPlayer.current >= 100 ||
          firstPlayer.total >= 100
        ) {
          state.firstPlayer.current = 0;
          state.firstPlayer.total = 0;
          state.firstPlayer.randomNumber = 1;
          state.firstPlayer.iswinner = SUCCESS;
          state.secondPlayer.iswinner = FAIL;

          if (firstPlayer.total >= 100) {
            state.winnersResult.firstValue = firstPlayer.total;
            state.winnersResult.secondValue = secondPlayer.total;
            state.winnersBall.counterGame = counterGame + 1;
          } else {
            state.winnersResult.firstValue = firstStateRes;
            state.winnersResult.secondValue = secondStateRes;
            state.winnersBall.counterGame = counterGame + 1;
          }
        }
      } else if (player === SECOND_PLAYER) {
        state.controlPlayer = player;
        state.secondPlayer.total = secondPlayer.total + controlRandom;
        state.secondPlayer.randomNumber = random;

        if (random <= 1) {
          let stateRes = secondPlayer.current + secondPlayer.total;

          state.controlPlayer = FIRST_PLAYER;
          state.secondPlayer.current = stateRes;
          state.secondPlayer.total = 0;
        }

        if (
          secondStateRes >= 100 ||
          secondPlayer.current >= 100 ||
          secondStateRes.total >= 100
        ) {
          state.secondPlayer.current = 0;
          state.secondPlayer.total = 0;
          state.secondPlayer.randomNumber = 1;
          state.firstPlayer.iswinner = FAIL;
          state.secondPlayer.iswinner = SUCCESS;

          if (secondStateRes.total >= 100) {
            state.winnersResult.firstValue = firstPlayer.total;
            state.winnersResult.secondValue = secondPlayer.total;
            state.winnersBall.counterGame = counterGame + 1;
          } else {
            state.winnersResult.firstValue = firstStateRes;
            state.winnersResult.secondValue = secondStateRes;
            state.winnersBall.counterGame = counterGame + 1;
          }
        }
      } else {
        return state;
      }
    },
    holdDice: (state) => {
      const { controlPlayer, firstPlayer, secondPlayer } = state;

      if (controlPlayer === FIRST_PLAYER) {
        let stateRes = firstPlayer.current + firstPlayer.total;
        return {
          ...state,
          controlPlayer: SECOND_PLAYER,
          firstPlayer: {
            current: stateRes,
            total: 0,
            randomNumber: 1,
            iswinner: "",
          },
        };
      } else if (controlPlayer === SECOND_PLAYER) {
        let stateRes = secondPlayer.current + secondPlayer.total;
        return {
          ...state,
          controlPlayer: FIRST_PLAYER,
          iswinner: "",
          secondPlayer: {
            current: stateRes,
            total: 0,
            randomNumber: 1,
            iswinner: "",
          },
        };
      } else {
        return state;
      }
    },
    rollDice: (
      state,
      { payload: { controlPlayer, isFirstWinner, isSecondWinner, counterGame } }
    ) => {
      console.log(controlPlayer, isFirstWinner);
      console.log(controlPlayer, isSecondWinner);
      if (controlPlayer === FIRST_PLAYER && isFirstWinner === SUCCESS) {
        return {
          ...initialState,
          winnersBall: {
            counterGame,
            firstPlayerBall: state.winnersBall.firstPlayerBall + 1,
            secondPlayerBall: state.winnersBall.secondPlayerBall,
          },
        };
      } else if (
        controlPlayer === SECOND_PLAYER &&
        isSecondWinner === SUCCESS
      ) {
        return {
          ...initialState,
          winnersBall: {
            counterGame,
            firstPlayerBall: state.winnersBall.firstPlayerBall,
            secondPlayerBall: state.winnersBall.secondPlayerBall + 1,
          },
        };
      } else return state;
    },
    finalScore: (state) => {
      const { firstPlayer, secondPlayer } = state;
      let firstStateRes = firstPlayer.current + firstPlayer.total;
      let firstWinnerIsWinner = firstStateRes >= 100 ? SUCCESS : FAIL;

      let secondStateRes = secondPlayer.current + secondPlayer.total;
      let secondWinnerIsWinner = secondStateRes >= 100 ? SUCCESS : FAIL;

      return {
        ...state,
        controlPlayer: FIRST_PLAYER,
        firstPlayer: {
          current: 0,
          total: 0,
          randomNumber: 1,
          iswinner: firstWinnerIsWinner,
        },
        secondPlayer: {
          current: 0,
          total: 0,
          randomNumber: 1,
          iswinner: secondWinnerIsWinner,
        },
        winnersResult: {
          firstValue: firstStateRes,
          secondValue: secondStateRes,
        },
      };
    },
    newGame: () => {
      return initialState;
    },
  },
});

export const {
  randomDice,
  holdDice,
  autoHoldDice,
  finalScore,
  rollDice,
  newGame,
} = playerSlice.actions;

export default playerSlice.reducer;
