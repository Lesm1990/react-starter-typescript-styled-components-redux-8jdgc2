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

const updatePage = (page, tpage, data) => {
      const p_init = page * tpage;
      const p_end = ((page + 1) * tpage);
      const list_view = data.slice(p_init, p_end);
    return list_view;
};

const reducers = (state: AppState = initialState, action: any) => {
  switch(action.type){
    case 'LOAD_LIST':
      const { data, page, pages, tpage } = action.response;
      const list_view = updatePage(page, tpage, data);
      return {
        data, 
        list_view,
        page,
        pages,
        tpage
      };
    case 'CHANGE_PAGE':
      const { page } = action.response;
      const { data, pages, tpage } = state;
      const list_view = updatePage(page, tpage, data);
      return {
        data, 
        list_view,
        page,
        pages,
        tpage
      };
    default:
      return state;
  }
};

const store = createStore(reducers);

export default store;