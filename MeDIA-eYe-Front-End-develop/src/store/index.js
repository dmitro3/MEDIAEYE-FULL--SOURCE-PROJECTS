import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app/appSlice';

const store = configureStore({
  reducer: {
    app: appReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: true
});
export default store;
