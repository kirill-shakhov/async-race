// store.ts
import {configureStore} from '@reduxjs/toolkit';
import garageReducer from '@moduleGarage/store';
import winnersReducer from '@moduleWinners/store';
import {asyncRaceApi} from "@/services/api/controllers/asyncRaceApi";

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    winners: winnersReducer,
    [asyncRaceApi.reducerPath]: asyncRaceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      asyncRaceApi.middleware
    )
  ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
