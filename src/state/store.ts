import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import appReducer from "./appSlice";
import courseDetails from "./courseDetailsSlice";
import coursesReducer from "./coursesSlice";
import playbackReducer from "./videoPlaybackSlice";

const rootReducer = combineReducers({
  courses: coursesReducer,
  courseDetails,
  playback: playbackReducer,
  app: appReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["app"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/** -------------------- Store ------------------------- */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types to avoid warnings
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/** ------------------ Persistor ----------------------- */
export const persistor = persistStore(store);

/** -------------------- Types ------------------------- */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
