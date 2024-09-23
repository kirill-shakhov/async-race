import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Winner} from "@moduleWinners/static/types";
import {SortDirection, SortOptions} from "@/shared/types";

interface WinnersState {
  winners: Winner[] | [];
  currentWinner: Winner | null;
  sortingDirection: SortDirection;
  sortingOption: SortOptions;
}

const initialState: WinnersState = {
  winners: [],
  currentWinner: null,
  sortingDirection: SortDirection.ASC,
  sortingOption: SortOptions.ID
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
    },
    setSortingOrder: (state, action: PayloadAction<SortDirection>) => {
      state.sortingDirection = action.payload;
    },
    setSortingOption: (state, action: PayloadAction<SortOptions>) => {
      state.sortingOption = action.payload;
    }
  }
})

export const {
  setCurrentWinner,

  setWinners,
  clearWinners,
  removeWinner,

  setSortingOption,
  setSortingOrder
} = winnerSlice.actions;

export default winnerSlice.reducer;