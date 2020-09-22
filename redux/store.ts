import {
    configureStore,
    getDefaultMiddleware,
    combineReducers,
  } from "@reduxjs/toolkit";

  import httpHandler from "./middleware/http-handler";
  import { useAppDispatch } from "./types";
  const reducers = combineReducers({
      //... reducers go here
  });
  const store = configureStore({
    reducer: reducers,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
      httpHandler,
    ],
  });
  
  export default store;
  export { useAppDispatch };
  