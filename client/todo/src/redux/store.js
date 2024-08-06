/* eslint-disable no-unused-vars */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import taskReducer from "./user/taskSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import todosReducer from "./user/todoSlice";
import searchReducer from "./search/searchSlice";
import toggleReducer from "./user/toggleSlice";

const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer,
  todos: todosReducer,
  search: searchReducer,
  toggle: toggleReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
