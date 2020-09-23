import { createStore } from "redux"
import { InitialState, Row } from "../redux/types";

const initialState = {
  data: [],
  page: 0,
  pages: 0,
  tpage: 5
};

const reducers = (state: InitialState = initialState, action) => {
  return state;
};

export default createStore(reducers);