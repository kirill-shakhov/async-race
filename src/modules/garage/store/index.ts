import {Car} from "@moduleGarage/static/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WInnerWithoutWins} from "@moduleWinners/static/types";

interface GarageState {
  cars: Car[] | null;
  totalCount: number;
  currentPage: number;
  selectedCar: Car | null;
  isRaceStarted: boolean;
  raceResult: WInnerWithoutWins[] | [];
}

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  currentPage: 1,
  selectedCar: null,
  isRaceStarted: false,
  raceResult: []
}

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },
    clearCars: (state) => {
      state.cars = [];
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedCar: (state, action: PayloadAction<Car>) => {
      state.selectedCar = action.payload;
    },
    setStartRace: (state, action: PayloadAction<boolean>) => {
      state.isRaceStarted = action.payload;
    },

    addToRaceResult: (state, action: PayloadAction<WInnerWithoutWins>) => {
      state.raceResult.push(action.payload);
    },
    clearRaceResult: (state) => {
      state.raceResult = [];
    }
  }
})

export const {
  setCars,
  setTotalCount,
  clearCars,

  setCurrentPage,
  setSelectedCar,

  setStartRace,
  addToRaceResult,
  clearRaceResult
} = garageSlice.actions;

export default garageSlice.reducer;