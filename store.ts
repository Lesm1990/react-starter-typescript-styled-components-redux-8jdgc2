import { createStore } from "redux";
import { Row, AppState } from './types';

const initialState: AppState = {
  data: [],
  list_view: [],
  edit: false,
  page: 0,
  pages: 0,
  tpage: 5
};

const updatePage = (page: any, tpage: any, data: any) => {
      const p_init = page * tpage;
      const p_end = ((page + 1) * tpage);
      const list_view = data.slice(p_init, p_end);
    return list_view;
};

const fetchList = (params) => {
  const {dispatch} = params;
  fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        const data = json.map((element) => {
          return {
            id: element.id,
            check: false,
            name: element.name,
            label: element.email,
            status: (element.id % 2 == 0), 
          };
        });
        const tam_page = 5;
        const total_pages = Math.ceil(data.length / tam_page);
        const response = { data,
          list_view: [],
          edit: false,
          page: 0,
          pages: total_pages,
          tpage: tam_page
        };
        dispatch({
          type: 'LOAD_LIST',
          response
        });
      });
};

const reducers = (state: AppState = initialState, action: any) => {
  switch(action.type){
    case 'FETCH_LIST':
      fetchList(action.response);
      const { data, list_view, page, pages, tpage } = state;
      return {
        data, 
        list_view,
        page,
        pages,
        tpage
      };
    case 'LOAD_LIST':
      const { response: {data, page, pages, tpage} } = action.response;
      const list_view = updatePage(page, tpage, data);
      console.log(list_view);
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
    case 'SELECT_ROW':
      let { data } = state;
      const {checked, value} = action.response;
      const {page, pages, tpage} = state;
      data = data.map((element) => {
        const cond = element.id === Number(value);
        let new_elem = element;
        element.check = cond ? checked : element.check;
        return element;
      });
      const list_view = updatePage(page, tpage, data);
      return {
        data, 
        list_view,
        page,
        pages,
        tpage
      };
    case 'DELETE_ROW':  
      const {data} = action.response;
      const {page, pages, tpage} = state;
      const list_view = updatePage(page, tpage, data);
      return {
        data,
        list_view,
        page, 
        pages,
        tpage
      };
    case 'EDIT_ROW':  
      const {id, name} = action.response;
      let _data = state.data;
      _data = _data.map((row) => {
        if(row.id === Number(id)){
          row[name] = action.response.value;
        }
        return row;
      });
      const { page, pages, tpage} = state;
      const list_view = updatePage(page, tpage, _data);
      return {
        data: _data,
        list_view,
        page, 
        pages,
        tpage
      };
    case 'ACTIVATE_ROW':  
      const { list_view, page, pages, tpage} = state;
      let { data } = state;
      data = data.map((row) => {
        if(row.id === action.response.id){
          console.log(row.id);
          row.status = !row.status;
        }
        return row;
      });
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