
import { configureStore } from '@reduxjs/toolkit';
import { seminarsApi } from '../api/seminarsApi';

export const store = configureStore({
  reducer: {
    [seminarsApi.reducerPath]: seminarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(seminarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
