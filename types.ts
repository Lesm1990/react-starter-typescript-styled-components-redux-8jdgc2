export interface Row {
  id: number, check: boolean, name: string, status: boolean, label: string
};

export interface AppState {
  data: Row[], list_view: Row[], edit: boolean, page: number, pages: number, tpage: number
};