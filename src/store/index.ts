// store.ts
import {configureStore} from '@reduxjs/toolkit';
import garageReducer from '@moduleGarage/store';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
    )
  ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
