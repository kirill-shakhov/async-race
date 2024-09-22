import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Winner} from "@moduleWinners/static/types";

interface WinnersState {
  currentWinner: Winner | null;
}

const initialState: WinnersState = {
  currentWinner: null
}

const winnerSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setCurrentWinner: (state, action: PayloadAction<Winner>) => {
      state.currentWinner = action.payload;
    }
  }
})

export const {
  setCurrentWinner
} = winnerSlice.actions;

export default winnerSlice.reducer;