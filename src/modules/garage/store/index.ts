import {Car} from "@moduleGarage/static/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GarageState {
  cars: Car[] | null;
}

const initialState: GarageState = {
  cars: []
}

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<GarageState>) => {
      state.cars = action.payload.cars;
    }
  }
})

export const {
  setCars
} = garageSlice.actions;

export default garageSlice.reducer;