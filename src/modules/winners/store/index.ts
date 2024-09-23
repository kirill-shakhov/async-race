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
  }
})

export const {
  setCurrentWinner,

  setWinners,
  clearWinners
} = winnerSlice.actions;

export default winnerSlice.reducer;