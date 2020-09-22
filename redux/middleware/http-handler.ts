import { MiddlewareAPI, Action } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { fetchAction } from "../types";

function fetchMiddleware({ dispatch }: MiddlewareAPI) {
  return (next: Dispatch<Action>) => async (action: fetchAction) => {
    const {
      type,
      callAPI,
    //   callFetch,
      shouldCallAPI = () => true,
      payload = {},
    } = action;

    
    if (!type || !Array.isArray(type)) {
      // Normal action: pass it on
      return next(action);
    }

    if (Array.isArray(type) && type.length === 3) {
      if (typeof callAPI !== "function" ) {
        throw new Error("Expected callAPI to be a function.");
      }

      if (!shouldCallAPI()) {
        return;
      }

      const [requestType, successType, failureType] = type;
      dispatch(
        Object.assign({}, payload, {
          type: requestType,
        })
      );

      try {
        const { data: response } = await callAPI();
        
        dispatch({
          type: successType,
          payload,
          response,
        });
      } catch (error) {
        dispatch({
          type: failureType,
          ...payload,
          error,
        });
        if (error.statusCode === 401) {
          location.reload();
        }
      }
    }
  };
}

export default fetchMiddleware;
