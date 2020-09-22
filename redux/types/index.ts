import store from "../store";
import { useDispatch } from "react-redux";
import { Action } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export type fetchAction = {
  type: string[];
  callAPI?: () => Promise<AxiosResponse<any>>;
  shouldCallAPI?: () => true;
  callFetch?: () => Promise<any>;
  payload?: {};
} & Action;

export type ResponseAction = Action & {
  response?: GenericAPIResponse | any;
  error?: GenericAPIResponse | any;
  payload?: GenericAPIResponse | any;
};


export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

type PagesObject = {
  [key: string]: string[];
};

export type EntityPaginationObject = {
  pages: PagesObject;
  currentPage: number;
  totalPages?: number;
  count?: number;
};

export type GenericEntityState = {
  loading: boolean;
  // should have a generic response type for example {status,message}
  response: GenericAPIResponse & any;
  // should have a n error type defined in the axios setup (interceptors) for http errors
  error: any;
  pagination?: EntityPaginationObject;
  [key: string]: any;
};

export type GenericAPIResponse = {
  status: number;
  message: string;
};
