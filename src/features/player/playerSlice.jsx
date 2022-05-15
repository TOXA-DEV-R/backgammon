/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  controlPlayer: "",
  firstPlayer: {
    total: 0,
    randomNumber: 0,
    current: 0,
    iswinner: "",
  },
  secondPlayer: {
    total: 0,
    randomNumber: 0,
    current: 0,
    iswinner: "",
  },
  winnersResult: {
    firstValue: 0,
    secondValue: 0,
  },
};

const FIRST_PLAYER = "FIRST_PLAYER";
const SECOND_PLAYER = "SECOND_PLAYER";

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    randomDice: (state, { payload: { player, random } }) => {
      let firstStateRes = state.firstPlayer.current + state.firstPlayer.total;
      let secondStateRes =
        state.secondPlayer.current + state.secondPlayer.total;

      if (player === FIRST_PLAYER) {
        state.controlPlayer = player;
        state.firstPlayer.total = state.firstPlayer.total + random;
        state.firstPlayer.randomNumber = random;

        if (random <= 1) {
          let stateRes = state.firstPlayer.current + state.firstPlayer.total;
          state.controlPlayer = SECOND_PLAYER;
          state.firstPlayer.current = stateRes;
          state.firstPlayer.total = 0;
        }

        if (firstStateRes >= 100) {
          let firstWinnerResult = firstStateRes >= 100 ? "success" : "fail";
          console.log(firstStateRes);
          state.firstPlayer.current = 0;
          state.firstPlayer.total = 0;
          state.firstPlayer.randomNumber = 0;
          state.firstPlayer.iswinner = firstWinnerResult;

          state.winnersResult.firstValue = state.firstPlayer.current;
          state.winnersResult.secondValue = state.secondPlayer.current;
        }
      } else if (player === SECOND_PLAYER) {
        state.controlPlayer = player;
        state.secondPlayer.total = state.secondPlayer.total + random;
        state.secondPlayer.randomNumber = random;

        if (random <= 1) {
          let stateRes = state.secondPlayer.current + state.secondPlayer.total;
          state.controlPlayer = FIRST_PLAYER;
          state.secondPlayer.current = stateRes;
          state.secondPlayer.total = 0;
        }

        if (firstStateRes >= 100) {
          let secondWinnerResult = secondStateRes >= 100 ? "success" : "fail";

          state.secondPlayer.current = 0;
          state.secondPlayer.total = 0;
          state.secondPlayer.randomNumber = 0;
          state.secondPlayer.iswinner = secondWinnerResult;

          state.winnersResult.firstValue = state.firstPlayer.current;
          state.winnersResult.secondValue = state.secondPlayer.current;
        }
      } else {
        return state;
      }
    },
    holdDice: (state) => {
      const { controlPlayer } = state;
      if (controlPlayer === FIRST_PLAYER) {
        let stateRes = state.firstPlayer.current + state.firstPlayer.total;
        return {
          ...state,
          controlPlayer: SECOND_PLAYER,
          firstPlayer: {
            current: stateRes,
            total: 0,
            randomNumber: 0,
            iswinner: "",
          },
        };
      } else if (controlPlayer === SECOND_PLAYER) {
        let stateRes = state.secondPlayer.current + state.secondPlayer.total;
        return {
          ...state,
          controlPlayer: FIRST_PLAYER,
          iswinner: "",
          secondPlayer: {
            current: stateRes,
            total: 0,
            randomNumber: 0,
            iswinner: "",
          },
        };
      } else {
        return state;
      }
    },
    rollDice: () => {
      return initialState;
    },
    finalScore: (state) => {
      // const { controlPlayer } = state;
      let firstStateRes = state.firstPlayer.current + state.firstPlayer.total;
      let firstWinnerIsWinner = firstStateRes >= 100 ? "success" : "fail";

      let secondStateRes =
        state.secondPlayer.current + state.secondPlayer.total;
      let secondWinnerIsWinner = secondStateRes >= 100 ? "success" : "fail";

      return {
        ...state,
        firstPlayer: {
          current: 0,
          total: 0,
          randomNumber: 0,
          iswinner: firstWinnerIsWinner,
        },
        secondPlayer: {
          current: 0,
          total: 0,
          randomNumber: 0,
          iswinner: secondWinnerIsWinner,
        },
        winnersResult: {
          firstValue: state.firstPlayer.current,
          secondValue: state.secondPlayer.current,
        },
      };
    },
  },
});

export const { randomDice, holdDice, autoHoldDice, finalScore, rollDice } =
  playerSlice.actions;

export default playerSlice.reducer;
