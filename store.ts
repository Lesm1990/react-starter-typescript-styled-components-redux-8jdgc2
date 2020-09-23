import { createStore } from "redux";
import { AppState } from './types';

const initialState: AppState = {
  data: [],
  list_view: [],
  edit: false,
  page: 0,
  pages: 0,
  tpage: 5
};

const reducers = (state: AppState = initialState, action: any) => {
  switch(action.type){
    case 'LOAD_LIST':
      const { data, page, pages, tpage } = action.response;
      const p_init = page * tpage;
      const p_end = ((page + 1) * tpage) - 1;
      //const p_e = p_end > data.length ? data.length : p_end;
      const list_view = data.slice(p_init, tpage);
      return {
        data, 
        list_view,
        page,
        pages,
        tpage
      };
    case 'CHANGE_PAGE':
      console.log(state);
      console.log(action);
      return state;
    default:
      return state;
  }
};

const store = createStore(reducers);

export default store;