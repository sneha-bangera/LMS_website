import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice.ts";
import courseSlice from "./courseSlice.ts";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// ✅ Persist only auth, not course
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"], // only persist auth slice
};

const rootReducer = combineReducers({
  auth: authSlice,
  course: courseSlice, // not persisted
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
