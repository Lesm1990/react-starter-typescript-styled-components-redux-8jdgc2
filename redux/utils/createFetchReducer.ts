import { Action } from "redux";
import { GenericEntityState, ResponseAction } from "../types";

//@ts-ignore
function defaultMapper(state: GenericEntityState, action: Action) {
    return ({});
}

export default function createFetchReducer(
  types: string[],
  successMapper: MapperFunction = defaultMapper,
  errorMapper: MapperFunction = defaultMapper
): CreateFetchReducersReturnType {
  const [REQUEST_TYPE, SUCCESS_TYPE, FAILURE_TYPE] = types;
  const reducerObject: ReducerObject = {};

  const handle = (loading = false, error = false) => (
    state: any,
    action: ResponseAction
  ): void => {
    
    state.loading = loading;
    state.response = loading ? null : action.response;
    state.error = loading ? null : action.error;

    if (!loading) {
      state = error ? errorMapper(state, action) : successMapper(state, action);
    }
  };
  reducerObject[REQUEST_TYPE] = handle(true);
  reducerObject[SUCCESS_TYPE] = handle(false);
  reducerObject[FAILURE_TYPE] = handle(false, true);
  
  return reducerObject;
}
type ReducerObject = { [key: string]: (state: any, action: any) => void };
type MapperFunction = (state: GenericEntityState , action: ResponseAction) => void;

type CreateFetchReducersReturnType = object;
