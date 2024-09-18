import {Car} from "@moduleGarage/static/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GarageState {
  cars: Car[] | null;
  totalCount: number;
  currentPage: number;
  selectedCar: Car | null;
}

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  currentPage: 1,
  selectedCar: null
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
  }
})

export const {
  setCars,
  setTotalCount,
  clearCars,
  setCurrentPage,
  setSelectedCar
} = garageSlice.actions;

export default garageSlice.reducer;