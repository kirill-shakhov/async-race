import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Winner, WInnerWithoutWins} from "@moduleWinners/static/types";

interface WinnersState {
  currentWinner: Winner | null;
  raceResult: WInnerWithoutWins[] | [];
}

const initialState: WinnersState = {
  currentWinner: null,
  raceResult: [],
}

const winnerSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setCurrentWinner: (state, action: PayloadAction<Winner>) => {
      state.currentWinner = action.payload;
    },
    addToRaceResult: (state, action: PayloadAction<WInnerWithoutWins>) => {
      state.raceResult.push(action.payload);
    }
  }
})

export const {
  setCurrentWinner,
  addToRaceResult
} = winnerSlice.actions;

export default winnerSlice.reducer;