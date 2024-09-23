import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Winner, WInnerWithoutWins} from "@moduleWinners/static/types";

interface WinnersState {
  currentWinner: Winner | null;
}

const initialState: WinnersState = {
  currentWinner: null,
}

const winnerSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setCurrentWinner: (state, action: PayloadAction<Winner>) => {
      state.currentWinner = action.payload;
    },
  }
})

export const {
  setCurrentWinner,
} = winnerSlice.actions;

export default winnerSlice.reducer;