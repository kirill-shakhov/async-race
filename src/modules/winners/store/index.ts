import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Winner, WInnerWithoutWins} from "@moduleWinners/static/types";

interface WinnersState {
  winners: Winner[] | [];
  currentWinner: Winner | null;
}

const initialState: WinnersState = {
  winners: [],
  currentWinner: null,
}

const winnerSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setCurrentWinner: (state, action: PayloadAction<Winner>) => {
      state.currentWinner = action.payload;
    },
    setWinners: (state, action: PayloadAction<Winner[]>) => {
      state.winners = action.payload;
    },

    clearWinners: (state) => {
      state.winners = [];
    },
    removeWinner: (state, action: PayloadAction<number>) => {
      state.winners = state.winners.filter((winner) => winner.id !== action.payload);
    }
  }
})

export const {
  setCurrentWinner,

  setWinners,
  clearWinners,
  removeWinner
} = winnerSlice.actions;

export default winnerSlice.reducer;